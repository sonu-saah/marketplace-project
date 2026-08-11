import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // 🔥 Axios import kiya

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Backend ko Email aur Password bhejna
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // Backend se aane wala data pakadna
      const { token, user } = response.data;

      // 🔥 Browser ki memory (localStorage) mein Token aur User details save karna
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("🎉 Login Successful!");
      navigate("/"); // Success ke baad Home page par bhejein

    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0b0a] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Glow & Blur Effects for Modern Vibe */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8C533E]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C88A58]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-[#171311]/70 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
        
        {/* Left Side: Brand Visual & Catchy Quote */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#231C18] to-[#120F0D] relative border-r border-white/5">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-widest text-[#E2A06E]">URBNLACE</span>
          </div>

          <div className="my-auto space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2A06E] to-[#A26744]">
              Step Bold, <br />Stay Iconic.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the next-gen marketplace for exclusive streetwear, rentals, and curated fashion with AI intelligence.
            </p>
          </div>

          <div className="text-xs text-gray-500">
            © 2026 URBNLACE Marketplace. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-400">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3.5 bg-[#211B18] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A58] focus:ring-1 focus:ring-[#C88A58] transition-all duration-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-[#211B18] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C88A58] focus:ring-1 focus:ring-[#C88A58] transition-all duration-300 text-sm"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-[#211B18] border-white/20 text-[#C88A58] focus:ring-0" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-[#C88A58] transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#C88A58] to-[#A26744] hover:from-[#d69865] hover:to-[#b3754e] text-white font-bold rounded-xl shadow-lg shadow-[#C88A58]/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-2 text-sm tracking-wide"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#E2A06E] font-medium hover:underline">
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}