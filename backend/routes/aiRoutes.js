const express = require("express");
const router = express.Router();
const { predictCareer } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// Protected AI prediction route
router.post("/predict", protect, predictCareer);

module.exports = router;
