require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const aiRoutes = require("./routes/aiRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

// ✅ Configure CORS properly
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local frontend dev
      "ai-career-path-recommendation-system-kf4hg52ne.vercel.app", // your deployed frontend
    ],
    credentials: true, // allow cookies if using JWT in cookies
  }),
);

app.use(express.json());

// Root Test Route
app.get("/", (req, res) => {
  res.send("🚀 Career AI Backend Running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/ai", aiRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
