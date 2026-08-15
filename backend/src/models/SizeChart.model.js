import mongoose from "mongoose";

const sizeChartSchema = new mongoose.Schema({
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  chestMin: { type: Number, required: true },
  chestMax: { type: Number, required: true },
  waistMin: { type: Number },
  waistMax: { type: Number },
  shoulderMin: { type: Number },
  shoulderMax: { type: Number },
  length: { type: Number }
}, { timestamps: true });

export default mongoose.model("SizeChart", sizeChartSchema);