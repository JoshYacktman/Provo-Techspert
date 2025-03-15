const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const uuid = require("uuid");
const cron = require("node-cron");
const app = express();

const authCookieName = "token";

let authTokens = {};
// key is token, value is username
let reverseAuthTokens = {};
// key is username, value is token
let tokenDates = {};
// Key is date and value is token. If a token is a week old we delete it
// using a cron job that runs once a day (node-cron)

let users = {};
// By searching for users here instead of in a list we get O(1) lookup
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

var apiRouter = express.Router();
app.use("/api", apiRouter);

// Helper function for username validation
function validateUsername(username) {
  if (!username || typeof username !== "string")
    return { isValid: false, msg: "Username is required and must be a string" };
  const trimmedUsername = username.trim();
  if (trimmedUsername.length < 3 || trimmedUsername.length > 15)
    return { isValid: false, msg: "Username does not conform to standards" };
  return { isValid: true, username: trimmedUsername };
}

// Helper function for password validation
function validatePassword(password) {
  if (!password || typeof password !== "string")
    return { isValid: false, msg: "Password is required and must be a string" };
  const trimmedPassword = password.trim();
  if (trimmedPassword.length < 5 || trimmedPassword.length > 20)
    return { isValid: false, msg: "Password does not conform to standards" };
  return { isValid: true, password: trimmedPassword };
}

// Middleware for validating username and password
async function validateUserCredentials(req, res, next) {
  const { username, password } = req.body;

  // Validate username
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid)
    return res.status(400).send(usernameValidation.msg);

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid)
    return res.status(400).send(passwordValidation.msg);

  // Attach validated username and password to the request object
  req.validatedUsername = usernameValidation.username;
  req.validatedPassword = passwordValidation.password;

  next();
}

// Helper function to create a user
async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  users[username] = passwordHash;
}

// MAJOR: Authentication routes
const authRouter = express.Router();
apiRouter.use("/auth", authRouter);

// Create account
authRouter.post("/manage", validateUserCredentials, async (req, res) => {
  const { validatedUsername, validatedPassword } = req;

  // Check if user already exists
  if (validatedUsername in users) {
    return res.status(409).send("Existing user");
  }

  await createUser(validatedUsername, validatedPassword);
  setAuthCookie(res, validatedUsername);
  res.send("User created");
});

// Log in
authRouter.post("/login", validateUserCredentials, async (req, res) => {
  // TODO: If already logged in, give the old token (assuming valid)
  const { validatedUsername, validatedPassword } = req;

  // Check if user exists
  const userExists = validatedUsername in users;
  if (!userExists) return res.status(409).send("No account of given username");

  // Check password authorization
  const authorization = await bcrypt.compare(
    validatedPassword,
    users[validatedUsername],
  );
  if (!authorization) return res.status(409).send("Not authorized");

  setAuthCookie(res, validatedUsername);
  res.send("User logged in");
});
// Log out
authRouter.post("/logout", async (req, res) => {
  const userCookieToken = req.cookies[authCookieName];
  const username = req.body.username;

  if (!(userCookieToken in authTokens)) {
    return res.status(409).send("Not logged in");
  }

  const authUsername = authTokens[userCookieToken];
  if (authUsername != username) {
    return res.status(409).send("Not authorized");
  }
  delete authTokens[userCookieToken];
  delete reverseAuthTokens[username];

  let date = new Date(Date.now());
  for (let i = 0; i < 7; i++) {
    date.setDate(date.getDate() - 1);
    let formattedDate = date.toISOString().split("T")[0];

    if (
      tokenDates[formattedDate] &&
      tokenDates[formattedDate].has(userCookieToken)
    ) {
      tokenDates[formattedDate].delete(userCookieToken);
    }
  }

  res.clearCookie(authCookieName);
  res.send("Logged out successfully");
});
// Delete account
// NOTE: Takes either username/password OR auth token
authRouter.delete("/manage", async (req, res) => {});

// MAJOR: Chat endpoints
const chatRouter = express.Router();
apiRouter.use("/chat", chatRouter);

// Create chat
chatRouter.post("/manage", async (req, res) => {});
// List chats
chatRouter.get("/list", async (req, res) => {});
// Delete chat
chatRouter.delete("/manage", async (req, res) => {});
// Send message
// TODO: Have this send email from provotechspert@gmail.com back to itself
// NOTE: use env vars for security reasons
chatRouter.post("/message", async (req, res) => {});
// Get messages from chat
chatRouter.get("/messages", async (req, res) => {});

function setAuthCookie(res, username) {
  let date = new Date(Date.now());
  date.setHours(0, 0, 0, 0);
  let formattedDate = date.toISOString().split("T")[0];

  if (!(formattedDate in tokenDates)) {
    tokenDates[formattedDate] = new Set();
  }

  let token;
  if (!(username in reverseAuthTokens)) {
    token = uuid.v4();
    authTokens[token] = username;
    reverseAuthTokens[username] = token;
    tokenDates[formattedDate].add(token);
  } else {
    token = reverseAuthTokens[username];
  }

  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Cron job to delete tokens older than a week
cron.schedule("0 0 * * *", () => {
  let oneWeekAgo = new Date();

  for (let i = 0; i < 7; i++) {
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);
    const formattedDate = oneWeekAgo.toISOString().split("T")[0];

    if (formattedDate in tokenDates) {
      // Remove all tokens from this date
      for (const token of tokenDates[formattedDate]) {
        delete authTokens[token]; // Remove from active tokens
      }
      delete tokenDates[formattedDate]; // Remove date entry
    }
  }
});

// Catch-all route for serving index.html (main page)
app.use((req, res) => {
  res.sendFile("index.html", { root: build_loc });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
