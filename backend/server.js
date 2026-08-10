import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => {
  res.send("URBNLACE Backend is running live! 🚀");
});

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/urbnlace")
  .then(() => {
    console.log("MongoDB Connected Successfully! 📦");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));
  })
  .catch((err) => console.log("Database connection error: ", err));