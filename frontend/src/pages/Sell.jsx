import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Sell() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    condition: "New",
    imageUrl: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/products/add", formData);
      alert("Product Listed Successfully! 🎉");
      navigate("/"); // Home page par wapas bhej dega
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to list product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 sm:p-8">
      
      {/* Main Container */}
      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">

        {/* Left Side: Illustration & Branding */}
        <div className="w-full md:w-[45%] bg-[#E8F3EA] p-12 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="z-10">
            <h3 className="text-green-600 font-extrabold text-xs tracking-[0.2em] uppercase mb-2">
              Seller Dashboard
            </h3>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">Turn your items <br/> into cash.</h1>
            <p className="text-gray-500 mt-4 font-medium max-w-sm">List your pre-owned or new products in seconds and reach thousands of buyers instantly.</p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-green-200/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-teal-200/40 rounded-full blur-3xl"></div>

          {/* 3D Illustration */}
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/delivery-boy-with-scooter-4994519-4161734.png"
            alt="Sell Illustration"
            className="w-full max-w-xs self-center z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
            onError={(e) => {
              e.target.src = "https://cdn3d.iconscout.com/3d/premium/thumb/online-shopping-4994512-4161727.png";
            }}
          />
        </div>

        {/* Right Side: Selling Form */}
        <div className="w-full md:w-[55%] p-10 md:p-14 bg-white overflow-y-auto max-h-[85vh] custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Item Details</h2>
            <p className="text-gray-400 text-sm font-medium">Please provide accurate details to sell faster.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Brand Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Product Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. iPhone 13 Pro Max"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-green-500 transition-colors bg-transparent"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="e.g. Apple"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-green-500 transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Category & Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Category *</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-500 transition-colors bg-transparent cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Furniture</option>
                  <option value="Books">Books & Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="e.g. 45000"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-green-500 transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Condition & Image Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Condition</label>
                <select 
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium focus:outline-none focus:border-green-500 transition-colors bg-transparent cursor-pointer"
                >
                  <option value="New">Brand New</option>
                  <option value="Like New">Like New (Mint)</option>
                  <option value="Used">Used (Good)</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Image URL *</label>
                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-green-500 transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe your product's features, defects (if any), and why you are selling it."
                value={formData.description}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-green-500 transition-colors bg-transparent resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_10px_25px_rgba(34,197,94,0.5)] hover:-translate-y-1 flex justify-center items-center gap-2`}
              >
                {loading ? "Listing Product..." : "Post Now"} 
                {!loading && <span>✨</span>}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}