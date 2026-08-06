import React, { useState } from "react";
import API from "../services/api";

export default function SizeRecommendation() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommendSize = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Backend route: /api/size (recommendSize controller)
      const response = await API.post("/recommend/size", { height, weight });
      setRecommendation(response.data.recommendedSize || response.data.size || "Standard Fit");
    } catch (err) {
      console.error("Error fetching size recommendation:", err);
      setRecommendation("Medium (Default)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl pointer-events-none"></div>
      
      <h3 className="text-2xl font-black mb-2 text-center bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
        AI Size Synthesizer
      </h3>
      <p className="text-xs text-slate-400 text-center mb-6">Enter your physical parameters to compute the optimal fit node.</p>

      <form onSubmit={handleRecommendSize} className="space-y-4 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Height (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 175" 
              required
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 70" 
              required
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all text-sm"
        >
          {loading ? "Computing Fit..." : "Calculate Optimal Size"}
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-center relative z-10">
          <span className="text-xs text-slate-400 block uppercase tracking-wider">Recommended Node Size</span>
          <span className="text-2xl font-black text-indigo-400 mt-1 block">{recommendation}</span>
        </div>
      )}
    </div>
  );
}