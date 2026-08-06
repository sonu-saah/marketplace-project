import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); // 👈 Cart function import kiya

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products/all"); // Update API path if needed
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-slate-900 py-16 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Next-Gen Marketplace & Rental Hub</h1>
          <p className="text-gray-400 mb-8 text-sm md:text-base">Buy, Rent, Resell, or list your pre-owned items instantly.</p>
          <div className="flex justify-center gap-4">
            <Link to="/sell" className="bg-orange-500 hover:bg-orange-600 px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg text-sm">
              + Sell / List Your Product (OLX)
            </Link>
            <Link to="/size" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3.5 rounded-xl font-bold text-white transition-all shadow-lg text-sm">
              AI Size Analyser
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-black text-gray-900">Featured Marketplace Items</h2>
          <span className="text-sm font-semibold text-indigo-600">{products.length} Items Available</span>
        </div>

        {loading ? (
          <div className="text-center py-24 text-gray-500 font-medium">Loading items...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="h-52 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-gray-100">
                    <img src={product.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"} alt={product.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-md">{product.category || "General"}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-2 line-clamp-1">{product.title}</h3>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                  </div>
                  <div className="space-y-2">
                    {/* 👇 Add to Cart Click Event */}
                    <button onClick={() => addToCart(product)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}