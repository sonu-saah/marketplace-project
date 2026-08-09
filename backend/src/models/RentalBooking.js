import mongoose from "mongoose";

const rentalBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Dummy ke liye required hata diya hai
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  actualReturnDate: { type: Date },
  status: { type: String, default: "Rented" }, // Rented ya Returned
  lateDays: { type: Number, default: 0 },
  latePenalty: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("RentalBooking", rentalBookingSchema);