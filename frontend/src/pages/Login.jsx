import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 🌟 Same showcase items matching register aesthetic
const showcaseItems = [
  {
    image: "https://pngimg.com/uploads/watches/watches_PNG101443.png",
    text1: "Welcome Back,",
    text2: "Stay Premium",
    scale: "w-2/5"
  },
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
  }
];

export default function Login() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      if (data.success) {
        const userId = data.userId || data.user?._id;
        if (userId) {
          localStorage.setItem("urbnlace_user_id", userId);
        }
        alert("✨ Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid credentials. Please try again!");
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-[#130E0B] text-white overflow-hidden">
      
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

      {/* LEFT SIDE: Visual Branding */}
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

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10 bg-[#130E0B]">
        <div className="w-full max-w-md">
          
          <h2 className="text-3xl font-semibold mb-10 text-center text-white tracking-wide">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">Email</label>
              <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block pl-1 font-medium">Password</label>
              <input required name="password" value={formData.password} onChange={handleChange} type="password" className="w-full bg-transparent border border-[#3E2B22] focus:border-[#8B5E41] rounded-2xl px-5 py-3.5 outline-none transition-all duration-300 text-sm hover:border-[#5A4032] focus:shadow-[0_0_15px_rgba(139,94,65,0.2)]" />
            </div>

            <button type="submit" className="w-full bg-[#8B5E41] hover:bg-[#9C6B4B] text-white font-medium rounded-2xl py-4 mt-4 transition-all duration-300 transform active:scale-95 shadow-[0_10px_30px_rgba(139,94,65,0.3)] hover:shadow-[0_15px_35px_rgba(139,94,65,0.5)]">
              Login to Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account? <Link to="/register" className="text-[#8B5E41] hover:text-[#B3876A] font-medium transition-colors">Register</Link>
          </div>

        </div>
      </div>
    </div>
  );
}