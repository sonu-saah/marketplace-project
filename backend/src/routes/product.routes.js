import express from "express";
import { getAllProducts, createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // 1. Multer import kiya

const router = express.Router();

router.get("/", getAllProducts); 

// 2. Route ke beech mein upload.single("image") laga diya
// Iska matlab hai frontend se jo photo aayegi, uska naam "image" hoga
router.post("/add", upload.single("image"), createProduct);

export default router;