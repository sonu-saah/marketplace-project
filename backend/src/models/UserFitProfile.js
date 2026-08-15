import mongoose from "mongoose";

const userFitProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  height: { type: Number, required: true },
  weight: { type: Number },
  chest: { type: Number, required: true },
  waist: { type: Number, required: true },
  hip: { type: Number },
  shoulder: { type: Number, required: true },
  inseam: { type: Number },
  preferredFit: { 
    type: String, 
    enum: ["Slim", "Regular", "Relaxed", "Oversized"], 
    default: "Regular" 
  },
  previousBrandSizes: [
    {
      brand: String,
      size: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("UserFitProfile", userFitProfileSchema);