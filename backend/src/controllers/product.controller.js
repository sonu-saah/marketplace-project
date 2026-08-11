import Product from "../models/Product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // 1. Cloudinary import kiya

// Naya Product Add Karne ka Logic
export const createProduct = async (req, res) => {
  try {
    const { sellerId, title, description, price, rentPrice, isRentable, isBuyable, aiVerified, category, brand, condition } = req.body;

    // 2. Check karna ki frontend ne photo bheji hai ya nahi
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required!" });
    }

    // 3. Photo ko temporarily pakadna aur Cloudinary par bhejna
    const imageLocalPath = req.file.path;
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);

    if (!uploadedImage) {
      return res.status(500).json({ message: "Error uploading image to Cloudinary" });
    }

    // 4. Cloudinary se mila asli URL database mein save karna
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
      imageUrl: uploadedImage.url // 🔥 Yahan asli image URL save ho raha hai!
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Baaki getAllProducts wala logic waisa hi rahega...
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};