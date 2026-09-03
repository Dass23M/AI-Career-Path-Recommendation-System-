const axios = require("axios");

async function runTest() {
  try {
    console.log("Registering test user...");
    const email = `test${Date.now()}@test.com`;
    const regRes = await axios.post("http://localhost:5000/api/auth/register", {
      name: "Test User",
      email: email,
      password: "password123"
    });
    const token = regRes.data.data.token;
    console.log("Registered. Token:", token);

    console.log("Calling prediction API...");
    const predictRes = await axios.post("http://localhost:5000/api/ai/predict", {
      education: "Bachelor's",
      skills: ["Python", "Machine Learning"],
      interests: ["AI", "Data"]
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log("Prediction Success:", predictRes.data);
  } catch (err) {
    if (err.response) {
      console.error("Test Failed with response:", err.response.status, err.response.data);
    } else {
      console.error("Test Failed with error:", err.message);
    }
  }
}

runTest();
