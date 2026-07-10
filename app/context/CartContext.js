"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const toggleCart = () => setCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartOpen, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
