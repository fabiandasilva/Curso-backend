const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

const authToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, authToken };
