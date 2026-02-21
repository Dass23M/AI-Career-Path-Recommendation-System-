const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
