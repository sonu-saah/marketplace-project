import React, { useState } from "react";
import axios from "axios";

const FitModal = ({ isOpen, onClose, brand, category, userId }) => {
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [preferredFit, setPreferredFit] = useState("Regular");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [explaining, setExplaining] = useState(false);

  if (!isOpen) return null;

  const handleCalculateSize = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // 1. Save Profile & Get Recommendation
      await axios.post("http://localhost:5000/api/fit/profile", {
        userId,
        chest: Number(chest),
        waist: Number(waist),
        shoulder: Number(shoulder),
        preferredFit
      });

      const res = await axios.post("http://localhost:5000/api/fit/recommend", {
        userId,
        brand,
        category
      });

      setResult(res.data);
    } catch (err) {
      console.error("Error calculating size:", err);
      alert("Failed to calculate size. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAiExplanation = async () => {
    if (!result) return;
    try {
      setExplaining(true);
      const res = await axios.post("http://localhost:5000/api/ai/fit-explanation", {
        userId,
        brand,
        category,
        recommendedSize: result.recommendedSize,
        fitScoreBreakdown: result.fitScoreBreakdown
      });
      setExplanation(res.data.explanation);
    } catch (err) {
      console.error("Error fetching AI explanation:", err);
      setExplanation("Unable to fetch AI explanation at the moment.");
    } finally {
      setExplaining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Find My Perfect Size</h2>
        <p className="text-sm text-gray-500 mb-4">AI Cross-Brand Fit Intelligence for {brand} ({category})</p>

        {!result ? (
          <form onSubmit={handleCalculateSize} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Chest (inches)</label>
              <input 
                type="number" 
                value={chest} 
                onChange={(e) => setChest(e.target.value)} 
                required 
                placeholder="e.g. 37"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Waist (inches)</label>
              <input 
                type="number" 
                value={waist} 
                onChange={(e) => setWaist(e.target.value)} 
                required 
                placeholder="e.g. 32"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Shoulder (inches)</label>
              <input 
                type="number" 
                value={shoulder} 
                onChange={(e) => setShoulder(e.target.value)} 
                required 
                placeholder="e.g. 17"
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Preferred Fit</label>
              <select 
                value={preferredFit} 
                onChange={(e) => setPreferredFit(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-black outline-none bg-white"
              >
                <option value="Slim">Slim Fit</option>
                <option value="Regular">Regular Fit</option>
                <option value="Loose">Loose Fit</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              {loading ? "Analyzing Fit..." : "Calculate My Size"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Recommended Size</span>
              <div className="text-4xl font-extrabold text-black my-1">{result.recommendedSize}</div>
              <p className="text-xs text-green-600 font-medium">Overall Match: {result.fitScoreBreakdown.overall}%</p>
            </div>

            <div className="space-y-2">
              <button 
                onClick={handleGetAiExplanation}
                disabled={explaining}
                className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm"
              >
                {explaining ? "Gemini is analyzing..." : "✨ Why this size? (Ask AI)"}
              </button>

              {explanation && (
                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-xs text-indigo-900 leading-relaxed">
                  <strong>AI Fit Assistant:</strong> {explanation}
                </div>
              )}
            </div>

            <button 
              onClick={() => setResult(null)}
              className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition duration-200 text-sm"
            >
              Recalculate Measurements
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitModal;