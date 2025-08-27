const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/profile", auth, authController.getProfile);
router.get("/users", auth, authController.getAllUsers);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.put(
  "/update-profile/:id",
  upload.single("foto_profil"),
  authController.update
);
router.delete("/delete-user/:id", authController.deleteUser);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);


module.exports = router;
