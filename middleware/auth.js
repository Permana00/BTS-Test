const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: 401,
      message: "Missing token",
    });
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer" || !token) {
    return res.status(401).json({
      status: 401,
      message: "Invalid token type",
    });
  }

  try {
    jwt.verify(token, "secret key");
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Invalid token",
    });
  }
};

module.exports = auth;
