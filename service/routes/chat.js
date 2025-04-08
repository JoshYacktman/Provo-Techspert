const { User, Token } = require("../utils/db");
const { authenticateToken } = require("../utils/middleware");
const express = require("express");
const nodemailer = require("nodemailer");
const config = require("../emailConfig.json");
const WebSocket = require("ws");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.userName,
    pass: config.password,
  },
});

async function websocketAuthenticateToken(cookie) {
  if (!cookie) {
    throw new Error("Not logged in");
  }

  const tokenDoc = await Token.findOne({ token: cookie });

  if (!tokenDoc) {
    throw new Error("Not authorized");
  }

  return tokenDoc.username;
}

function chatWebSocket(httpServer) {
  const socketServer = new WebSocket.Server({ server: httpServer });

  socketServer.on("connection", async (socket, req) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const token = params.get("token");

    try {
      const username = await websocketAuthenticateToken(token);
      socket.isAlive = true;
      socket.username = username;
      console.log(`User ${username} connected`);

      socket.on("pong", () => {
        socket.isAlive = true;
      });

      socket.on("close", () => {
        console.log(`User ${username} disconnected`);
      });

      if (socket.username === "Provo Techspert") {
        const allChats = [];
        const allUsers = await User.find({}, "chats");

        allUsers.forEach((user) => {
          Object.entries(user.chats).forEach(([chatName, chat]) => {
            allChats.push({
              name: chatName,
              lastMessageAt: chat.lastMessageAt,
              messages: chat.messages,
            });
          });
        });

        socket.send(JSON.stringify(allChats));
      } else {
        const user = await User.findOne({ username: socket.username });

        if (user) {
          const chats = [];
          Object.entries(user.chats).forEach(([chatName, chat]) => {
            chats.push({
              name: chatName,
              lastMessageAt: chat.lastMessageAt,
              messages: chat.messages,
            });
          });

          // Send the user's chat data
          socket.send(JSON.stringify(chats));
        }
      }
    } catch (error) {
      console.log(error.message);
      socket.send(JSON.stringify({ error: error.message }));
      socket.close();
    }
  });

  // Ping/Pong
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) {
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 1_000);
}

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
                `Hello ${authUsername}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert. To help you repair your device, I would appreciate a message from you explaining the issue, if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos (I personally use imgbb and Vimeo).`,
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

async function sendEmail(chatName, message) {
  const mailOptions = {
    from: config.userName,
    to: config.userName,
    subject: chatName,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {});
}

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

  sendEmail(chatName, message);
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

module.exports = chatWebSocket;
