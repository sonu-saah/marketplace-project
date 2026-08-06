import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api"; // Axios instance import kiya

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Backend Login API Call
      const response = await API.post("/users/login", formData);
      
      // Token aur user details ko localStorage mein save karna
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user || formData.email));

      alert("Login Successful! 🎉");
      navigate("/"); // Home page par redirect karein
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      
      {/* Main Container - Split Screen Design */}
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Left Side: Minimalist Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h3 className="text-orange-500 font-extrabold text-xs tracking-[0.2em] uppercase mb-4">
              SnapKart Hub
            </h3>
            <p className="text-gray-400 text-sm font-medium mb-1">Welcome back !!</p>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Sign in</h1>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 text-xs font-bold rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="test@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors bg-transparent"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition-colors">
                  Forgot Password ?
                </a>
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors bg-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-3.5 px-10 rounded-full transition-all shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 text-sm tracking-wide`}
              >
                {loading ? "Signing in..." : "SIGN IN"} <span>→</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-semibold text-gray-400">
            Don't have an account? <Link to="/register" className="text-orange-500 hover:text-orange-600 ml-1">Sign up</Link>
          </div>
        </div>

        {/* Right Side: Pastel Background & Vector Illustration */}
        <div className="w-full md:w-1/2 bg-[#FFF4EF] p-12 flex items-center justify-center relative overflow-hidden hidden md:flex">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-rose-200/50 rounded-full blur-3xl"></div>

            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/online-shopping-4994512-4161727.png"
              alt="E-commerce Illustration"
              className="w-full max-w-sm object-contain z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
            />
        </div>

      </div>
    </div>
  );
}