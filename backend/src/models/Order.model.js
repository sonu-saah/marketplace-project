import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  buyerName: { type: String, required: true },
  paymentStatus: { type: String, default: "Paid" },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;