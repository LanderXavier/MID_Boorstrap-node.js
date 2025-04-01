const jwt = require("jsonwebtoken");

require("dotenv").config(); // Load env variables
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = verified; // Attach user info to request
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
}

module.exports = authenticateToken;

