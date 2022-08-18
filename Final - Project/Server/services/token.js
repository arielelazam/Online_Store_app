const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },

    config.get("secretKey"),
    { expiresIn: "4h" }
  );
  return token;
}
function verifyToken(tokenFromUSer) {
  try {
    const userData = jwt.verify(tokenFromUSer, config.get("secretKey"));
    return userData;
  } catch (error) {
    return null;
  }
}

module.exports = { generateAuthToken, verifyToken };
