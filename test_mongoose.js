const mongoose = require("mongoose");
const Prediction = require("./backend/models/Prediction");

async function test() {
  try {
    await mongoose.connect("mongodb://localhost:27017/career_ai", { useNewUrlParser: true });
    
    // Simulate req.body
    const education = "Bachelors";
    const skills = ["Python", "JS"];
    const interests = ["Data"];
    
    // Test creating
    const p = new Prediction({
      user: new mongoose.Types.ObjectId(),
      education,
      skills,
      interests,
      career: "Data Scientist"
    });
    
    await p.validate(); // just validate
    console.log("Validation passed");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

test();
