import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Yeh assume kar rahe hain ki aapka user model "User" naam se hai
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    // 🔥 YEH NAYI FIELDS HAIN JO RENT AUR AI KE LIYE ZAROORI HAIN
    rentPrice: {
      type: String,
      default: "Not for Rent",
    },
    isRentable: {
      type: Boolean,
      default: false,
    },
    isBuyable: {
      type: Boolean,
      default: true,
    },
    aiVerified: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;