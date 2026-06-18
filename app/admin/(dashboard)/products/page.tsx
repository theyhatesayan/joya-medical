"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    const { data, error } = await supabase.from("categories").select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (data) {
      setCategories(data);
    }
  }

  async function addProduct() {
    if (!name || !price || !category) {
      alert("Please fill all required fields");
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const fileName = Date.now() + "-" + imageFile.name;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Image Upload Failed");
        return;
      }

      const { data } = supabase.storage.from("products").getPublicUrl(fileName);

      imageUrl = data.publicUrl;

      console.log("IMAGE URL:", imageUrl);
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        price,
        category,
        description,
        benefits,
        image: imageUrl,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Failed to add product");
      return;
    }

    alert("Product Added Successfully");

    fetchProducts();

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setBenefits("");
    setImageFile(null);
  }

  async function updateProduct() {
    if (!editingId) return;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        category,
        description,
        benefits,
      })
      .eq("id", editingId);

    if (error) {
      alert("Update Failed");
      return;
    }

    alert("Product Updated");

    setEditingId(null);

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setBenefits("");

    fetchProducts();
  }

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    console.log("PRODUCTS:", data);
    console.log("PRODUCT ERROR:", error);

    if (data) {
      setProducts(data);
    }
  }

  async function deleteProduct(id: number) {
    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert("Delete Failed");
      return;
    }

    fetchProducts();
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Products</h1>

          <p className="text-slate-500 mt-2">Manage all products from here.</p>
        </div>

        <Link
          href="/admin/categories"
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          + Manage Categories
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">Total Products</p>

          <h2 className="text-3xl font-bold mt-2">{products.length}</h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">Categories</p>

          <h2 className="text-3xl font-bold mt-2">{categories.length}</h2>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <p className="text-slate-500 text-sm">Last Added</p>

          <h2 className="text-lg font-semibold mt-2">
            {products[0]?.name || "--"}
          </h2>
        </div>
      </div>

      {/* Add Product */}
      <div className="bg-white border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>

          <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-semibold">
            {filteredProducts.length} Products
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl p-3"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl p-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }
            }}
            className="border rounded-xl p-3"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-xl border"
            />
          )}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-xl p-3 min-h-[120px]"
          />

          <textarea
            placeholder="Benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            className="border rounded-xl p-3 min-h-[120px]"
          />

          <button
            onClick={editingId ? updateProduct : addProduct}
            className="mt-5 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setName("");
                setPrice("");
                setCategory("");
                setDescription("");
                setBenefits("");
                setImageFile(null);
              }}
              className="ml-3 bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-slate-300 rounded-2xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Image</th>
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">Category</th>
                <th className="text-left py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="py-4">
                    {product.image &&
                    typeof product.image === "string" &&
                    product.image.startsWith("http") &&
                    !product.image.includes('"}') ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-16 h-16 border rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="py-4">{product.name}</td>

                  <td className="py-4">₹{product.price}</td>

                  <td className="py-4">{product.category}</td>

                  <td className="py-4">
                    <button
                      onClick={() => {
                        setEditingId(product.id);

                        setName(product.name);
                        setPrice(product.price);
                        setCategory(product.category);
                        setDescription(product.description || "");
                        setBenefits(product.benefits || "");
                        setImageFile(null);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
