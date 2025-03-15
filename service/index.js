const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
const express = require("express");
// const uuid = require("uuid");
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
//   "Provo Techspert": {
//     "password_hash": "xxxxxxxxx",
//   },
//   "UserOne" {
//     "password_hash": "xxxxxxxxx",
//   }
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

apiRouter.get("/test", (req, res) => {
  res.send("Hello, Test!");
});

function createUser(username, password) {
  users[username] = true;
  // TODO: Unfinished!
}

apiRouter.get("/auth/create", async (req, res) => {
  res.send("Hello, Create!");
  if (req.body.username in users) {
    res.status(409).send({ msg: "Existing user" });
    return;
  }
  const user = await createUser(req.body.username, req.body.password);
  setAuthCookie(res, user);
  res.send("Authorized");
});

apiRouter.get("/auth/login", async (req, res) => {
  res.send("Hello, Login!");
  const user = await findUser(req.body.username);
  const authorization = await bcrypt.compare(
    req.body.password,
    user.password_hash,
  );
  if (!user || !authorization) {
    res.status(409).send({ msg: "Not authorized" });
    return;
  }
  setAuthCookie(res, user);
  res.send("Authorized");
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie(authCookieName, user.token, {
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
