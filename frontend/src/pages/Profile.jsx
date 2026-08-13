import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Maan lijiye hum local storage ya auth state se logged-in user ki ID le rahe hain
  // (Aap apne auth logic ke mutabik ise adjust kar sakte hain)
  const sellerId = localStorage.getItem("urbnlace_user_id") || "sample_seller_id"; 

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/user/${sellerId}`);
        if (data.success) {
          setUserProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching profile products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [sellerId]);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E5B074] selection:text-black py-12 px-4 sm:px-6 lg:px-8 pb-20">
      
    

      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* User Info Header */}
        <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              User <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Profile.</span>
            </h1>
            <p className="text-gray-400 text-sm">Manage your listed items, AI-verified gear, and account details.</p>
          </div>
          <Link 
            to="/shop" 
            className="bg-[#121212] border border-white/10 hover:border-[#E5B074] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
          >
            Explore Vault
          </Link>
        </div>

        {/* Listed Products Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-black tracking-wide text-[#E5B074]">Your Listed Products</h2>

          {loading ? (
            <p className="text-gray-500 text-sm">Loading your vault items...</p>
          ) : userProducts.length === 0 ? (
            <div className="bg-[#0A0A0A] p-12 rounded-[2rem] border border-white/10 text-center space-y-4">
              <p className="text-gray-400 text-sm">You haven't listed any items for sale yet.</p>
              <Link 
                to="/shop" 
                className="inline-block bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase px-6 py-3 rounded-xl"
              >
                List a Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userProducts.map((item) => (
                <div key={item._id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 space-y-4 shadow-lg">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-xl bg-black/40" />
                  <div>
                    <h3 className="font-bold text-sm truncate text-white">{item.title}</h3>
                    <p className="text-xs text-[#E5B074] font-semibold mt-1">₹ {item.price}</p>
                  </div>
                  <span className="inline-block bg-[#121212] text-[10px] font-bold text-gray-400 px-3 py-1 rounded-full border border-white/5 uppercase">
                    {item.condition || "Verified Gear"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}