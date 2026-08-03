import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String }, // Size Recommendation ke liye zaroori hai
    
    // 👇 YEH NAYI FIELDS ADD KAREIN (Aapke advanced features ke liye)
    size: { type: String }, // jaise: "S", "M", "L", "XL" (Clothing/Footwear ke liye)
    
    isRental: { type: Boolean, default: false }, // Kya ye product rent par available hai?
    rentalPricePerDay: { type: Number, default: 0 }, // Agar rent par hai, toh 1 din ka kitna rent hai
    
    condition: { type: String, default: "New" }, // "New" ya "Resale" (OLX feature ke liye)
    
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);