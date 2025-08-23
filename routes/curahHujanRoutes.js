const express = require("express");
const router = express.Router();
const curahHujanController = require("../controllers/curahHujanController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, curahHujanController.getAllData);
router.get("/by-month", authMiddleware, curahHujanController.getDataByMonth);
router.get("/:id", authMiddleware, curahHujanController.getDataById);

router.post("/", authMiddleware, curahHujanController.createCurahHujan);
router.put("/:id", authMiddleware, curahHujanController.updateCurahHujan);
router.delete("/:id", authMiddleware, curahHujanController.deleteData);

module.exports = router;
