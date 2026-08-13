import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check karein ki user logged in hai ya nahi (Local storage ke base par)
  useEffect(() => {
    const userId = localStorage.getItem("urbnlace_user_id");
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Page change hone par check karega

  const handleLogout = () => {
    localStorage.removeItem("urbnlace_user_id"); // ID hata do
    setIsLoggedIn(false);
    navigate("/"); // Home page par bhej do
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-[#0A0A0A]/85 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E5B074] to-[#A26744] flex items-center justify-center text-black font-black text-sm tracking-tighter shadow-lg group-hover:scale-105 transition-transform">
            UL
          </div>
          <span className="text-sm font-black tracking-[0.25em] text-white">
            URBN<span className="text-[#E5B074]">LACE</span>
          </span>
        </Link>

        {/* Clean Core Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/[0.03] border border-white/5 rounded-full p-1">
          {[
            { name: "Home", path: "/" },
            { name: "The Vault", path: "/shop" },
            { name: "List Item", path: "/add" },
            { name: "Cart", path: "/cart" },
            ...(isLoggedIn ? [{ name: "Profile", path: "/profile" }] : []),
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-[#E5B074] text-black shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Dynamic Right Action (Login / Logout Toggle) */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded-full shadow-lg hover:opacity-95 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
