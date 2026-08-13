import Product from "../models/Product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Razorpay from "razorpay";

// Razorpay Instance Initialize
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Naya Product Add Karne ka Logic
export const createProduct = async (req, res) => {
  try {
    const { sellerId, title, description, price, rentPrice, isRentable, isBuyable, aiVerified, category, brand, condition } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required!" });
    }

    const imageLocalPath = req.file.path;
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage) {
      return res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }

    const newProduct = new Product({
      sellerId,
      title,
      description,
      price,
      rentPrice,       
      isRentable,      
      isBuyable,       
      aiVerified,      
      category,
      brand,
      condition,
      imageUrl: uploadedImage.url 
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get Products by Specific Seller / User
export const getProductsByUser = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ sellerId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user products", error: error.message });
  }
};


// Sabhi Products Fetch Karne ka Logic
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 🔥 Razorpay Order Create Karne ka Logic (New Addition)
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Number(amount) * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: "Failed to create payment order", error: error.message });
  }
};