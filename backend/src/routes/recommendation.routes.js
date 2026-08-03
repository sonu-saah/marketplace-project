import express from "express";
import { recommendSize } from "../controllers/recommendation.controller.js";

const router = express.Router();

// POST route size recommend karne ke liye
router.post("/size", recommendSize);

export default router;