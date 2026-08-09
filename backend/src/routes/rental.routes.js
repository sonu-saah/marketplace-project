import express from "express";
import { returnRental } from "../controllers/rental.controller.js";

const router = express.Router();

// Return API Endpoint
router.put("/return/:bookingId", returnRental);

export default router;