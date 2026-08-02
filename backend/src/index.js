import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// .env file ko load karne ke liye
dotenv.config();

// Database connect karna
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Postman se aane wale JSON data ko samajhne ke liye

// Testing Route
app.get("/", (req, res) => {
  res.send("Marketplace API is running perfectly!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});