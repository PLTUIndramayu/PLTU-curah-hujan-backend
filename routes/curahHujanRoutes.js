const express = require("express");
const router = express.Router();
const curahHujanController = require("../controllers/curahHujanController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, curahHujanController.getAllData);
router.get("/by-month", authMiddleware, curahHujanController.getDataByMonth);
router.post("/", authMiddleware, curahHujanController.createCurahHujan);

module.exports = router;
