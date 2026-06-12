"use client";

import Image from "next/image";

export default function ProductModal({
  product,
  onClose,
  addToCart,
}: any) {
  if (!product) return null;

  const benefits =
    Array.isArray(product.benefits)
      ? product.benefits
      : typeof product.benefits === "string"
      ? product.benefits
          .split("\n")
          .filter((item: string) => item.trim() !== "")
      : [];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-[180px] sm:h-[220px] md:h-[500px] bg-slate-50">
            <Image
              src={product.image || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain p-6 md:p-8"
            />
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col justify-center">
            <button
              onClick={onClose}
              className="self-end text-2xl font-bold text-slate-600 hover:text-red-500 transition"
            >
              ✕
            </button>

            <span className="inline-block w-fit bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-semibold">
              Premium Veterinary Product
            </span>

            <h2 className="text-4xl font-black mt-4 text-slate-900">
              {product.name}
            </h2>

            <p className="text-3xl text-teal-700 font-bold mt-3">
              ₹{product.price}
            </p>

            {benefits.length > 0 && (
              <ul className="mt-8 space-y-3 text-slate-700">
                {benefits.map((item: string, index: number) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            )}

            {product.description && (
              <p className="mt-6 text-slate-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full mt-8 bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-2xl font-bold transition"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}