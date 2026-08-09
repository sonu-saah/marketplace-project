// 👇 Yahan maine file ke naam exactly aapke folder ke hisaab se theek kar diye hain
import User from "../models/User.model.js"; 
import Product from "../models/Product.model.js"; 
import RentalBooking from "../models/RentalBooking.js"; 

// 1. Get All Users API
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// 2. Get All Products API
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// 3. Get All Rental Bookings API
export const getAllRentals = async (req, res) => {
  try {
    const rentals = await RentalBooking.find().populate("user").populate("product"); 
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rentals", error: error.message });
  }
};