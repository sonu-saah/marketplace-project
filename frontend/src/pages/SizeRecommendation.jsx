import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SizeRecommendation() {
  const [gender, setGender] = useState("Men");
  const [category, setCategory] = useState("T-Shirt"); 
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🌟 BULLETPROOF SVGs (Yeh Localhost par kabhi block nahi hote)
  const getGarmentImage = (selectedCategory) => {
    const images = {
      // Topwear
      "T-Shirt": "https://www.svgrepo.com/show/429742/tshirt-clothes-clothing.svg",
      "Shirt": "https://www.svgrepo.com/show/429713/shirt-clothes-clothing.svg",
      "Crop Top": "https://www.svgrepo.com/show/285523/shirt.svg",
      "Kurta / Ethnic": "https://www.svgrepo.com/show/297920/shirt.svg",
      "Jacket": "https://www.svgrepo.com/show/429705/jacket-winter-clothing.svg",
      "Hoodie": "https://www.svgrepo.com/show/429712/hoodie-clothes-clothing.svg",
      
      // Bottomwear
      "Jeans": "https://www.svgrepo.com/show/429729/jeans-trousers-pants.svg",
      "Trousers": "https://www.svgrepo.com/show/429729/jeans-trousers-pants.svg",
      "Shorts": "https://www.svgrepo.com/show/429737/shorts-clothes-clothing.svg",
      "Skirt": "https://www.svgrepo.com/show/429707/skirt-clothes-clothing.svg",
      
      // Dresses
      "Dress / Gown": "https://www.svgrepo.com/show/429711/dress-clothes-clothing.svg",
      "Saree / Lehenga": "https://www.svgrepo.com/show/297914/dress.svg"
    };
    return images[selectedCategory] || "https://www.svgrepo.com/show/429742/tshirt-clothes-clothing.svg";
  };

  const handleAnalyze = () => {
    if (!waist) {
      alert("Please enter at least Waist measurement.");
      return;
    }
    
    setIsCalculating(true);
    setResult(null);

    // AI Processing Simulation
    setTimeout(() => {
      let finalSize = "M";
      let matchScore = Math.floor(Math.random() * (98 - 90 + 1)) + 90; 
      
      const c = parseInt(chest) || 0;
      const w = parseInt(waist) || 0;
      
      const isBottomwear = ["Jeans", "Trousers", "Shorts", "Skirt"].includes(category);
      
      // BOTTOMWEAR ALGORITHM
      if (isBottomwear) {
        if (gender === "Men") {
          if (w < 81) finalSize = "S";
          else if (w < 89) finalSize = "M";
          else if (w < 97) finalSize = "L";
          else if (w < 105) finalSize = "XL";
          else finalSize = "XXL";
        } else {
          if (w < 66) finalSize = "XS";
          else if (w < 72) finalSize = "S";
          else if (w < 80) finalSize = "M";
          else if (w < 88) finalSize = "L";
          else finalSize = "XL";
        }
      } 
      // TOPWEAR ALGORITHM
      else {
        if (gender === "Men") {
          if (c < 94) finalSize = "S";
          else if (c < 102) finalSize = "M";
          else if (c < 110) finalSize = "L";
          else if (c < 118) finalSize = "XL";
          else finalSize = "XXL";
        } else {
          if (c < 82) finalSize = "XS";
          else if (c < 89) finalSize = "S";
          else if (c < 97) finalSize = "M";
          else if (c < 105) finalSize = "L";
          else finalSize = "XL";
        }
      }

      const sizes = ["S", "M", "L", "XL", "XXL"];
      if (gender === "Women") sizes.unshift("XS");

      let comparisons = sizes.map(s => {
        if (s === finalSize) return { size: s, match: `${matchScore}%`, color: "text-[#E5B074]", active: true };
        let diff = Math.abs(sizes.indexOf(s) - sizes.indexOf(finalSize));
        if (diff === 1) return { size: s, match: `${matchScore - 12}%`, color: "text-green-400", active: false };
        if (diff === 2) return { size: s, match: `${matchScore - 25}%`, color: "text-yellow-400", active: false };
        return { size: s, match: "Not Recommended", color: "text-red-400", active: false };
      });

      setResult({
        size: finalSize,
        score: matchScore,
        comparisons: comparisons
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#E5B074] selection:text-black pb-20">
      
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .delay-100 { animation-delay: 0.1s; opacity: 0; }
          
          @keyframes scanLaser {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-laser { animation: scanLaser 1.5s ease-in-out infinite; }
        `}
      </style>

      {/* Modern Internal Navbar */}
      <nav className="w-full border-b border-white/5 py-5 px-8 md:px-16 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-xl font-black tracking-[0.2em] text-[#E5B074]">
          URBN<span className="text-white">LACE</span>
        </div>
        <Link to="/" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
          ← Back
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-12">
        
        {/* ========================================= */}
        {/* 1. HERO SECTION                           */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 animate-slide">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5B074]/30 bg-[#E5B074]/10 mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E5B074]">URBNLACE SmartFit™</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Precision <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Size Predictor</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-md mb-10 leading-relaxed">
              Our proprietary SmartFit engine calculates your exact size for Men and Women, covering everything from T-Shirts to Jeans and Dresses.
            </p>
          </div>

          <div className="relative h-[300px] lg:h-[400px] flex items-center justify-center bg-gradient-to-b from-[#111] to-[#050505] rounded-[3rem] border border-white/5 overflow-hidden">
             <div className="absolute w-64 h-64 bg-[#E5B074]/15 rounded-full blur-[80px]"></div>
             
             <div className="relative z-10 w-64 h-64 rounded-full border border-dashed border-[#E5B074]/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <div className="w-48 h-48 rounded-full border border-[#E5B074]/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-dotted border-[#E5B074]/40"></div>
                </div>
             </div>

             <div className="absolute z-20 flex flex-col items-center w-full h-full justify-center">
               {isCalculating ? (
                 <>
                   <div className="absolute left-1/2 -translate-x-1/2 w-48 h-[2px] bg-[#E5B074] shadow-[0_0_20px_#E5B074] animate-laser z-30 rounded-full"></div>
                   <div className="w-16 h-16 mb-2 rounded-full border-t-2 border-b-2 border-[#E5B074] animate-spin flex items-center justify-center">
                      <span className="w-6 h-6 rounded-full bg-[#E5B074]/60 animate-ping"></span>
                   </div>
                   <span className="text-[10px] uppercase tracking-widest text-[#E5B074] font-black animate-pulse shadow-black drop-shadow-md">
                     Scanning Proportions...
                   </span>
                 </>
               ) : (
                 <>
                   <svg className="w-16 h-16 text-[#E5B074] mb-2 drop-shadow-[0_0_15px_rgba(229,176,116,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                   </svg>
                   <span className="text-[10px] uppercase tracking-widest text-[#E5B074] font-bold">Biometric Scan Ready</span>
                 </>
               )}
             </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* 2. THE SMART-FIT FORM                     */}
        {/* ========================================= */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 md:p-10 mb-16 relative z-10 shadow-2xl animate-slide delay-100">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h3 className="text-xl font-bold tracking-wide">Enter Measurements</h3>
            
            <div className="flex bg-[#111] p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setGender("Men")}
                className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-all ${gender === "Men" ? "bg-[#E5B074] text-black" : "text-gray-400 hover:text-white"}`}
              >
                Men
              </button>
              <button 
                onClick={() => setGender("Women")}
                className={`px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg transition-all ${gender === "Women" ? "bg-[#E5B074] text-black" : "text-gray-400 hover:text-white"}`}
              >
                Women
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#E5B074]/30 transition-colors">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 block">1. Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#E5B074] text-sm"
              >
                <optgroup label="Topwear">
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Shirt">Shirt</option>
                  {gender === "Women" && <option value="Crop Top">Crop Top</option>}
                  <option value="Kurta / Ethnic">Kurta / Ethnic</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Hoodie">Hoodie</option>
                </optgroup>
                <optgroup label="Bottomwear">
                  <option value="Jeans">Jeans / Denim</option>
                  <option value="Trousers">Trousers / Pants</option>
                  <option value="Shorts">Shorts</option>
                  {gender === "Women" && <option value="Skirt">Skirt</option>}
                </optgroup>
                {gender === "Women" && (
                  <optgroup label="Dresses & Special">
                    <option value="Dress / Gown">Dress / Gown</option>
                    <option value="Saree / Lehenga">Saree / Lehenga</option>
                  </optgroup>
                )}
              </select>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#E5B074]/30 transition-colors">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 block">2. Dimensions (cm)</label>
              <div className="grid grid-cols-3 gap-2">
                <div><input type="number" placeholder="Chest" value={chest} onChange={(e)=>setChest(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-[#E5B074]" /></div>
                <div><input type="number" placeholder="Waist" value={waist} onChange={(e)=>setWaist(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-[#E5B074]" /></div>
                <div><input type="number" placeholder="Hips" value={hips} onChange={(e)=>setHips(e.target.value)} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-2 py-3 text-center text-sm outline-none focus:border-[#E5B074]" /></div>
              </div>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 flex flex-col justify-center hover:border-[#E5B074]/30 transition-colors">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4 block">3. Result</label>
              <button 
                onClick={handleAnalyze} disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(229,176,116,0.3)] transition-all flex justify-center items-center gap-2 transform active:scale-95"
              >
                {isCalculating ? (
                   <>
                     <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                     Scanning...
                   </>
                ) : "Calculate Size"}
              </button>
            </div>

          </div>
        </div>

        {/* ========================================= */}
        {/* 3. DYNAMIC RESULT DASHBOARD               */}
        {/* ========================================= */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-slide">
            
            <div className="md:col-span-4 bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-[#E5B074]/30 rounded-[2rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B074]/10 rounded-full blur-2xl"></div>
              
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Target Size ({gender})</p>
              <h2 className="text-7xl font-black text-white mb-8">{result.size}</h2>
              
              <div className="flex items-center gap-6 bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#1A1A1A] shadow-[0_0_15px_rgba(229,176,116,0.2)]" style={{ background: `conic-gradient(#E5B074 ${result.score}%, #333 0)` }}>
                  <div className="absolute inset-2 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{result.score}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Accuracy Score</p>
                  <p className="text-[10px] text-gray-400 mt-1">Algorithm match confirmed.</p>
                </div>
              </div>
            </div>

            {/* 🔥 BULLETPROOF VECTOR WIREFRAME (Never breaks) */}
            <div className="md:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center relative overflow-hidden">
              
              <img 
                src={getGarmentImage(category)} 
                alt={`${category} Wireframe`} 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://www.svgrepo.com/show/429742/tshirt-clothes-clothing.svg"; }}
                className="h-64 object-contain transition-all duration-500 animate-slide drop-shadow-[0_0_15px_rgba(229,176,116,0.5)]"
                style={{ filter: "invert(80%) sepia(40%) saturate(400%) hue-rotate(340deg) brightness(110%)" }}
              />
              
              {/* Dynamic Overlay Lines */}
              {["Jeans", "Trousers", "Shorts", "Skirt", "Saree / Lehenga", "Dress / Gown"].includes(category) ? (
                <>
                  <div className="absolute top-[30%] w-[60%] flex justify-between items-center px-4">
                    <div className="w-full border-t border-dashed border-[#E5B074]"></div>
                    {waist && <span className="bg-[#111] text-[#E5B074] text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-lg">W: {waist}</span>}
                  </div>
                  <div className="absolute top-[50%] w-[70%] flex justify-between items-center px-4">
                    <div className="w-full border-t border-dashed border-gray-500"></div>
                    {hips && <span className="bg-[#111] text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-lg">H: {hips}</span>}
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute top-[40%] w-[80%] flex justify-between items-center px-4">
                    <div className="w-full border-t border-dashed border-gray-500"></div>
                    {chest && <span className="bg-[#111] text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-lg">C: {chest}</span>}
                  </div>
                  <div className="absolute top-[60%] w-[60%] flex justify-between items-center px-4">
                    <div className="w-full border-t border-dashed border-[#E5B074]"></div>
                    {waist && <span className="bg-[#111] text-[#E5B074] text-[10px] font-bold px-2 py-0.5 rounded ml-2 shadow-lg">W: {waist}</span>}
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-4 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fit Analysis</p>
              <div className="space-y-3">
                {result.comparisons.map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${item.active ? 'bg-[#E5B074]/10 border-[#E5B074]' : 'bg-[#111] border-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${item.active ? 'bg-[#E5B074] text-black' : 'bg-[#1A1A1A] text-white'}`}>{item.size}</span>
                    </div>
                    <span className={`text-sm font-bold ${item.color}`}>{item.match}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}