import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // 🔥 Axios import kiya

// 🌟 Humari Dynamic Products ki List (Images + unke Catchy Texts)
const showcaseItems = [
  {
    image: "https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png",
    text1: "Step Bold,",
    text2: "Stay Iconic",
    scale: "w-4/5" 
  },
  {
    image: "https://pngimg.com/uploads/photo_camera/photo_camera_PNG101614.png",
    text1: "Capture Life,",
    text2: "Stay Sharp",
    scale: "w-3/5" 
  },
  {
    image: "https://pngimg.com/uploads/headphones/headphones_PNG101979.png",
    text1: "Feel Sound,",
    text2: "Stay Tuned",
    scale: "w-3/5"
  },
  {
    image: "https://pngimg.com/uploads/watches/watches_PNG101443.png",
    text1: "Own Time,",
    text2: "Stay Premium",
    scale: "w-2/5"
  }
];

export default function Register() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // 🔥 Redirect karne ke liye

  // 🔥 Form data ko handle karne ke liye state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // 🌟 REACT USE-EFFECT: Har 3 seconds mein image change karne ke liye
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  // 🔥 Inputs mein type karte waqt state update karna
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Form Submit karne ka logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    
    try {
      // Backend ko bhejne wala data (Hum first aur last name ko jod kar 'name' bana rahe hain)
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password
      };

      // Backend API call (Route apna backend check kar lena)
const response = await axios.post("http://localhost:5000/api/auth/register", payload);
      
      alert("🎉 Account created successfully! Please login to continue.");
      navigate("/login"); // Success ke baad Login page par bhejein

    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Failed to create account. Please try again!");
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#130E0B] text-white overflow-hidden">
      
      {/* CSS ANIMATION FOR FLOATING EFFECT */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(-5deg); }
            50% { transform: translateY(-20px) rotate(0deg); }
            100% { transform: translateY(0px) rotate(-5deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          ::-webkit-scrollbar { display: none; }
        `}
      </style>

      {/* ==================================================== */}
      {/* LEFT SIDE: Dynamic Visual Branding */}
      {/* ==================================================== */}
      <div className="hidden lg:flex w-1/2 bg-[#8B5E41] flex-col justify-between p-12 relative overflow-hidden">
        
        <div className="z-20 font-bold tracking-[0.2em] text-xl text-[#2B1B12]">
          URBNLACE
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {showcaseItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt="Premium Product"
              className={`absolute animate-float z-10 transition-all duration-1000 ease-in-out ${item.scale} ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ filter: 'drop-shadow(30px 40px 25px rgba(0,0,0,0.6))' }} 
            />
          ))}
        </div>

        <div className="z-20 pb-10 relative h-40">
          {showcaseItems.map((item, index) => (
            <h1
              key={index}
              className={`absolute bottom-0 left-0 text-6xl xl:text-7xl font-black text-[#2B1B12] leading-[1.1] tracking-tighter transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {item.text1} <br /> {item.text2}
            </h1>
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* RIGHT SIDE: The Form */}
      {/* ==================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-[#130E0B]">
        <div className="w-full max-w-md">
          
          <h2 className="text-3xl font-semibold mb-10 text-center text-white tracking-wide">
            Create Account
          </h2>

          {/* 🔥 Form tag mein onSubmit add kiya */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">First Name</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">Last Name</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">Email</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">Password</label>
              <input required name="password" value={formData.password} onChange={handleChange} type="password" minLength="6" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
            </div>

            {/* Primary Button - Type submit kiya */}
            <button type="submit" className="w-full bg-[#8B5E41] hover:bg-[#9C6B4B] text-white font-medium rounded-2xl py-4 mt-4 transition-all duration-300 transform active:scale-95 shadow-[0_10px_30px_rgba(139,94,65,0.3)] hover:shadow-[0_15px_35px_rgba(139,94,65,0.5)]">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-[#8B5E41] hover:text-[#B3876A] font-medium transition-colors">Login</Link>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-[#3E2B22]"></div>
            <span className="px-4 text-xs text-gray-500 uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-[#3E2B22]"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-3 border border-[#3E2B22] hover:border-[#5A4032] hover:bg-[#1A130F] rounded-2xl py-3.5 text-xs font-medium transition-all duration-300 transform active:scale-95">
              📧 Continue with Email
            </button>
            <button type="button" className="flex items-center justify-center gap-3 border border-[#3E2B22] hover:border-[#5A4032] hover:bg-[#1A130F] rounded-2xl py-3.5 text-xs font-medium transition-all duration-300 transform active:scale-95">
              🍎 Continue with Apple
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
