import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: false // 👈 Yahan true ki jagah false kar dein
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    size: { type: String },
    isRental: { type: Boolean, default: false },
    rentalPricePerDay: { type: Number, default: 0 },
    condition: { type: String, default: "New" },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);