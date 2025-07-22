const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

// Superadmin only
router.get("/super-dashboard", authMiddleware, checkRole("superadmin"), (req, res) => {
  res.json({ message: "Selamat datang di dashboard Superadmin!" });
});

// Admin dan Superadmin
router.get("/admin-dashboard", authMiddleware, checkRole("admin", "superadmin"), (req, res) => {
  res.json({ message: "Selamat datang di dashboard Admin!" });
});

// User dan Superadmin
router.get("/user-dashboard", authMiddleware, checkRole("user", "superadmin"), (req, res) => {
  res.json({ message: "Selamat datang di dashboard User!" });
});

module.exports = router;
