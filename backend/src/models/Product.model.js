import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    // 🔥 NEW FIELDS FOR PREMIUM RESALE (OLX-style feature)
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    listingType: {
      type: String,
      enum: ["resale", "new"],
      default: "resale",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;