// Smart Size Recommendation Logic
export const recommendSize = (req, res) => {
  try {
    const { height, weight, brand } = req.body;

    // Check karein ki height aur weight diya hai ya nahi
    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required for recommendation." });
    }

    let baseSize = "M"; // Default size

    // 1. Weight aur Height ke basis par basic logic
    if (weight < 55) {
      baseSize = "S";
    } else if (weight >= 55 && weight <= 70) {
      baseSize = "M";
    } else if (weight > 70 && weight <= 85) {
      baseSize = "L";
    } else {
      baseSize = "XL";
    }

    let note = "Standard fit based on your height and weight.";

    // 2. Brand-specific adjustments (Jaise Zara slim-fit hota hai)
    if (brand && brand.toLowerCase() === "zara") {
      if (baseSize === "S") baseSize = "M";
      else if (baseSize === "M") baseSize = "L";
      else if (baseSize === "L") baseSize = "XL";
      note = "Zara is a slim-fit brand, so we recommend one size up for comfort.";
    }

    res.status(200).json({
      success: true,
      brand: brand || "Generic",
      recommendedSize: baseSize,
      note: note
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};