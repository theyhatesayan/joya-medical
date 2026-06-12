"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function FloatingCart() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (totalItems === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 animate-bounce">

        🛒 Cart

        <span className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold">
          {totalItems}
        </span>

      </div>
    </Link>
  );
}