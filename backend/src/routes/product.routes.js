import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { 
  getAllProducts, 
  createProduct, 
  createPaymentOrder, 
  getProductsByUser 
} from "../controllers/product.controller.js";

const router = express.Router();

// Get all products route
router.get("/", getAllProducts); 

// Add product route with Multer image upload middleware
router.post("/add", upload.single("image"), createProduct);

// Razorpay Payment Order Route
router.post("/payment/create-order", createPaymentOrder);

// User ke products fetch karne ka route
router.get("/user/:sellerId", getProductsByUser);

export default router;