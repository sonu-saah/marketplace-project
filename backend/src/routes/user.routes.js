import express from "express";
import { getUserProfile, getUserActivity } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:userId", getUserProfile);
router.get("/activity/:buyerName", getUserActivity);

export default router;