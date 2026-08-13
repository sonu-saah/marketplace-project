import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Total price calculate karna
  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Agar user logged in nahi hai toh login page par bhej sakte hain, ya direct checkout page par
    navigate("/checkout"); // Ya aapka jo bhi checkout route ho
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E5B074] selection:text-black py-12 px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Navbar */}
     

      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5B074] to-[#A26744]">Cart.</span>
          </h1>
          <p className="text-gray-400 text-sm">Review your curated items and proceed to secure checkout</p>
        </div>

        {cart.length === 0 ? (
          
          /* Empty Cart State - Dark Theme */
          <div className="bg-[#0A0A0A] rounded-[2rem] p-12 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center min-h-[450px] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E5B074]/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl mb-6 border border-white/5">
              🛒
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is currently empty</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-md">Looks like you haven't added any grails to your cart yet. Explore The Vault and start shopping!</p>
            <Link 
              to="/shop" 
              className="bg-[#E5B074] hover:bg-[#d49c5e] text-black text-xs font-black tracking-widest uppercase py-4 px-10 rounded-xl transition-all shadow-lg shadow-[#E5B074]/20"
            >
              Explore The Vault
            </Link>
          </div>

        ) : (
          
          /* Filled Cart State - Split Screen Style */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side: Cart Items List */}
            <div className="lg:w-2/3 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-[#0A0A0A] p-5 rounded-2xl border border-white/10 flex gap-6 items-center group hover:border-[#E5B074]/40 transition-all">
                  
                  <div className="h-24 w-24 bg-[#121212] rounded-xl p-2 flex-shrink-0 overflow-hidden relative flex items-center justify-center border border-white/5">
                    <img 
                      src={item.imageUrl || item.img} 
                      alt={item.title || item.name} 
                      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">{item.brand}</p>
                    <h3 className="text-base font-bold text-white line-clamp-1 mb-2">{item.title || item.name}</h3>
                    <div className="text-lg font-black text-[#E5B074]">₹{item.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="h-10 w-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                    title="Remove Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary Card */}
            <div className="lg:w-1/3">
              <div className="bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/10 sticky top-28 shadow-2xl">
                <h3 className="text-lg font-bold mb-6 text-white tracking-wide uppercase ">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="text-white font-bold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping Estimate</span>
                    <span className="text-green-400 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="text-white font-bold">₹0</span>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-white">Total Amount</span>
                    <span className="text-2xl font-black text-[#E5B074]">₹{totalPrice}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#E5B074] to-[#C98A47] text-black text-xs font-black tracking-widest uppercase py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(229,176,116,0.2)] hover:shadow-[0_0_25px_rgba(229,176,116,0.4)] active:scale-95"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#E5B074]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Secure SSL Vault Checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}