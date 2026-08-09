import express from "express";
import { generateSmartDescription } from "../controllers/ai.controller.js";

const router = express.Router();

// AI API Endpoint
router.post("/generate-description", generateSmartDescription);

export default router;