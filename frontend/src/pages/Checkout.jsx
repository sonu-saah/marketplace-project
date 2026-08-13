import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Payment Method ka state add kiya hai
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    paymentMethod: "cod", // Default COD
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((total, item) => total + Number(item.price || 0), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Razorpay Script Load karna
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Main Order Function (Dono handle karega)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/shop");
      return;
    }

    setLoading(true);

    // 1. Agar COD select kiya hai
    if (formData.paymentMethod === "cod") {
      setTimeout(() => {
        setLoading(false);
        alert("Order Placed Successfully! (Cash on Delivery) 🎉");
        localStorage.removeItem("urbnlace_cart");
        navigate("/");
        window.location.reload();
      }, 1500);
      return;
    }

    // 2. Agar Online Payment select kiya hai
    if (formData.paymentMethod === "online") {
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        setLoading(false);
        return;
      }

      try {
        // Backend API call - Dhyan rakhein yahan URL wahi ho jo postman me chal raha tha
        const { data } = await axios.post("http://localhost:5000/api/products/payment/create-order", {
          amount: totalPrice,
        });

        if (!data.success) {
          alert("Server error in creating payment order.");
          setLoading(false);
          return;
        }

        const options = {
          key: "YAHAN_APNI_RAZORPAY_KEY_ID_DAALEIN", // 🔥 IMPORTANT: Yahan apni Key ID zaroor daalein
          amount: data.order.amount,
          currency: "INR",
          name: "URBNLACE Vault",
          description: "Authenticated Streetwear & Gear",
          order_id: data.order.id,
          handler: function (response) {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            localStorage.removeItem("urbnlace_cart");
            navigate("/");
            window.location.reload();
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#E5B074",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error("Payment error:", error);
        alert("Payment initialization failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E5B074] selection:text-black py-12 px-4 sm:px-6 lg:px-8 pb-20">
      
   

      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Checkout.</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <form onSubmit={handlePlaceOrder} className="lg:w-2/3 space-y-8">
            
            {/* Delivery Details Form */}
            <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B074]">1. Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Full Name</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B074]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B074]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Street Address</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B074]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">City</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B074]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Phone Number</label>
                  <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B074]" />
                </div>
              </div>
            </div>

            {/* Payment Method Radio Buttons */}
            <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10 shadow-xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5B074]">2. Payment Method</h3>
              
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-colors ${formData.paymentMethod === 'cod' ? 'bg-[#121212] border-[#E5B074]' : 'bg-[#121212]/50 border-white/10 hover:border-white/30'}`}>
                  <input 
                    type="radio" name="paymentMethod" value="cod" 
                    checked={formData.paymentMethod === "cod"} onChange={handleChange} 
                    className="accent-[#E5B074] w-4 h-4" 
                  />
                  <div>
                    <p className="text-sm font-bold text-white">Cash / Pay on Delivery</p>
                    <p className="text-xs text-gray-400">Pay when item arrives at your doorstep.</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-colors ${formData.paymentMethod === 'online' ? 'bg-[#121212] border-[#E5B074]' : 'bg-[#121212]/50 border-white/10 hover:border-white/30'}`}>
                  <input 
                    type="radio" name="paymentMethod" value="online" 
                    checked={formData.paymentMethod === "online"} onChange={handleChange} 
                    className="accent-[#E5B074] w-4 h-4" 
                  />
                  <div>
                    <p className="text-sm font-bold text-white">Online Gateway (UPI / Credit Card)</p>
                    <p className="text-xs text-gray-400">Secure payment via Razorpay.</p>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(229,176,116,0.2)] hover:shadow-[0_0_25px_rgba(229,176,116,0.4)] active:scale-95 disabled:opacity-50"
            >
              {loading 
                ? "Processing..." 
                : formData.paymentMethod === "cod" 
                  ? `Place Order (COD) - ₹ ${totalPrice}` 
                  : `Pay Securely (₹ ${totalPrice})`
              }
            </button>
          </form>

          {/* Right Side: Cart Review Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10 sticky top-28 shadow-2xl space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Order Items ({cart.length})</h3>
              
              <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-500">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id || item.id} className="flex items-center gap-4 bg-[#121212] p-3 rounded-xl border border-white/5">
                      <img src={item.imageUrl || item.img} alt={item.title} className="w-12 h-12 object-contain bg-black/40 rounded-lg p-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.title || item.name}</p>
                        <p className="text-[10px] text-[#E5B074]">₹ {item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span><span className="text-white font-bold">₹ {totalPrice}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span><span className="text-[#E5B074] text-xl font-black">₹ {totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}