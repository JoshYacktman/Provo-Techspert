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

async function sendEmail(chatName, message) {
  const mailOptions = {
    from: config.userName,
    to: config.userName,
    subject: chatName,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {});
}

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
  console.log("server created");

  socketServer.on("connection", async (socket, req) => {
    console.log("connection");
    const cookies = req.headers.cookie || "";
    const tokenCookie = cookies
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!tokenCookie) {
      socket.send(JSON.stringify({ error: "No token provided" }));
      socket.close();
      return;
    }

    // Extract the token value from the cookie
    const token = tokenCookie.split("=")[1];
    console.log(token);

    try {
      const username = await websocketAuthenticateToken(token);
      socket.isAlive = true;
      socket.username = username;
      console.log(`User ${username} connected`);

      socket.on("message", async function message(data) {
        let json_data = JSON.parse(data.toString("utf8"));
        if (json_data["type"] === "pong") {
          socket.isAlive = true;
        } else if (json_data["type"] === "refresh") {
          if (socket.username === "Provo Techspert") {
            const allChats = {};
            const allUsers = await User.find({}, "chats");
            allUsers.forEach((user) => {
              Object.entries(user.chats).forEach(([chatName, chat]) => {
                allChats[chatName] = chat;
              });
            });
            socket.send(JSON.stringify(allChats));
          } else {
            const user = await User.findOne({ username: socket.username });
            socket.send(JSON.stringify(user.chats));
          }
        } else if (json_data["type"] === "create") {
          let chatName = String(json_data["chatName"]);
          if (socket.username === "Provo Techspert") {
            socket.send(JSON.stringify("Provo Techspert cannot create chats"));
            return;
          }
          if (!chatName || chatName.startsWith("$") || chatName.includes(".")) {
            socket.send(
              JSON.stringify(
                "Chat name is required, cannot use periods, and cannot start with '$'",
              ),
            );
            return;
          }
          const trimmedChatName = chatName.trim();
          if (trimmedChatName.length < 5 || trimmedChatName.length > 15) {
            socket.send(JSON.stringify("Chat name must be 5-15 characters"));
            return;
          }

          const fullChatName = `${trimmedChatName} - ${socket.username}`;

          const user = await User.findOne({ username: socket.username });
          if (user.chats.has(fullChatName)) {
            socket.send(JSON.stringify("Chat already exists"));
            return;
          }

          await User.updateOne(
            { username: socket.username },
            {
              $set: {
                [`chats.${fullChatName}`]: {
                  messages: [
                    {
                      sender: "Provo Techspert",
                      side: "left",
                      messages: [
                        `Hello ${socket.username}, my name is Joshua Yacktman or, as my website calls me, the Provo Techspert. To help you repair your device, I would appreciate a message from you explaining the issue, if you can reproduce the issue consistently, and, if possible, links to pictures and/or videos (I personally use imgbb and Vimeo).`,
                      ],
                    },
                  ],
                  lastMessageAt: new Date(),
                },
              },
            },
          );

          socket.send(
            JSON.stringify(`Successfully created chat: ${fullChatName}`),
          );
        } else if (json_data["type"] === "delete") {
          let chatName = String(json_data["chatName"]);

          if (!chatName || chatName.startsWith("$") || chatName.includes(".")) {
            socket.send(
              JSON.stringify(
                "Chat name is required, cannot use periods, and cannot start with '$'",
              ),
            );
            return;
          }
          const result = await User.updateOne(
            { username: socket.username },
            { $unset: { [`chats.${chatName}`]: "" } },
          );

          if (result.modifiedCount === 0) {
            socket.send(JSON.stringify("Chat not found"));
            return;
          }
          socket.send(JSON.stringify("Chat deleted"));
        } else if (json_data["type"] === "message") {
          let chatName = String(json_data["chatName"]);
          let message = String(json_data["message"]);

          if (
            !chatName ||
            chatName.startsWith("$") ||
            chatName.includes(".") ||
            message.startsWith("$") ||
            message.includes(".")
          ) {
            socket.send(
              JSON.stringify(
                "Inputs chatName and message are required, cannot use periods, and cannot start with '$'",
              ),
            );
            return;
          }

          let username = socket.username;

          const side = username === "Provo Techspert" ? "left" : "right";

          const result = await User.updateOne(
            {
              username: username,
              [`chats.${chatName}`]: { $exists: true },
            },
            {
              $push: {
                [`chats.${chatName}.messages`]: {
                  username, // Using socket.username here causes syntax errors
                  side,
                  messages: [message],
                },
              },
              $set: { [`chats.${chatName}.lastMessageAt`]: new Date() },
            },
          );

          if (result.modifiedCount === 0) {
            socket.send(JSON.stringify("Chat not found"));
            return;
          }

          socket.send(JSON.stringify("Message added"));

          sendEmail(chatName, message);
        }
      });

      socket.on("close", () => {
        console.log(`User ${username} disconnected`);
      });

      // Send chat data for "Provo Techspert"
      if (socket.username === "Provo Techspert") {
        const allChats = {}; // Use an object to map chat names to messages
        const allUsers = await User.find({}, "chats");

        allUsers.forEach((user) => {
          Object.entries(user.chats).forEach(([chatName, chat]) => {
            allChats[chatName] = chat.messages;
          });
        });

        socket.send(JSON.stringify(allChats));
      } else {
        const user = await User.findOne({ username: socket.username });
        socket.send(JSON.stringify(user.chats));
      }
    } catch (error) {
      console.log(error.message);
      const errorMessage = { error: error.message };
      console.log("err", errorMessage);
      socket.send(JSON.stringify(errorMessage));
      socket.close();
    }
  });
  // TODO: notify others when a chat they are in has a new message

  // Ping/Pong
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) {
        client.close();
        return client.terminate();
      }

      client.isAlive = false;
      client.send(JSON.stringify({ type: "ping" }));
    });
  }, 5_000);
}

module.exports = chatWebSocket;
