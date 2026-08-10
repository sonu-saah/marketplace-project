import express from "express";
import { getAllProducts, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

// GET request: Saare products database se fetch karne ke liye
router.get("/", getAllProducts); 

// POST request: Naya product database mein add/save karne ke liye
router.post("/add", createProduct);

export default router;