import Product from "../models/Product.model.js";

export const searchProducts = async (req, res) => {
  try {
    // URL se search keyword nikalna (e.g., ?query=camera)
    const searchQuery = req.query.query; 

    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // MongoDB ka $regex (Regular Expression) use karke title aur description dono mein dhoondhna
    // $options: "i" ka matlab case-insensitive (CAMERA, camera, CaMeRa sab match karega)
    const results = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (error) {
    res.status(500).json({ message: "Error searching products", error: error.message });
  }
};