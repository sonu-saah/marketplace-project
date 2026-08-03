// 1. Rental Price Calculation (Days ke hisaab se total rent nikalna)
export const calculateRent = (req, res) => {
  try {
    const { rentalPricePerDay, days } = req.body;

    if (!rentalPricePerDay || !days) {
      return res.status(400).json({ message: "Rental price per day and number of days are required." });
    }

    const totalRent = rentalPricePerDay * days;

    res.status(200).json({
      success: true,
      rentalPricePerDay,
      daysBooked: days,
      totalRentAmount: totalRent,
      message: `Total rent for ${days} days is successfully calculated.`
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Resale (OLX Style) Price Suggestion (Purane product ka price suggest karna)
export const suggestResalePrice = (req, res) => {
  try {
    const { originalPrice, condition } = req.body;

    if (!originalPrice || !condition) {
      return res.status(400).json({ message: "Original price and product condition are required." });
    }

    let suggestedPrice = originalPrice; // 👈 Yahan 'P' capital kar diya gaya hai (Fixed)
    let deductionNote = "";

    // Condition ke hisaab se price drop karna
    const cond = condition.toLowerCase();
    if (cond === "like new" || cond === "barely used") {
      suggestedPrice = originalPrice * 0.75; // 25% kam
      deductionNote = "25% deducted because product is used/opened.";
    } else if (cond === "good" || cond === "moderately used") {
      suggestedPrice = originalPrice * 0.50; // 50% kam
      deductionNote = "50% deducted for moderate usage.";
    } else {
      suggestedPrice = originalPrice * 0.30; // 70% kam (Old/Heavily used)
      deductionNote = "70% deducted as the product is old or heavily used.";
    }

    res.status(200).json({
      success: true,
      originalPrice,
      condition,
      suggestedResalePrice: Math.round(suggestedPrice),
      note: deductionNote
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};