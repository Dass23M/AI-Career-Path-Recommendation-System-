const axios = require("axios");
const Prediction = require("../models/Prediction");

// POST /api/ai/predict
exports.predictCareer = async (req, res) => {
  try {
    const { age, education, skills, interests } = req.body;

    // 1️⃣ Call Flask AI service
    const flaskResponse = await axios.post(
      "http://localhost:5001/predict",
      {
        age,
        education,
        skills,
        interests,
      }
    );

    // Flask returns: { career: "Biostatistician" }
    const careerResult = flaskResponse.data.career;

    // 2️⃣ Save to MongoDB
    const newPrediction = await Prediction.create({
      user: req.user.id, // requires auth middleware
      age,
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
      message: "AI prediction failed",
    });
  }
};
