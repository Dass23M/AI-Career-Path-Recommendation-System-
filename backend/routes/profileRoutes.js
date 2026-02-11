const express = require("express");
const router = express.Router();

const {
  createOrUpdateProfile,
  getMyProfile,
  deleteProfile,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");


// Create or Update Profile
router.post("/", protect, createOrUpdateProfile);

// Get Logged User Profile
router.get("/me", protect, getMyProfile);

// Delete Profile
router.delete("/", protect, deleteProfile);

module.exports = router;
