const Profile = require("../models/Profile");


// ===============================
// Create or Update Profile
// POST /api/profile
// ===============================
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { fullName, education, skills, interests, experienceLevel } =
      req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { fullName, education, skills, interests, experienceLevel },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Profile updated successfully",
        data: profile,
      });
    }

    profile = await Profile.create({
      user: req.user._id,
      fullName,
      education,
      skills,
      interests,
      experienceLevel,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
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
// Get My Profile
// GET /api/profile/me
// ===============================
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: profile,
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
// Delete Profile
// DELETE /api/profile
// ===============================
exports.deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user._id });

    res.json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
