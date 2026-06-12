"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    console.log("ADDING:", product.name);

    setCart((prev) => {
      const updated = [...prev, product];
      console.log("UPDATED CART:", updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);