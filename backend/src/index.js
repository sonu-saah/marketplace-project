import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import recommendationRoutes from "./routes/recommendation.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from "./routes/user.routes.js"; // 👈 1. Import user routes

dotenv.config();
connectDB();

const app = express();

// 👇 Sirf yahan CORS ko update kiya hai taaki frontend block na ho
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"], 
    credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes); 
app.use("/api/products", productRoutes); 
app.use("/api/recommendations", recommendationRoutes); 
app.use("/api/marketplace", marketplaceRoutes); 
app.use("/api/payment", paymentRoutes); 
app.use("/api/orders", orderRoutes); 
app.use("/api/users", userRoutes); // 👈 2. Connect user routes

app.get("/", (req, res) => {
  res.send("Welcome to Backend API! Database Connected Successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});