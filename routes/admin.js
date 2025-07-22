const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

// router.get("/admin-only", authMiddleware, checkRole("admin"), (req, res) => {
//   res.json({ message: "Selamat datang, admin!" });
// });

router.get("/admin-panel", authMiddleware, checkRole("admin", "superadmin"), (req, res) => {
  res.json({ message: "Halo, Admin atau Superadmin!" });
});


module.exports = router;
