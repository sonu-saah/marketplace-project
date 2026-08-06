import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-slate-900 border-b border-white/10 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Marketplace
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</Link>
          
          {/* Cart with Badge */}
          <Link to="/cart" className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-4 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          
          <Link to="/profile" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Profile</Link>
          <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}