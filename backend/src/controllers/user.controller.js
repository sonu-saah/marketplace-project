import User from "../models/User.model.js";
import Order from "../models/Order.model.js";

// 1. User Profile Details Fetch Karna
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password"); // Password hide karke data dena
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. User ki Activity / Orders History Track Karna
export const getUserActivity = async (req, res) => {
  try {
    const { buyerName } = req.params;

    // Us specific buyer ke saare orders fetch karna
    const userOrders = await Order.find({ buyerName }).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      totalOrders: userOrders.length,
      orders: userOrders
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};