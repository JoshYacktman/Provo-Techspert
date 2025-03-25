const { Token } = require("./db");
const uuid = require("uuid");
const authCookieName = "token";

async function authenticateToken(req, res, next) {
  const userCookieToken = req.cookies[authCookieName];

  if (!userCookieToken) {
    return res.status(409).send("Not logged in");
  }

  const tokenDoc = await Token.findOne({ token: userCookieToken });

  if (!tokenDoc) {
    return res.status(401).send("Not authorized");
  }

  req.authUsername = tokenDoc.username;
  req.authToken = userCookieToken;
  next();
}

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

module.exports = { authenticateToken, setAuthCookie, authCookieName };
