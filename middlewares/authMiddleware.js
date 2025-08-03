const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token tidak ditemukan" });

  const token = authHeader.split(" ")[1]; // format: Bearer <token>
  if (!token) return res.status(401).json({ message: "Token tidak valid" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ini yang penting!
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid atau kadaluarsa" });
  }
};
