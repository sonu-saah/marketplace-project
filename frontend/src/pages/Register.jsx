import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      
      {/* Main Container - Split Screen Design (Reversed for variation) */}
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[600px]">

        {/* Right Side: Minimalist Registration Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white z-10">
          <div className="mb-10">
            <h3 className="text-blue-600 font-extrabold text-xs tracking-[0.2em] uppercase mb-4">
              Join The Hub
            </h3>
            <p className="text-gray-400 text-sm font-medium mb-1">Start your journey with us</p>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Sign up</h1>
          </div>

          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sonu Kumar Sah"
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-colors bg-transparent"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="sonusah22699@gmail.com"
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-colors bg-transparent"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full border-b-2 border-gray-100 py-2 text-gray-800 font-medium placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-colors bg-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="button" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-full transition-all shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                CREATE ACCOUNT <span>→</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs font-semibold text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 ml-1">Sign in here</Link>
          </div>
        </div>

        {/* Left Side: Cool Blue Background & Vector Illustration */}
        <div className="w-full md:w-1/2 bg-[#F0F7FF] p-12 flex items-center justify-center relative overflow-hidden hidden md:flex">
            
            {/* Background Decorative Glowing Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-200/60 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-purple-200/50 rounded-full blur-3xl"></div>

            {/* Main Vector Illustration */}
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/boy-using-laptop-4994520-4161735.png"
              alt="Register Illustration"
              className="w-full max-w-sm object-contain z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
              onError={(e) => {
                // Yeh fallback hai incase original link break ho jaye
                e.target.src = "https://cdn3d.iconscout.com/3d/premium/thumb/online-shopping-4994512-4161727.png";
              }}
            />
        </div>

      </div>
    </div>
  );
}