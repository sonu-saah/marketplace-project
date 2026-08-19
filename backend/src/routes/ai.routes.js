import express from "express";
import { generateSmartDescription } from "../controllers/ai.controller.js";

const router = express.Router();

// AI API Endpoints (Dono routes map kar diye hain taaki mismatch na ho)
router.post("/price-suggestion", generateSmartDescription);
router.post("/generate-description", generateSmartDescription);

export default router;