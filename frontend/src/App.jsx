import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SizeRecommendation from "./pages/SizeRecommendation";
import Sell from "./pages/Sell";
import Register from "./pages/Register"; 
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout"; // Aapke folder path ke hisaab se

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/size" element={<SizeRecommendation />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/register" element={<Register />} />
          <Route path="/SizeRecommendation" element={<SizeRecommendation />} />
         <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        
        </Routes>
      </Router>
    </CartProvider>
  );
}
