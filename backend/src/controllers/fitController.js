import UserFitProfile from "../models/UserFitProfile.js";
import SizeChart from "../models/SizeChart.model.js";

// 1. Save or Update User Fit Profile
export const saveFitProfile = async (req, res) => {
  try {
    const { userId, height, weight, chest, waist, hip, shoulder, inseam, preferredFit, previousBrandSizes } = req.body;

    let profile = await UserFitProfile.findOne({ userId });

    if (profile) {
      profile.height = height || profile.height;
      profile.weight = weight || profile.weight;
      profile.chest = chest || profile.chest;
      profile.waist = waist || profile.waist;
      profile.hip = hip || profile.hip;
      profile.shoulder = shoulder || profile.shoulder;
      profile.inseam = inseam || profile.inseam;
      profile.preferredFit = preferredFit || profile.preferredFit;
      profile.previousBrandSizes = previousBrandSizes || profile.previousBrandSizes;
      await profile.save();
    } else {
      profile = new UserFitProfile({
        userId, height, weight, chest, waist, hip, shoulder, inseam, preferredFit, previousBrandSizes
      });
      await profile.save();
    }

    res.status(200).json({ success: true, message: "Fit profile saved successfully!", profile });
  } catch (error) {
    console.error("Error saving fit profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2. Get User Fit Profile
export const getFitProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await UserFitProfile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ success: false, message: "Fit profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error fetching fit profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3. Admin: Add Size Chart Data
export const addSizeChart = async (req, res) => {
  try {
    const { brand, category, size, chestMin, chestMax, waistMin, waistMax, shoulderMin, shoulderMax, length } = req.body;

    const sizeChartEntry = new SizeChart({
      brand, category, size, chestMin, chestMax, waistMin, waistMax, shoulderMin, shoulderMax, length
    });

    await sizeChartEntry.save();
    res.status(201).json({ success: true, message: "Size chart added successfully", sizeChartEntry });
  } catch (error) {
    console.error("Error adding size chart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};