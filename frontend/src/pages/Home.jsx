import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🌟 Register page ki tarah Home page ke liye bhi Dynamic Products ki List
const heroShowcase = [
  {
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png",
    tag: "Available for Rent",
    price: "₹ 2,500 /day",
    title1: "CURATE.",
    title2: "ELEVATE.",
    title3: "DOMINATE.",
    scale: "w-[85%]"
  },
  {
    image: "https://pngimg.com/uploads/watches/watches_PNG101443.png",
    tag: "Exclusive Drop",
    price: "₹ 45,000",
    title1: "OWN TIME,",
    title2: "STAY PREMIUM.",
    title3: "ICONIC.",
    scale: "w-[50%]"
  },
  {
    image: "https://pngimg.com/uploads/photo_camera/photo_camera_PNG101614.png",
    tag: "Verified Gear",
    price: "₹ 3,200 /day",
    title1: "CAPTURE LIFE,",
    title2: "STAY SHARP.",
    title3: "CREATE.",
    scale: "w-[70%]"
  },
  {
    image: "https://pngimg.com/uploads/headphones/headphones_PNG101979.png",
    tag: "High Demand",
    price: "₹ 1,800 /day",
    title1: "FEEL SOUND,",
    title2: "STAY TUNED.",
    title3: "VIBE.",
    scale: "w-[65%]"
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🌟 Har 3 seconds mein products aur animations change karne ke liye UseEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroShowcase.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#E5B074] selection:text-black">
      
      {/* ========================================= */}
      {/* 🌟 DRIBBBLE-LEVEL CSS ANIMATIONS          */}
      {/* ========================================= */}
      <style>
        {`
          html { scroll-behavior: smooth; }
          
          /* Smooth Text Reveal Animation */
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(60px) skewY(2deg); }
            100% { opacity: 1; transform: translateY(0) skewY(0); }
          }
          .animate-text-1 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
          .animate-text-2 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
          .animate-text-3 { animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards; opacity: 0; }
          
          /* Image Floating Effect */
          @keyframes floatWow {
            0% { transform: translateY(0px) scale(1) rotate(-2deg); }
            50% { transform: translateY(-20px) scale(1.02) rotate(2deg); }
            100% { transform: translateY(0px) scale(1) rotate(-2deg); }
          }
          .animate-float-wow { animation: floatWow 7s ease-in-out infinite; }
          
          @keyframes float-reverse {
            0% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float-reverse { animation: float-reverse 6s ease-in-out infinite; }

          /* Sleek Dark Scrollbar */
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #050505; }
          ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #E5B074; }
        `}
      </style>

     
      {/* ========================================= */}
      {/* 2. DYNAMIC WOW HERO SECTION               */}
      {/* ========================================= */}
      <header className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden px-6 md:px-16">
        
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] bg-[#E5B074]/15 rounded-full blur-[130px] pointer-events-none"></div>
        
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          <div className="lg:col-span-6 flex flex-col items-start z-20 pt-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-text-1">
              <span className="w-2 h-2 rounded-full bg-[#E5B074] animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#E5B074]">Next-Gen Platform</span>
            </div>
            
            {/* 🌟 Dynamic Text Crossfade Header */}
            <div className="relative h-[180px] md:h-[220px] w-full mb-8">
              {heroShowcase.map((item, index) => (
                <h1 
                  key={index} 
                  className={`absolute top-0 left-0 w-full text-[4.5rem] md:text-[6rem] lg:text-[7rem] font-black leading-[0.85] tracking-tighter transition-all duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden pb-1">{item.title1}</div>
                  <div className="overflow-hidden pb-1 text-transparent" style={{ WebkitTextStroke: '2px #E5B074' }}>{item.title2}</div>
                  <div className="overflow-hidden">{item.title3}</div>
                </h1>
              ))}
            </div>
            
            <p className="animate-text-3 text-gray-400 text-sm md:text-base max-w-md mb-10 leading-relaxed font-light" style={{ animationDelay: '0.8s' }}>
              The ultimate ecosystem to Buy, Sell, and Rent premium gear. Powered by Gemini AI for a seamless experience.
            </p>

            <div className="animate-text-3 flex items-center gap-5" style={{ animationDelay: '1s' }}>
              <a href="#features" className="px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#E5B074] transition-all shadow-xl">
                Explore Features
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[60vh] flex items-center justify-center">
            
            {/* 🌟 Dynamic Floating Product Carousel (Register Page ki tarah) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {heroShowcase.map((item, index) => (
                <img 
                  key={index}
                  src={item.image} 
                  alt="Marketplace Vault Item" 
                  className={`absolute z-20 transition-all duration-1000 ease-in-out animate-float-wow ${item.scale} ${
                    index === currentIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-6"
                  }`}
                  style={{ filter: 'drop-shadow(0 40px 40px rgba(0,0,0,0.8)) contrast(125%) brightness(110%)' }}
                />
              ))}
            </div>
            
            {/* Floating Card: Dynamic Price / Rent Badge */}
            <div className="absolute top-24 right-0 md:right-10 z-30 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl animate-float-reverse shadow-2xl">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                {heroShowcase[currentIndex].tag}
              </p>
              <p className="text-xl font-black text-white transition-all duration-500">
                {heroShowcase[currentIndex].price}
              </p>
            </div>

          
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* 3. NEW FEATURE SECTION (YOUR 3 PILLARS)   */}
      {/* ========================================= */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-16 py-24 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">One Platform. <br/><span className="text-[#E5B074]">Three Superpowers.</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">We have integrated three revolutionary systems into a single marketplace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: RESALE */}
          <div className="group relative bg-[#0A0A0A] border border-white/5 p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:border-[#E5B074]/50 hover:shadow-[0_20px_40px_rgba(229,176,116,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E5B074]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#E5B074]/20 transition-all duration-500">
                🔄
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-[#E5B074] transition-colors">Premium Resale</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Buy and sell authenticated pre-owned luxury items, streetwear, and tech. Give premium products a second life in a secure marketplace.
              </p>
              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <Link to="/shop" className="text-xs font-bold tracking-widest uppercase text-white border-b border-[#E5B074] pb-1">Start Selling ↗</Link>
              </div>
            </div>
          </div>

          {/* Card 2: RENTAL */}
          <div className="group relative bg-[#0A0A0A] border border-white/5 p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:border-[#E5B074]/50 hover:shadow-[0_20px_40px_rgba(229,176,116,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E5B074]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#E5B074]/20 transition-all duration-500">
                ⏳
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-[#E5B074] transition-colors">Flexible Rentals</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Need a designer blazer or high-end camera for a weekend? Rent it directly from verified users at a fraction of the cost.
              </p>
              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <Link to="/shop" className="text-xs font-bold tracking-widest uppercase text-white border-b border-[#E5B074] pb-1">Explore Rentals ↗</Link>
              </div>
            </div>
          </div>

          {/* Card 3: AI INTEGRATION */}
          <div className="group relative bg-[#0A0A0A] border border-white/5 p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:border-[#E5B074]/50 hover:shadow-[0_20px_40px_rgba(229,176,116,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E5B074]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E5B074]/20 rounded-full blur-[40px] group-hover:bg-[#E5B074]/40 transition-all"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#E5B074]/10 border border-[#E5B074]/30 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#E5B074]/30 transition-all duration-500">
                ✨
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-[#E5B074] transition-colors">Gemini AI Engine</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Our built-in GenAI automatically verifies products and suggests market-accurate pricing instantly.
              </p>
              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <Link to="/sell" className="text-xs font-bold tracking-widest uppercase text-[#E5B074] border-b border-[#E5B074] pb-1">Test AI Now ↗</Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* 4. THE VAULT (CATEGORIES)                 */}
      {/* ========================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-6 md:px-16 py-24 border-t border-white/5">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-black leading-none">
            The <span className="text-[#E5B074]">Vault.</span>
          </h2>
          
          <Link to="/shop" className="group relative inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#E5B074] hover:text-black transition-all duration-300">
            <span className="text-xs font-bold tracking-widest uppercase">View All Vault</span>
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
              ↗
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          {/* Card 1: Camera */}
          <div className="md:col-span-8 relative rounded-[2rem] overflow-hidden bg-[#111] group cursor-pointer border border-white/5 hover:border-[#E5B074]/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" alt="Camera" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"/>
            <div className="absolute bottom-8 left-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest mb-3 inline-block">Tech & Gear</span>
              <h3 className="text-3xl font-bold">Vintage DSLRs</h3>
            </div>
          </div>

          {/* Card 2: Blazer */}
          <div className="md:col-span-4 relative rounded-[2rem] overflow-hidden bg-[#111] group cursor-pointer border border-white/5 hover:border-[#E5B074]/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" alt="Blazer" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"/>
            <div className="absolute bottom-8 left-8 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
              <span className="px-3 py-1 bg-[#E5B074]/20 text-[#E5B074] backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest mb-3 inline-block">Luxury</span>
              <h3 className="text-2xl font-bold">Designer Blazers</h3>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
