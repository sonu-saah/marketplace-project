import express from "express";
import { 
  saveFitProfile, 
  getFitProfile, 
  addSizeChart, 
  calculateSizeRecommendation 
} from "../controllers/fitController.js";

const router = express.Router(); // 🔥 Pehle router declare karein

router.post("/fit-profile", saveFitProfile);
router.get("/fit-profile/:userId", getFitProfile);
router.post("/admin/size-chart", addSizeChart);
router.post("/size-recommendation", calculateSizeRecommendation); // 🔥 Phir routes define karein

export default router;