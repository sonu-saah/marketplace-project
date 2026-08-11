import Product from "../models/Product.model.js";

// 1. Naya Product Add Karne ka Logic
export const createProduct = async (req, res) => {
  try {
    // Yahan humne rentPrice, isRentable, isBuyable aur aiVerified add kar diya hai
    const { sellerId, title, description, price, rentPrice, isRentable, isBuyable, aiVerified, category, brand, imageUrl, condition } = req.body;

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
      imageUrl,
      condition
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// 2. Saare Products Dekhne ka Logic
export const getAllProducts = async (req, res) => {
  try {
    // .populate() se user ki ID ke sath uska name aur email bhi mil jayega
    const products = await Product.find().populate("sellerId", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};