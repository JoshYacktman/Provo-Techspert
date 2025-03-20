const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const uuid = require("uuid");
const cron = require("node-cron");
const mongoose = require("mongoose");
const config = require("./dbConfig.json");

const app = express();
const authCookieName = "token";

// Load DB credentials
const mongoURI = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/prv-tchsprt?retryWrites=true&w=majority&appName=prv-tchsprt`;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema Definitions
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

// Service configuration
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const build_loc = process.argv.length > 2 ? "public" : "../dist";

app.use(express.json());
app.use(cookieParser());
app.use(express.static(build_loc));

const apiRouter = express.Router();
app.use("/api", apiRouter);

// Validation Helpers
function validateUsername(username) {
  if (!username || typeof username !== "string" || username.startsWith("$")) {
    return {
      isValid: false,
      msg: "Username is required, must be a string, and cannot start with '$'",
    };
  }
  const trimmedUsername = username.trim();
  if (trimmedUsername.length < 3 || trimmedUsername.length > 15) {
    return { isValid: false, msg: "Username must be 3-15 characters" };
  }
  return { isValid: true, username: trimmedUsername };
}

function validatePassword(password) {
  if (!password || typeof password !== "string" || password.startsWith("$")) {
    return {
      isValid: false,
      msg: "Password is required, must be a string, and cannot start with '$'",
    };
  }
  const trimmedPassword = password.trim();
  if (trimmedPassword.length < 5 || trimmedPassword.length > 20) {
    return { isValid: false, msg: "Password must be 5-20 characters" };
  }
  return { isValid: true, password: trimmedPassword };
}

async function validateUserCredentials(req, res, next) {
  const { username, password } = req.body;
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid)
    return res.status(400).send(usernameValidation.msg);
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid)
    return res.status(400).send(passwordValidation.msg);

  req.validatedUsername = usernameValidation.username;
  req.validatedPassword = passwordValidation.password;
  next();
}

// Authentication Middleware
async function authenticateToken(req, res, next) {
  const userCookieToken = req.cookies[authCookieName];
  const username = req.body.username;

  if (!userCookieToken) {
    return res.status(409).send("Not logged in");
  }

  const tokenDoc = await Token.findOne({ token: userCookieToken });
  if (!tokenDoc || tokenDoc.username !== username) {
    return res.status(401).send("Not authorized");
  }

  req.authUsername = tokenDoc.username;
  req.authToken = userCookieToken;
  next();
}

// Authentication Routes
const authRouter = express.Router();
apiRouter.use("/auth", authRouter);

authRouter.post("/manage", validateUserCredentials, async (req, res) => {
  const { validatedUsername, validatedPassword } = req;

  const existingUser = await User.findOne({ username: validatedUsername });
  if (existingUser) {
    return res.status(409).send("Existing user");
  }

  const passwordHash = await bcrypt.hash(validatedPassword, 10);
  await User.create({ username: validatedUsername, passwordHash });
  await setAuthCookie(res, validatedUsername);
  res.send("User created");
});

authRouter.post("/login", validateUserCredentials, async (req, res) => {
  const { validatedUsername, validatedPassword } = req;

  const user = await User.findOne({ username: validatedUsername });
  if (!user) return res.status(409).send("No account of given username");

  const authorized = await bcrypt.compare(validatedPassword, user.passwordHash);
  if (!authorized) return res.status(401).send("Not authorized");

  await setAuthCookie(res, validatedUsername);
  res.send("User logged in");
});

authRouter.post("/logout", authenticateToken, async (req, res) => {
  const { authToken } = req;

  await Token.deleteOne({ token: authToken });
  res.clearCookie(authCookieName);
  res.send("Logged out successfully");
});

authRouter.delete("/manage", authenticateToken, async (req, res) => {
  const { authToken, authUsername } = req;

  await Token.deleteOne({ token: authToken });
  await User.deleteOne({ username: authUsername });
  res.clearCookie(authCookieName);
  res.send("Deleted Account successfully");
});

// Chat Routes
const chatRouter = express.Router();
apiRouter.use("/chat", chatRouter);

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
  const user = await User.findOne({ username: authUsername });

  if (authUsername === "Provo Techspert") {
    const allUsers = await User.find({}, "username chats");
    const allChats = {};
    allUsers.forEach((u) => {
      if (u.chats.size > 0) allChats[u.username] = Object.fromEntries(u.chats);
    });
    return res.json(allChats);
  }

  res.json(Object.fromEntries(user.chats));
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

// Auth Helper
async function setAuthCookie(res, username) {
  const existingToken = await Token.findOne({ username });
  let token;

  if (existingToken) {
    token = existingToken.token;
  } else {
    token = uuid.v4();
    await Token.create({ token, username });
  }

  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Cron Jobs
cron.schedule("0 0 * * *", async () => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  await Token.deleteMany({ createdAt: { $lt: sevenDaysAgo } });

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const users = await User.find({});
  for (const user of users) {
    const chats = user.chats;
    let modified = false;
    for (const [chatName, chatData] of chats.entries()) {
      if (chatData.lastMessageAt < thirtyDaysAgo) {
        chats.delete(chatName);
        modified = true;
      }
    }
    if (modified) await user.save();
  }
  console.log("Cron job completed: cleaned old tokens and chats");
});

// Catch-all route
app.use((req, res) => {
  res.sendFile("index.html", { root: build_loc });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
