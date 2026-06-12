"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";
import ProductModal from "./ProductModal";
import FadeUp from "./FadeUp";
import { supabase } from "../lib/supabase";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  benefits: string;
};

export default function ProductCard() {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || product.category === category),
  );

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Our Products</h2>

        <p className="text-slate-500 mt-2">
          {filteredProducts.length} Products Available
        </p>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {["All", ...new Set(products.map((p) => p.category))].map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              category === item
                ? "bg-teal-700 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-10">
            <h3 className="text-2xl font-bold text-slate-600">
              No Products Found 😔
            </h3>
          </div>
        )}
        {filteredProducts.map((product) => (
          <FadeUp key={product.id}>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-teal-600 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-96 bg-white border-b p-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition duration-300"
                  />
                ) : null}
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-bold text-slate-800">
                  {product.name}
                </h3>

                <p className="text-emerald-600 font-extrabold text-3xl mt-3">
                  ₹ {product.price}
                </p>

                <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full w-fit">
                  {product.category}
                </span>

                <div className="mt-3">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    ✓ In Stock
                  </span>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-slate-700 grow">
                  <li>✓ {product.benefits}</li>
                </ul>

                <button
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to cart`);
                  }}
                  className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-3 border border-teal-700 text-teal-700 py-3 rounded-xl font-semibold hover:bg-teal-700 hover:text-white transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    </section>
  );
}
