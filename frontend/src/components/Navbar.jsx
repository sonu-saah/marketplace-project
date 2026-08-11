import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // 🔥 Page load hote hi check karein ki user logged in hai ya nahi
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 Logout karne ka function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-white/10 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Marketplace
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</Link>
          <Link to="/shop" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">The Vault</Link>
          <Link to="/sell" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">List Item</Link>
          
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

          {/* 🔥 Conditional Rendering: Agar user logged in hai toh Name & Logout, nahi toh Login button */}
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                Hi, {currentUser.name.split(" ")[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}