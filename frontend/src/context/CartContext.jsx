import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se purana cart data nikalna
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("snapkart_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Jab bhi cart update ho, usko LocalStorage mein save kar do
  useEffect(() => {
    localStorage.setItem("snapkart_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item._id === product._id);
      if (isItemInCart) {
        alert("Item is already in the cart!");
        return prevCart;
      }
      alert(`${product.title} added to cart!`);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};