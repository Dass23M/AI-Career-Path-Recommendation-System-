const axios = require("axios");

// POST /api/ai/predict
exports.predictCareer = async (req, res) => {
  try {
    // data coming from frontend
    const userData = req.body;

    // send request to Flask AI service
const response = await axios.post(
  "http://localhost:5001/predict",
  {
    age: req.body.age,
    education: req.body.education,
    skills: req.body.skills,
    interests: req.body.interests
  }
);


    // return AI result to frontend
    res.status(200).json({
      success: true,
      prediction: response.data,
    });

  } catch (error) {
    console.error("AI Service Error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI prediction failed",
    });
  }
};
