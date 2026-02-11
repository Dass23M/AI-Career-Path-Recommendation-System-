const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");


// ===============================
// Public Routes
// ===============================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// ===============================
// Protected Routes
// ===============================

// Get Current Logged User
router.get("/me", protect, async (req, res) => {
  res.json({
    success: true,
    message: "User profile fetched successfully",
    data: req.user,
  });
});


// JWT Test Route (Debug Route - Optional)
router.get("/protected-test", protect, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route!",
    user: req.user,
  });
});


// Logout (JWT Stateless - frontend removes token)
router.post("/logout", protect, (req, res) => {
  res.json({
    success: true,
    message: "User logged out successfully (remove token on client)",
  });
});


module.exports = router;
