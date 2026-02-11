const Prediction = require("../models/Prediction");
const flaskService = require("../services/flaskService");

// @desc    Get AI Career Prediction
// @route   POST /api/prediction
// @access  Private
exports.getPrediction = async (req, res) => {
  try {
    // Logged in user (from JWT middleware)
    const userId = req.user._id;

    // Data coming from frontend form
    const userData = req.body;

    // Basic validation
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Prediction data is required",
      });
    }

    // 🔥 Call Flask AI Service
    const aiResult = await flaskService.getPrediction(userData);

    // Save prediction history (Professional SaaS Feature)
    const savedPrediction = await Prediction.create({
      user: userId,
      inputData: userData,
      result: aiResult,
    });

    // Send final response
    res.status(200).json({
      success: true,
      message: "AI prediction generated successfully",
      data: savedPrediction,
    });

  } catch (error) {
    console.error("Prediction Error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI prediction failed",
    });
  }
};
