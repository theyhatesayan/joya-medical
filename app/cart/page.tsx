"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price.replace("₹", "")) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-black text-center mb-8 md:mb-12 text-slate-900">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold">Your Cart Is Empty 🛒</h2>

            <Link
              href="/"
              className="inline-block mt-8 bg-teal-700 text-white px-8 py-4 rounded-2xl font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* Products */}

            <div className="space-y-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 items-center">
                    <div className="p-6 flex items-center justify-center bg-white">
                      <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="p-5 md:p-8 flex-1">
                      <span className="text-sm uppercase tracking-widest text-teal-700 font-bold">
                        Premium Product
                      </span>

                      <h2 className="text-2xl md:text-4xl font-black mt-2">{item.name}</h2>

                      <p className="text-2xl md:text-3xl font-bold text-teal-700 mt-3">
                        {item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-8">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-12 h-12 rounded-full bg-slate-200 hover:bg-slate-300 text-xl font-bold"
                        >
                          −
                        </button>

                        <span className="text-2xl font-bold min-w-[40px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-12 h-12 rounded-full bg-teal-700 text-white hover:bg-teal-800 text-xl font-bold"
                        >
                          +
                        </button>
                      </div>

                      <p className="mt-6 text-xl font-semibold">
                        Subtotal: ₹
                        {Number(item.price.replace("₹", "")) * item.quantity}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-6 text-red-500 font-semibold hover:text-red-700 w-fit"
                      >
                        Remove Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}

            <div className="sticky top-24 h-fit">
              <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-2xl">
                <h2 className="text-3xl font-black mb-8">Order Summary</h2>

                <div className="flex justify-between text-lg mb-4">
                  <span>Total Items</span>

                  <span>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="border-t border-slate-700 my-6"></div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Total</span>

                  <span className="text-2xl md:text-4xl font-black">₹{total}</span>
                </div>

                <Link
                  href="/checkout"
                  className="block text-center mt-8 bg-teal-600 hover:bg-teal-700 py-4 rounded-2xl font-bold text-lg transition"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
