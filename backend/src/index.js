import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js"; // 👈 1. Import order routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes); 
app.use("/api/products", productRoutes); 
app.use("/api/recommendations", recommendationRoutes); 
app.use("/api/marketplace", marketplaceRoutes); 
app.use("/api/payment", paymentRoutes); 
app.use("/api/orders", orderRoutes); // 👈 2. Connect order routes

app.get("/", (req, res) => {
  res.send("Welcome to Backend API! Database Connected Successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});