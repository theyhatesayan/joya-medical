"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("₹", "")) * item.quantity,
    0
  );

  const sendWhatsapp = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!mobile.trim()) {
      alert("Please enter mobile number");
      return;
    }

    if (mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (!address.trim()) {
      alert("Please enter address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const products = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ₹${
            Number(item.price.replace("₹", "")) * item.quantity
          }`
      )
      .join("\n");

    const message = `
🛒 NEW ORDER - JOYA Medical & General Store

👤 Name: ${name}
📞 Mobile: ${mobile}

📍 Address:
${address}

🐐 Products:
${products}

💰 Total Amount: ₹${total}

💳 Payment Method:
Cash On Delivery (COD)
`;

    window.open(
      `https://wa.me/919669913326?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart();

    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 500);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-center text-slate-900 mb-12">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Customer Details */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border">
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-teal-50 rounded-xl p-3 text-center">
                🚚
                <p className="text-xs mt-1">Fast Delivery</p>
              </div>

              <div className="bg-green-50 rounded-xl p-3 text-center">
                💵
                <p className="text-xs mt-1">Cash On Delivery</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-3 text-center">
                🛡️
                <p className="text-xs mt-1">Trusted Store</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">
              Customer Details
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border p-4 rounded-xl"
              />

              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-4 rounded-xl h-32"
              />

              <div className="bg-slate-100 p-4 rounded-xl">
                <h3 className="font-bold">Payment Method</h3>
                <p className="mt-2">
                  ✅ Cash On Delivery (COD)
                </p>
              </div>

              <button
                onClick={sendWhatsapp}
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition"
              >
                🟢 Confirm Order on WhatsApp
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border">
            <h2 className="text-3xl font-black mb-6">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p className="text-slate-500">
                No Products Added
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4 border-b"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-xl border bg-white p-2"
                      />

                      <div>
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-bold">
                      ₹
                      {Number(
                        item.price.replace("₹", "")
                      ) * item.quantity}
                    </p>
                  </div>
                ))}

                <div className="mt-8 bg-slate-100 rounded-2xl p-5">
                  <div className="flex justify-between mb-3">
                    <span>Total Items</span>

                    <span>
                      {cart.reduce(
                        (sum, item) =>
                          sum + item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-3xl font-black text-teal-700">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}