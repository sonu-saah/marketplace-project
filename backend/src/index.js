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
import userRoutes from "./routes/user.routes.js";
import rentalRoutes from "./routes/rental.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import searchRoutes from "./routes/search.routes.js";
import fitRoutes from "./routes/fitRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// Public uploads folder
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRoutes); 
app.use("/api/products", productRoutes); 
app.use("/api/recommendations", recommendationRoutes); 
app.use("/api/marketplace", marketplaceRoutes); 
app.use("/api/payment", paymentRoutes); 
app.use("/api/orders", orderRoutes); 
app.use("/api/users", userRoutes); 
app.use("/api/rentals", rentalRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);

// 🔥 FIXED: Isko /api banaya taaki fitRoutes ke andar ke paths (/fit/profile, /ai/fit-explanation) direct match ho sakein
app.use("/api", fitRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Backend API! Database Connected Successfully.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});