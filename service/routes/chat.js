const { User } = require("../utils/db");
const { authenticateToken } = require("../utils/middleware");
const express = require("express");

const chatRouter = express.Router();

chatRouter.post("/manage", authenticateToken, async (req, res) => {
  const { authUsername } = req;
  let { chatName } = req.body;

  // Prevent "Provo Techspert" from creating chats
  if (authUsername === "Provo Techspert") {
    return res.status(403).send("Provo Techspert cannot create chats");
  }

  chatName = String(chatName);
  if (!chatName || chatName.startsWith("$")) {
    return res
      .status(400)
      .send("Chat name is required and cannot start with '$'");
  }
  const trimmedChatName = chatName.trim();
  if (trimmedChatName.length < 5 || trimmedChatName.length > 15) {
    return res.status(400).send("Chat name must be 5-15 characters");
  }

  const fullChatName = `${trimmedChatName} - ${authUsername}`; // Server appends username
  const user = await User.findOne({ username: authUsername });
  if (user.chats.has(fullChatName)) {
    return res.status(409).send("Chat already exists");
  }

  await User.updateOne(
    { username: authUsername },
    {
      $set: {
        [`chats.${fullChatName}`]: {
          messages: [
            {
              sender: "Provo Techspert",
              side: "left",
              messages: [
                `Hello ${authUsername}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert...`,
              ],
            },
          ],
          lastMessageAt: new Date(),
        },
      },
    },
  );

  res.send(`Successfully created chat: ${fullChatName}`);
});

chatRouter.post("/message", authenticateToken, async (req, res) => {
  const { authUsername } = req;
  let { chatName, message } = req.body;

  message = String(message);
  if (!chatName) {
    return res.status(400).send("No chatName provided");
  }
  if (chatName.startsWith("$") || message.startsWith("$")) {
    return res.status(400).send("Inputs cannot start with '$'");
  }

  // Determine sender and side
  const sender =
    authUsername === "Provo Techspert" ? "Provo Techspert" : authUsername;
  const side = authUsername === "Provo Techspert" ? "left" : "right";

  const result = await User.updateOne(
    { username: authUsername, [`chats.${chatName}`]: { $exists: true } },
    {
      $push: {
        [`chats.${chatName}.messages`]: { sender, side, messages: [message] },
      },
      $set: { [`chats.${chatName}.lastMessageAt`]: new Date() },
    },
  );

  if (result.modifiedCount === 0) {
    return res.status(404).send("Chat not found");
  }
  res.send("Message added");
});

chatRouter.get("/list", authenticateToken, async (req, res) => {
  const { authUsername } = req;
  let allChats = [];

  if (authUsername === "Provo Techspert") {
    const allUsers = await User.find({}, "chats");

    allUsers.forEach((user) => {
      user.chats.forEach((chat, chatName) => {
        allChats.push({ name: chatName, lastMessageAt: chat.lastMessageAt });
      });
    });
  } else {
    const user = await User.findOne({ username: authUsername });

    if (user) {
      user.chats.forEach((chat, chatName) => {
        allChats.push({ name: chatName, lastMessageAt: chat.lastMessageAt });
      });
    }
  }

  allChats.sort(
    (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt),
  );

  return res.json(allChats.map((chat) => chat.name));
});

chatRouter.delete("/manage", authenticateToken, async (req, res) => {
  const { authUsername } = req;
  let { chatName } = req.body;

  chatName = String(chatName);
  if (!chatName || chatName.startsWith("$")) {
    return res
      .status(400)
      .send("Chat name is required and cannot start with '$'");
  }

  const result = await User.updateOne(
    { username: authUsername },
    { $unset: { [`chats.${chatName}`]: "" } },
  );

  if (result.modifiedCount === 0) {
    return res.status(404).send("Chat not found");
  }
  res.send("Chat deleted");
});

module.exports = chatRouter;
