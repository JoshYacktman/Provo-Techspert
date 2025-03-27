const { User, Token } = require("../utils/db");
const { validateUserCredentials } = require("../utils/validators");
const {
  setAuthCookie,
  authenticateToken,
  authCookieName,
} = require("../utils/middleware");
const express = require("express");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/manage", validateUserCredentials, async (req, res) => {
  if (req.authUsername) {
    req.validatedUsername = req.authUsername;
  }
  const { validatedUsername, validatedPassword } = req;

  const passwordHash = await bcrypt.hash(validatedPassword, 10);
  const existingUser = await User.findOne({ username: validatedUsername });
  if (existingUser) {
    if (await bcrypt.compare(validatedPassword, existingUser.passwordHash)) {
      return res.status(409).send("Existing user");
    }
    if (!req.cookies[authCookieName]) {
      return res.status(401).send("Not authorized");
    }
    await User.updateOne(
      { username: validatedUsername },
      { $set: { passwordHash } },
    );
    return res.send("Password updated");
  }

  await User.create({ username: validatedUsername, passwordHash });
  await setAuthCookie(res, validatedUsername);
  res.send("User created");
});

authRouter.post("/login", validateUserCredentials, async (req, res) => {
  if (req.authUsername) {
    req.validatedUsername = req.authUsername;
  }
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

module.exports = authRouter;
