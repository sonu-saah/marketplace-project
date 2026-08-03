import express from "express";
import { calculateRent, suggestResalePrice } from "../controllers/marketplace.controller.js";

const router = express.Router();

router.post("/calculate-rent", calculateRent);
router.post("/suggest-resale", suggestResalePrice);

export default router;