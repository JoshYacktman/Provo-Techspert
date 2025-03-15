const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const uuid = require("uuid");
const app = express();

const authCookieName = "token";

let authTokens = {};
// key is token, value is username
let tokenDates = {};
// Key is date and value is token. If a token is a week old we delete it
// using a cron job that runs once a day (node-cron)

let users = {};
// By searching for users here instead of in a list we get O(1) lookup
// and it serves dual purposes
// Example Users:
// {
//   "Provo Techspert": "xxxxxxxxx",
//   "UserOne": "xxxxxxxxx",
// }

let chats = {};
// Example chats:
// {
//   "UserOne": {
//     "Chat One - UserOne": [
//       {
//         "sender": "Provo Techspert",
//         "side": "left",
//         "messages": [
//           `Hello UserOne, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
//                     To help you repair your device, I would appreciate a message from you explaining the issue,
//                     if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
//                     (I personally use imgbb and Vimeo).`,
//           "Chat Message one",
//         ]
//       },
//       {
//         "sender": "UserOne",
//         "side": "right",
//         "messages": [
//           "Chat Message two"
//         ]
//       },
//     ],
//     "Chat Two - UserOne": {
//       "sender": "Provo Techspert",
//       "side": "left",
//       "messages": [
//         `Hello UserOne, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert.
//                   To help you repair your device, I would appreciate a message from you explaining the issue,
//                   if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos
//                   (I personally use imgbb and Vimeo).`,
//         "Chat Message one",
//       ]
//     }
//   },
// }
// NOTE: Provo Techspert, being a special account, can read all chats since it is involved in all chats
// Also, when a chat is created, " - Username" us appended to the end so that Provo Techspert can discern
// chats of the same name but different users

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const build_loc = process.argv.length > 2 ? "public" : "../dist";

app.use(express.json());
app.use(cookieParser());
app.use(express.static(build_loc));

// Router for service endpoints
var apiRouter = express.Router();
app.use("/api", apiRouter);

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = passwordHash;
}

apiRouter.get("/auth/create", async (req, res) => {
  const username = req.body.username;

  if (!username || typeof username !== "string") {
    res.status(400).send({ msg: "Username is required and must be a string" });
    return;
  }

  const trimmedUsername = username.trim();
  const username_len = trimmedUsername.length;

  if (username_len < 3 || username_len > 15) {
    res.status(409).send({ msg: "Username does not conform to standards" });
    return;
  }

  const userExists = trimmedUsername in users;
  if (userExists) {
    res.status(409).send({ msg: "Existing user" });
    return;
  }

  const password = req.body.password;

  if (!password || typeof password !== "string") {
    res.status(400).send({ msg: "Password is required and must be a string" });
    return;
  }

  const trimmedPassword = password.trim();
  const password_len = trimmedPassword.length;

  if (password_len < 5 || password_len > 20) {
    res.status(409).send({ msg: "Password does not conform to standards" });
    return;
  }

  await createUser(trimmedUsername, trimmedPassword);
  setAuthCookie(res, trimmedUsername);
  res.send("User created");
});

apiRouter.get("/auth/login", async (req, res) => {
  const username = req.body.username;

  if (!username || typeof username !== "string") {
    res.status(400).send({ msg: "Username is required and must be a string" });
    return;
  }

  const trimmedUsername = username.trim();
  const username_len = trimmedUsername.length;

  if (username_len < 3 || username_len > 15) {
    res.status(409).send({ msg: "Username does not conform to standards" });
    return;
  }

  const userExists = trimmedUsername in users;

  const password = req.body.password;

  if (!password || typeof password !== "string") {
    res.status(400).send({ msg: "Password is required and must be a string" });
    return;
  }

  const trimmedPassword = password.trim();
  const password_len = trimmedPassword.length;

  if (password_len < 5 || password_len > 20) {
    res.status(409).send({ msg: "Password does not conform to standards" });
    return;
  }

  if (!userExists) {
    res.status(409).send({ msg: "No account of given username" });
    return;
  }
  const authorization = await bcrypt.compare(
    trimmedPassword,
    users[trimmedUsername],
  );
  if (!authorization) {
    res.status(409).send({ msg: "Not authorized" });
    return;
  }
  setAuthCookie(res, trimmedUsername);
  res.send("User logged in");
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, username) {
  let date = new Date(Date.now());
  date.setHours(0, 0, 0, 0); // Set the time to midnight

  let formattedDate = date.toISOString().split("T")[0]; // Get the date (YYYY-MM-DD)

  if (!(formattedDate in tokenDates)) {
    tokenDates[formattedDate] = [];
  }
  authTokens[username] = uuid.v4();
  tokenDates[formattedDate].push(authTokens[username]);

  res.cookie(authCookieName, authTokens[username], {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Catch-all route for serving index.html (main page)
app.use((req, res) => {
  res.sendFile("index.html", { root: build_loc });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
