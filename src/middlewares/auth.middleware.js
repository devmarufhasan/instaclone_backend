const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { identifyUser };
