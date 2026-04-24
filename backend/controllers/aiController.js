const axios = require("axios");
const Prediction = require("../models/Prediction");

// POST /api/ai/predict
exports.predictCareer = async (req, res) => {
  try {
    const { education, skills, interests } = req.body;

    if (!education || !skills || !interests) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: education, skills, interests",
      });
    }

    // 1️⃣ Call Flask AI service
    const flaskResponse = await axios.post(
      "http://localhost:5001/predict",
      {
        education,
        skills,
        interests,
      }
    );

    // Flask returns: { career: "Data Scientist" }
    const careerResult = flaskResponse.data.career;

    if (!careerResult) {
      return res.status(500).json({
        success: false,
        message: "AI service returned no prediction",
      });
    }

    // 2️⃣ Save to MongoDB
    await Prediction.create({
      user: req.user.id,
      education,
      skills,
      interests,
      career: careerResult,
    });

    // 3️⃣ Send clean response to frontend
    res.status(200).json({
      success: true,
      prediction: {
        career: careerResult,
      },
    });

  } catch (error) {
    console.error("AI Service Error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI prediction failed. Please ensure the AI service is running.",
    });
  }
};
