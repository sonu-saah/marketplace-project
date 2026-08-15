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

// 4. Calculate Size Recommendation (Deterministic Engine)
export const calculateSizeRecommendation = async (req, res) => {
  try {
    const { userId, productId, brand, category } = req.body;

    // A. Fetch User Fit Profile
    const userProfile = await UserFitProfile.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json({ success: false, message: "Please set up your Fit Profile first!" });
    }

    // B. Fetch Size Chart for the brand & category
    const sizeCharts = await SizeChart.find({ brand, category });
    if (!sizeCharts || sizeCharts.length === 0) {
      return res.status(404).json({ success: false, message: "Size chart not available for this brand/category." });
    }

    // C. Algorithm: Match user chest and shoulder against available sizes
    let bestMatch = null;
    let highestScore = 0;
    let scoreBreakdown = {};

    for (const chart of sizeCharts) {
      // Calculate individual match percentages
      let chestDiff = Math.abs(userProfile.chest - ((chart.chestMin + chart.chestMax) / 2));
      let chestScore = Math.max(0, 100 - (chestDiff * 10));

      let shoulderScore = 100;
      if (chart.shoulderMin && chart.shoulderMax) {
        let shoulderDiff = Math.abs(userProfile.shoulder - ((chart.shoulderMin + chart.shoulderMax) / 2));
        shoulderScore = Math.max(0, 100 - (shoulderDiff * 10));
      }

      let overallScore = Math.round((chestScore * 0.6) + (shoulderScore * 0.4));

      if (overallScore > highestScore) {
        highestScore = overallScore;
        bestMatch = chart;
        scoreBreakdown = {
          chest: Math.round(chestScore),
          shoulder: Math.round(shoulderScore),
          overall: overallScore
        };
      }
    }

    res.status(200).json({
      success: true,
      recommendedSize: bestMatch ? bestMatch.size : "M",
      confidence: highestScore,
      fitScoreBreakdown: scoreBreakdown,
      risk: highestScore > 85 ? "Low Size Risk" : highestScore > 70 ? "Medium Size Risk" : "High Size Risk"
    });

  } catch (error) {
    console.error("Error calculating recommendation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};