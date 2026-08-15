import express from "express";
import { saveFitProfile, getFitProfile, addSizeChart } from "../controllers/fitController.js";

const router = express.Router();

router.post("/fit-profile", saveFitProfile);
router.get("/fit-profile/:userId", getFitProfile);
router.post("/admin/size-chart", addSizeChart);

export default router;