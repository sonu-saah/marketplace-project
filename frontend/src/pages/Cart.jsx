import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Total price calculate karna
  const totalPrice = cart.reduce((total, item) => total + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Cart</h1>
          <p className="text-gray-500 font-medium mt-2">Review your items and proceed to checkout</p>
        </div>

        {cart.length === 0 ? (
          
          /* Empty Cart State - Premium UI */
          <div className="bg-white rounded-[30px] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[500px] relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-50 rounded-full blur-3xl -z-10"></div>
            
            <img 
              src="https://cdn3d.iconscout.com/3d/premium/thumb/empty-cart-4994508-4161723.png" 
              alt="Empty Cart" 
              className="w-64 mb-8 drop-shadow-xl animate-[bounce_4s_infinite_ease-in-out]"
              onError={(e) => {
                e.target.src = "https://cdn-icons-png.flaticon.com/512/11329/11329060.png";
              }}
            />
            <h2 className="text-3xl font-black text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md font-medium">Looks like you haven't added any items to your cart yet. Discover our amazing products and start shopping!</p>
            <Link 
              to="/" 
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
            >
              ← Back to Shopping
            </Link>
          </div>

        ) : (
          
          /* Filled Cart State - Split Screen Style */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side: Cart Items List */}
            <div className="lg:w-2/3 space-y-5">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 flex gap-6 items-center group hover:shadow-md transition-shadow">
                  
                  <div className="h-28 w-28 bg-gray-50 rounded-[16px] p-2 flex-shrink-0 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-2">{item.brand}</p>
                    <div className="text-xl font-black text-indigo-600">₹{item.price}</div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="h-10 w-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    title="Remove Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary Card */}
            <div className="lg:w-1/3">
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-xl font-black text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="text-gray-900 font-bold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Shipping Estimate</span>
                    <span className="text-green-500 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Tax</span>
                    <span className="text-gray-900 font-bold">₹0</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-indigo-600">₹{totalPrice}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] hover:-translate-y-1">
                  Proceed to Checkout
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Secure SSL Checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}