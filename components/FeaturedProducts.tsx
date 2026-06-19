"use client";

import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  return (
    <>
      <ProductCard limit={4} showFilters={false} />

      <div className="text-center mt-10">
        <a
          href="/products"
          className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-2xl font-bold transition"
        >
          View All Products →
        </a>
      </div>
    </>
  );
}
