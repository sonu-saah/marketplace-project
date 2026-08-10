import express from "express";
import { searchProducts } from "../controllers/search.controller.js";

const router = express.Router();

// Route: GET /api/search?query=kuch_bhi
router.get("/", searchProducts);

export default router;