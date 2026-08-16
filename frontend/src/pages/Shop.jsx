import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";




export default function Shop() {
  const [productsData, setProductsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000); // 🔥 Limit ko realistic 1 Lakh kar diya hai
  const [filterBuy, setFilterBuy] = useState(false); 
  const [filterRent, setFilterRent] = useState(false); 
  const [filterAi, setFilterAi] = useState(false); 

  const { addToCart } = useContext(CartContext);
  const categories = ["All", "Sneakers", "Watches", "Apparel", "Accessories", "Tech"];

  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching products from backend:", error);
      }
    };
    fetchRealProducts();
  }, []);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setMaxPrice(100000); // Reset max price smoothly
    setFilterBuy(false);  
    setFilterRent(false); 
    setFilterAi(false);   
  };

  // 🧠 IMPROVED FILTERING LOGIC
  const filteredProducts = productsData.filter((product) => {
    if (activeCategory !== "All" && product.category !== activeCategory) return false;
    
    const pPrice = Number(product.price) || 0;
    if (pPrice > maxPrice) return false;

    if (filterAi && product.aiVerified !== true) return false;
    if (filterBuy && product.isBuyable === false) return false;
    if (filterRent && product.isRentable === false) return false;
    
    return true; 
  });

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E5B074] selection:text-black pb-20">
      
      

      {/* Header Section */}
      <div className="px-6 md:px-16 pt-16 pb-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#E5B074]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Vault.</span>
        </h1>
        <p className="text-gray-400 max-w-xl text-sm md:text-base">
          Discover authenticated premium streetwear, luxury watches, and high-end gear. Buy them outright or rent them.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row px-6 md:px-16 pt-10 gap-10">
        
        {/* LEFT SIDEBAR (Fixed Filters) */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="sticky top-28 space-y-10">
            
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => handleCategoryClick(cat)}
                      className={`text-sm font-medium transition-all ${activeCategory === cat ? 'text-[#E5B074] pl-2 border-l-2 border-[#E5B074]' : 'text-gray-400 hover:text-white hover:pl-1'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-5">
                Max Price: ₹{Number(maxPrice).toLocaleString('en-IN')}
              </h3>
              {/* 🔥 Slider Max limit ko 1 Lakh par set kiya taaki easily control ho sake */}
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#E5B074] mb-3" 
              />
            </div>

            {/* 🔥 Fixed Checkboxes using standard HTML input */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filterBuy} 
                  onChange={(e) => setFilterBuy(e.target.checked)}
                  className="w-4 h-4 accent-[#E5B074] rounded cursor-pointer" 
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Buy / Resale Only</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filterRent} 
                  onChange={(e) => setFilterRent(e.target.checked)}
                  className="w-4 h-4 accent-[#E5B074] rounded cursor-pointer" 
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Available for Rent Only</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={filterAi} 
                  onChange={(e) => setFilterAi(e.target.checked)}
                  className="w-4 h-4 accent-[#E5B074] rounded cursor-pointer" 
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">AI Verified Only 🤖</span>
              </label>
            </div>
          </div>
        </aside>

        {/* RIGHT GRID (Products) */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 text-sm text-gray-500 font-bold uppercase tracking-widest">
            Showing {filteredProducts.length} Items
          </div>

          {filteredProducts.length === 0 ? (
             <div className="w-full py-20 text-center border border-dashed border-white/10 rounded-[2rem]">
               <p className="text-gray-400">No items match your selected filters.</p>
               <button onClick={() => handleCategoryClick("All")} className="mt-4 px-6 py-2 border border-[#E5B074] text-[#E5B074] rounded-full hover:bg-[#E5B074] hover:text-black transition-all">Reset Filters</button>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id || product.id} className="group flex flex-col bg-[#0A0A0A] p-4 rounded-[2rem] border border-white/5 hover:border-[#E5B074]/50 transition-all">
                  <div className="relative w-full h-[280px] bg-[#121212] rounded-[1.5rem] overflow-hidden mb-4 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>
                    
                    <img 
                      src={product.imageUrl || product.img} 
                      alt={product.title || product.name} 
                      className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700 z-0" 
                    />

                    {product.aiVerified && (
                      <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-[#E5B074]/30 px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="text-xs">🤖</span><span className="text-[8px] font-bold tracking-widest text-[#E5B074] uppercase">Verified</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                      <span className="text-[8px] font-bold tracking-widest text-white uppercase">{product.condition}</span>
                    </div>
                  </div>

                  <div className="px-2 flex-grow flex flex-col">
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">{product.brand}</p>
                    <h3 className="text-lg font-bold text-white mb-3 truncate group-hover:text-[#E5B074] transition-colors">{product.title || product.name}</h3>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto mb-4">
                      <div className="flex-1 text-left">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Buy</p>
                        <p className="text-sm font-bold text-white">₹ {product.price}</p>
                      </div>
                      <div className="h-8 w-px bg-white/10 mx-2"></div>
                      <div className="flex-1 text-right">
                        <p className="text-[10px] text-[#E5B074] uppercase tracking-widest mb-0.5">Rent</p>
                        <p className="text-sm font-bold text-white">{product.rentPrice ? `₹ ${product.rentPrice}` : "N/A"}</p>
                      </div>
                    </div>

                    {/* 🔥 ADD TO CART BUTTON */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-white/5 hover:bg-[#E5B074] text-white hover:text-black text-xs font-bold tracking-widest uppercase py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2"
                    >
                      <span>Add to Cart</span>
                      <span>🛒</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
  

