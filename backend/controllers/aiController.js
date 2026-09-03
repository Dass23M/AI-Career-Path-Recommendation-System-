const axios = require("axios");
const Prediction = require("../models/Prediction");
const Profile = require("../models/Profile");

// POST /api/ai/predict
exports.predictCareer = async (req, res) => {
  try {
    let { education, skills, interests } = req.body;

    if (!education || !skills || !interests) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: education, skills, interests",
      });
    }

    // Ensure skills and interests are strings (if arrays were passed)
    if (Array.isArray(skills)) skills = skills.join(", ");
    if (Array.isArray(interests)) interests = interests.join(", ");

    // 1️⃣ Call Flask AI service
    let aiServiceUrl = process.env.AI_SERVICE_URL || "http://localhost:5001";
    if (aiServiceUrl.endsWith('/')) {
      aiServiceUrl = aiServiceUrl.slice(0, -1);
    }
    
    let flaskResponse;
    try {
      flaskResponse = await axios.post(
        `${aiServiceUrl}/predict`,
        {
          education,
          skills,
          interests,
        }
      );
    } catch (flaskError) {
      console.error("Flask AI Service Connection Error:", flaskError.message);
      return res.status(500).json({
        success: false,
        message: `Failed to connect to AI Service at ${aiServiceUrl}. Please check your AI_SERVICE_URL environment variable on Render!`,
        error: flaskError.message,
        details: flaskError.response ? flaskError.response.data : null
      });
    }

    // Flask returns: { career: "Data Scientist" }
    const careerResult = flaskResponse.data.career;

    if (!careerResult) {
      return res.status(500).json({
        success: false,
        message: "AI service returned no prediction",
      });
    }

    // 2️⃣ Save to MongoDB
    try {
      if (!req.user) {
        throw new Error("User not found on request object");
      }

      await Prediction.create({
        user: req.user._id || req.user.id,
        education,
        skills,
        interests,
        career: careerResult,
      });

      // Auto-update Profile with latest input
      await Profile.findOneAndUpdate(
        { user: req.user._id || req.user.id },
        { 
          education, 
          skills: skills.split(",").map(s => s.trim()).filter(Boolean), 
          interests: interests.split(",").map(s => s.trim()).filter(Boolean)
        },
        { new: true, upsert: true }
      );
    } catch (dbError) {
      console.error("Database Save Error:", dbError.message);
      // We still return the prediction even if saving fails, or maybe we shouldn't? 
      // Let's at least log it.
    }

    // 3️⃣ Send clean response to frontend
    res.status(200).json({
      success: true,
      prediction: {
        career: careerResult,
      },
    });

  } catch (error) {
    console.error("Global AI Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI prediction failed due to an internal error.",
      error: error.message
    });
  }
};
