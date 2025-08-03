const express = require("express");
const router = express.Router();
const curahHujanController = require("../controllers/curahHujanController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", curahHujanController.getAllData);
router.get("/:id", authMiddleware, curahHujanController.getByUser);
router.post("/", curahHujanController.createCurahHujan);

module.exports = router;
