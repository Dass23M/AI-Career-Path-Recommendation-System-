const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ===============================
// @desc    Register User
// @route   POST /api/auth/register
// ===============================
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set JWT cookie (for mobile / cross-device)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // allows cross-device login
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        email: user.email,
        token, // keep sending token for localStorage usage
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ===============================
// @desc    Login User
// @route   POST /api/auth/login
// ===============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set JWT cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // allows cross-device login
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Success response
    res.status(200).json({
      success: true,
      message: "User login successful",
      data: {
        _id: user._id,
        email: user.email,
        token, // keep sending token for localStorage usage
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};