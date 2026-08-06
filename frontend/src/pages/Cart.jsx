import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Total price calculate karna
  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-8">Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
            <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex gap-4 items-center">
                  <img src={item.imageUrl} alt={item.title} className="h-24 w-24 object-cover rounded-xl border border-gray-100" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="text-red-500 hover:text-red-700 text-sm font-bold bg-red-50 px-3 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
              <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Order Summary</h3>
              <div className="flex justify-between mb-2 text-gray-600 text-sm">
                <span>Items ({cart.length})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600 text-sm">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4 mb-6">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-black text-gray-900">₹{totalPrice}</span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}