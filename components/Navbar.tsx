"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { cart } = useCart();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-3xl font-black tracking-tight text-slate-900">
              JOYA
            </span>

            <span className="text-[10px] uppercase tracking-[4px] text-teal-700 font-bold">
              Veterinary Store
            </span>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-4">

            <a
              href="#products"
              className="hidden md:block text-slate-700 hover:text-teal-700 font-medium transition"
            >
              Products
            </a>

            <Link
              href="/cart"
              className="relative bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-5 py-3 rounded-full font-semibold shadow-lg transition hover:scale-105"
            >
              🛒 Cart

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold min-w-[22px] h-[22px] flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}