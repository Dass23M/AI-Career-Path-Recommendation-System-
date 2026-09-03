const express = require("express");
const router = express.Router();

const {
  createOrUpdateProfile,
  getMyProfile,
  deleteProfile,
  getMyHistory,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");


// Create or Update Profile
router.post("/", protect, createOrUpdateProfile);

// Get Logged User Profile
router.get("/me", protect, getMyProfile);

// Get Prediction History
router.get("/history", protect, getMyHistory);

// Delete Profile
router.delete("/", protect, deleteProfile);

module.exports = router;
