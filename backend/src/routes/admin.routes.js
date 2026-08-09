import express from "express";
import { getAllUsers, getAllProducts, getAllRentals } from "../controllers/admin.controller.js";

const router = express.Router();

// Admin API Endpoints
router.get("/users", getAllUsers);
router.get("/products", getAllProducts);
router.get("/rentals", getAllRentals);

export default router;