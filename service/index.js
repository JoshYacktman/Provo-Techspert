// const cookieParser = require("cookie-parser");
// const bcrypt = require("bcrypt");
const express = require("express");
// const uuid = require("uuid");
const app = express();

// const authCookieName = "token";

// let authTokens = {};
// key is token, value is username

// let users = {};
// Example Users:
// {
//   "Provo Techspert": {
//     "password_hash": "xxxxxxxxx",
//     "email": "example@email.com",
//   },
//   "UserOne" {
//     "password_hash": "xxxxxxxxx",
//     "email": "example@email.com",
//   }
// }

// let chats = {};
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

app.use(express.json());
// app.use(cookieParser());
app.use(express.static("../dist"));

// Router for service endpoints
var apiRouter = express.Router();
app.use("/api", apiRouter);

app.get("/api/test", (req, res) => {
  console.log(req.originalUrl);
  res.send("Hello, Test!");
});

// Catch-all route for serving index.html
app.use((req, res) => {
  res.sendFile("index.html", { root: "../dist" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
