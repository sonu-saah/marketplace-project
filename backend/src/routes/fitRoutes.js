import express from "express";
import { 
  saveFitProfile, 
  getFitProfile, 
  addSizeChart, 
  calculateSizeRecommendation, 
  getAiFitExplanation 
} from "../controllers/fitController.js";

const router = express.Router(); 

router.post("/fit-profile", saveFitProfile);
router.get("/fit-profile/:userId", getFitProfile);
router.post("/admin/size-chart", addSizeChart);
router.post("/size-recommendation", calculateSizeRecommendation); 
router.post("/ai/fit-explanation", getAiFitExplanation);
export default router;