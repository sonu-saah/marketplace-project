import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sell() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); 
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", brand: "", category: "Sneakers", condition: "New",
    buyPrice: "", rentPrice: "", aiVerification: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file); // 🔥 Asli file ko state mein save kar liya
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload a product image first! 📸");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // JSON ki jagah FormData banayenge photo bhejne ke liye
      const formDataToSend = new FormData();
      
      // 🔥 Aapka asli MongoDB ID yahan append ho raha hai
      formDataToSend.append("sellerId", "6a6fae40489c58d28720b516"); 
      
      formDataToSend.append("title", formData.name);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("condition", formData.condition);
      formDataToSend.append("price", formData.buyPrice);
      formDataToSend.append("rentPrice", formData.rentPrice ? `₹ ${formData.rentPrice}/d` : "Not for Rent");
      formDataToSend.append("isBuyable", true);
      formDataToSend.append("isRentable", formData.rentPrice ? true : false);
      formDataToSend.append("aiVerified", formData.aiVerification);
      
      // Backend mein upload.single("image") likha tha, isliye yahan naam "image" diya hai
      formDataToSend.append("image", imageFile); 

      // Axios call jisme Headers batayenge ki hum file bhej rahe hain
      await axios.post("http://localhost:5000/api/products/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert(`🎉 Boom! Your ${formData.brand} ${formData.name} is now live in the Vault!`);
      navigate("/shop"); 

    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to list item. Server error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E5B074] selection:text-black pb-20">
      
      {/* Navbar */}
      <nav className="w-full border-b border-white/5 py-5 px-8 md:px-16 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-xl font-black tracking-[0.2em] text-[#E5B074]">
          URBN<span className="text-white">LACE</span>
        </div>
        <div className="hidden md:flex space-x-10 text-xs font-bold tracking-widest uppercase text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-white transition-colors">The Vault</Link>
          <span className="text-white border-b-2 border-[#E5B074] pb-1">List Item</span>
        </div>
        <div className="flex space-x-6 items-center">
          <Link to="/profile" className="text-xs font-bold text-gray-400 hover:text-white">Profile</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12 flex flex-col xl:flex-row gap-16">
        
        {/* Left Side: Instructions */}
        <div className="xl:w-1/3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5B074]/30 bg-[#E5B074]/10 mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E5B074]">Seller Studio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
            Drop Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Grails.</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Join thousands of collectors. List your premium sneakers, luxury watches, and streetwear. Choose to sell them outright or earn passive income by renting them out.
          </p>

          <div className="space-y-6">
             <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-[#E5B074] font-bold border border-white/5">1</div>
                <div>
                   <h4 className="font-bold text-sm mb-1">Upload Details</h4>
                   <p className="text-xs text-gray-500">Add high-quality photos and exact product specifications.</p>
                </div>
             </div>
             <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-[#E5B074] font-bold border border-white/5">2</div>
                <div>
                   <h4 className="font-bold text-sm mb-1">Set Your Price</h4>
                   <p className="text-xs text-gray-500">Decide your Buy price and Per-Day Rent price.</p>
                </div>
             </div>
             <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-[#E5B074] font-bold border border-white/5">3</div>
                <div>
                   <h4 className="font-bold text-sm mb-1">AI Authentication (Optional)</h4>
                   <p className="text-xs text-gray-500">Get the 'Verified' badge using our AI image scanner to sell 3x faster.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="xl:w-2/3">
          <form onSubmit={handleSubmit} className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5B074]/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* 🔥 FITTING MAGIC: Blurry background + Original Image */}
            <div 
              onClick={() => fileInputRef.current.click()} 
              className="w-full h-48 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#E5B074] flex flex-col items-center justify-center cursor-pointer transition-colors mb-8 bg-[#111] group overflow-hidden relative"
            >
               <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
               
               {imagePreview ? (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center blur-xl opacity-40" 
                      style={{ backgroundImage: `url(${imagePreview})` }}
                    ></div>
                    <img src={imagePreview} alt="Preview" className="relative h-full w-full object-contain p-2 z-10" />
                  </>
               ) : (
                  <>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#E5B074]/20 transition-colors">
                       <span className="text-xl">📸</span>
                    </div>
                    <p className="text-sm font-bold text-gray-300 group-hover:text-[#E5B074] transition-colors">Drag & drop product images</p>
                    <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">or click to browse files</p>
                  </>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Product Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g., Air Jordan 1 Retro" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#E5B074] transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Brand</label>
                <input required name="brand" value={formData.brand} onChange={handleChange} type="text" placeholder="e.g., Nike, Rolex, Gucci" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#E5B074] transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#E5B074] transition-colors">
                  <option value="Sneakers">Sneakers</option>
                  <option value="Watches">Watches</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#E5B074] transition-colors">
                  <option value="New">Brand New / Deadstock</option>
                  <option value="Mint">Mint Condition</option>
                  <option value="Used">Gently Used</option>
                </select>
              </div>
            </div>

            <hr className="border-white/5 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 block">Buy Price (₹)</label>
                <input required name="buyPrice" value={formData.buyPrice} onChange={handleChange} type="number" placeholder="Enter full sale price" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#E5B074] transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#E5B074] font-bold mb-2 block">Rent Price (₹ / Day)</label>
                <input name="rentPrice" value={formData.rentPrice} onChange={handleChange} type="number" placeholder="Leave blank if not renting" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#E5B074] outline-none focus:border-[#E5B074] transition-colors placeholder-gray-600" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10 bg-[#111] p-4 rounded-xl border border-white/5">
               <input type="checkbox" name="aiVerification" checked={formData.aiVerification} onChange={handleChange} className="w-5 h-5 accent-[#E5B074] cursor-pointer" id="aiCheck" />
               <label htmlFor="aiCheck" className="cursor-pointer">
                  <h4 className="text-sm font-bold">Request AI Authentication 🤖</h4>
                  <p className="text-[10px] text-gray-500 mt-1">Our AI will scan your images to provide a 'Verified' badge.</p>
               </label>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(229,176,116,0.3)] transition-all flex justify-center items-center gap-2 transform active:scale-95">
              {isSubmitting ? (
                 <>
                   <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                   Processing Vault Entry...
                 </>
              ) : "List Item in Vault"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}