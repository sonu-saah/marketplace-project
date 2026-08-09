import express from "express";
import { sendMessage, getChatHistory } from "../controllers/chat.controller.js";

const router = express.Router();

// Chat API Endpoints
router.post("/send", sendMessage);
router.get("/history/:user1/:user2", getChatHistory);

export default router;