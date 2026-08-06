import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      
      {/* Main Container - Split Screen Design */}
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Left Side: Minimalist Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h3 className="text-orange-500 font-extrabold text-xs tracking-[0.2em] uppercase mb-4">
              Logo Here
            </h3>
            <p className="text-gray-400 text-sm font-medium mb-1">Welcome back !!</p>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Sign in</h1>
          </div>

          <form className="space-y-8">
            {/* Email Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="test@gmail.com"
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
                placeholder="••••••••"
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-orange-500 transition-colors bg-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center">
              <button 
                type="button" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-10 rounded-full transition-all shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] hover:-translate-y-1 flex items-center gap-2 text-sm tracking-wide"
              >
                SIGN IN <span>→</span>
              </button>
            </div>
          </form>

          <div className="mt-10 text-center text-xs font-semibold text-gray-400">
            Don't have an account? <Link to="/register" className="text-orange-500 hover:text-orange-600 ml-1">Sign up</Link>
          </div>
        </div>

        {/* Right Side: Pastel Background & Vector Illustration */}
        <div className="w-full md:w-1/2 bg-[#FFF4EF] p-12 flex items-center justify-center relative overflow-hidden hidden md:flex">
            
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-orange-200/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-rose-200/50 rounded-full blur-3xl"></div>

            {/* Main Vector Illustration (Boy with Shopping Cart) */}
          {/* Main Vector Illustration (Boy with Shopping Cart) */}
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