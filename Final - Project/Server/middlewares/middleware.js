const { verifyToken } = require("../services/token");

function authMiddleWare(req, res, next) {
  const tokenFromClient = req.header("token");
  if (!tokenFromClient) return res.status(401).json("Please send token");

  const userInfo = verifyToken(tokenFromClient);
  if (!userInfo) return res.status(401).json("Invalid token!");

  req.user = userInfo;

  next();
}

module.exports = authMiddleWare;
