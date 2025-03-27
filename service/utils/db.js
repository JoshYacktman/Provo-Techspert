const mongoose = require("mongoose");
const config = require("../dbConfig.json");

const mongoURI = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/prv-tchsprt?retryWrites=true&w=majority&appName=prv-tchsprt`;

async function connectWithRetry() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    setTimeout(connectWithRetry, 50); // Retry connection after 5 seconds
  }
}

connectWithRetry();

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error.stack);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error.stack);
});

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MongoDB connection...");
  await mongoose.connection.close(); // Close the MongoDB connection
  console.log("MongoDB connection closed.");
  process.exit(0); // Exit the process gracefully
});

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

module.exports = {
  User: mongoose.model("User", userSchema),
  Token: mongoose.model("Token", tokenSchema),
};
