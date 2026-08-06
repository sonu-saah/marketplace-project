import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Sell() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Electronics",
    brand: "",
    condition: "Used", // Aapke backend ke hisab se
    imageUrl: "",
    description: "",
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend ko exact wahi data bhej rahe hain jo usko chahiye
      await API.post("/products/add", {
        ...formData,
        price: Number(formData.price), 
        // Dummy sellerId bhej rahe hain (jab tak user login properly connect nahi hota)
        sellerId: "60d0fe4f5311236168a109ca" 
      });
      
      alert("Product successfully listed on OLX/Marketplace!");
      navigate("/"); // Home page par wapas bhej dega
    } catch (err) {
      console.error("Error publishing product:", err);
      alert("Failed to list product. Server Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            OLX Item Listing
          </span>
          <h2 className="text-3xl font-black text-white mt-3">Post Your Item</h2>
        </div>

        <form onSubmit={handleListingSubmit} className="space-y-5">
          {/* Title & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Item Title *</label>
              <input type="text" placeholder="e.g. iPhone 14" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Brand *</label>
              <input type="text" placeholder="e.g. Apple, Nike" required value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm" />
            </div>
          </div>

          {/* Price, Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Price (₹) *</label>
              <input type="number" placeholder="999" required min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm">
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Vehicles">Vehicles</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Condition *</label>
              <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm">
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Image Link (URL) *</label>
            <input type="url" placeholder="https://..." required value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm" />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Description *</label>
            <textarea rows="3" placeholder="Condition details..." required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 text-sm resize-none" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm">
            {loading ? "Publishing..." : "Post Now (OLX Live)"}
          </button>
        </form>
      </div>
    </div>
  );
}