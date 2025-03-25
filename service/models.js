const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  side: { type: String, enum: ["left", "right"], required: true },
  messages: [{ type: String, required: true }],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  chats: {
    type: Map,
    of: new mongoose.Schema({
      messages: [messageSchema],
      lastMessageAt: { type: Date, default: Date.now },
    }),
    default: {},
  },
});

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Token = mongoose.model("Token", tokenSchema);

module.exports = { User, Token };
