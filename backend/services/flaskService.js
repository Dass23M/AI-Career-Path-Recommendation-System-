const axios = require("axios");

exports.getPrediction = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/predict",
      userData
    );

    return response.data;
  } catch (error) {
    console.error("Flask Service Error:", error.message);
    throw new Error("Flask AI service failed");
  }
};
