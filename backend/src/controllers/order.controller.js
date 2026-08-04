import Order from "../models/Order.model.js";

// 1. Naya Order Place Karna (Save to Database)
export const createOrder = async (req, res) => {
  try {
    const { productName, amount, buyerName } = req.body;

    if (!productName || !amount || !buyerName) {
      return res.status(400).json({ message: "All order fields are required." });
    }

    const newOrder = new Order({
      productName,
      amount,
      buyerName
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed and saved successfully!",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Saare Orders Fetch Karna (Order History)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // Naye orders pehle dikhenge
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};