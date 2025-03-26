const { authCookieName, authenticateToken } = require("./middleware");

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
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid)
    return res.status(400).send(passwordValidation.msg);
  req.validatedPassword = passwordValidation.password;

  if (req.cookies[authCookieName]) {
    try {
      return await authenticateToken(req, res, next);
    } catch (err) {
      return;
    }
  }
  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid)
    return res.status(400).send(usernameValidation.msg);

  req.validatedUsername = usernameValidation.username;
  next();
}

module.exports = { validateUserCredentials };
