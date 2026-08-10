import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
      {/* 1. NAVBAR                                 */}
      {/* ========================================= */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 py-5 px-8 md:px-16 flex justify-between items-center transition-all duration-300">
        <div className="text-xl font-black tracking-[0.2em] text-[#E5B074]">
          URBN<span className="text-white">LACE</span>
        </div>
        
        <div className="hidden md:flex space-x-10 text-xs font-bold tracking-widest uppercase text-gray-400">
          <Link to="/" className="text-white border-b-2 border-[#E5B074] pb-1">Home</Link>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#categories" className="hover:text-white transition-colors">Vault</a>
          <Link to="/sell" className="hover:text-[#E5B074] transition-colors flex items-center gap-2">
            <span>Sell</span>
            <span className="bg-[#E5B074] text-black px-2 py-0.5 rounded-full text-[10px]">AI</span>
          </Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Link to="/login" className="text-xs font-bold tracking-widest uppercase hover:text-[#E5B074] transition-colors">Log In</Link>
          <Link to="/register" className="px-6 py-2.5 bg-[#E5B074] text-black text-xs font-black tracking-widest uppercase rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(229,176,116,0.3)]">
            Join
          </Link>
        </div>
      </nav>

      {/* ========================================= */}
      {/* 2. WOW HERO SECTION                       */}
      {/* ========================================= */}
      <header className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden px-6 md:px-16">
        
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] bg-[#E5B074]/15 rounded-full blur-[130px] pointer-events-none"></div>
        
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          <div className="lg:col-span-6 flex flex-col items-start z-20 pt-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-text-1">
              <span className="w-2 h-2 rounded-full bg-[#E5B074] animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#E5B074]">Next-Gen Platform</span>
            </div>
            
            <h1 className="text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-black leading-[0.85] tracking-tighter mb-8">
              <div className="animate-text-1 overflow-hidden pb-1">CURATE.</div>
              <div className="animate-text-2 overflow-hidden pb-1 text-transparent" style={{ WebkitTextStroke: '2px #E5B074' }}>ELEVATE.</div>
              <div className="animate-text-3 overflow-hidden">DOMINATE.</div>
            </h1>
            
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
            {/* The WOW Product */}
            <img 
              src="https://pngimg.com/uploads/sneakers/sneakers_PNG2.png" 
              alt="Hype Sneaker" 
              className="absolute z-20 w-[90%] md:w-[80%] animate-float-wow drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)] filter contrast-125 brightness-110"
            />
            
            {/* Floating Card: Rent Option */}
            <div className="absolute top-24 right-0 md:right-10 z-30 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl animate-float-reverse shadow-2xl">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Available for Rent</p>
              <p className="text-xl font-black text-white">₹ 2,500 <span className="text-xs font-normal text-gray-400">/day</span></p>
            </div>

            {/* Floating Card: AI Engine */}
            <div className="absolute bottom-20 left-0 md:left-5 z-30 bg-gradient-to-br from-[#E5B074]/20 to-black/80 backdrop-blur-xl border border-[#E5B074]/30 px-6 py-4 rounded-full animate-float shadow-2xl flex items-center gap-4">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-[10px] text-[#E5B074] uppercase tracking-widest font-bold">Smart Pricing</p>
                <p className="text-xs font-medium text-white">Estimated Value: ₹35k</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================= */}
      {/* 🌟 3. NEW FEATURE SECTION (YOUR 3 PILLARS)*/}
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
                <span className="text-xs font-bold tracking-widest uppercase text-white border-b border-[#E5B074] pb-1">Start Selling ↗</span>
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
                <span className="text-xs font-bold tracking-widest uppercase text-white border-b border-[#E5B074] pb-1">Explore Rentals ↗</span>
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
              <h3 className="text-2xl font-bold mb-4 tracking-wide text-white group-hover:text-[#E5B074] transition-colors">Gemini 3 AI Engine</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Our built-in GenAI automatically writes attractive product descriptions and suggests market-accurate pricing instantly.
              </p>
              <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-xs font-bold tracking-widest uppercase text-[#E5B074] border-b border-[#E5B074] pb-1">Test AI Now ↗</span>
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
          
          {/* 🌟 VIEW ALL VAULT BUTTON (Now fixed with an interactive arrow animation!) */}
          <Link to="#" className="group relative inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-[#E5B074] hover:text-black transition-all duration-300">
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
