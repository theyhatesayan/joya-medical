"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function addProduct() {
    let imageUrl = image;

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("products").getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        price,
        image: imageUrl,
        category,
        description,
        benefits: description,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product Added Successfully ✅");

    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setDescription("");
    setFile(null);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-black mb-8">Add Product</h1>

      <div className="space-y-4">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="w-full border p-4 rounded-xl"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-4 rounded-xl h-32"
        />

        <button
          onClick={addProduct}
          className="bg-teal-700 text-white px-8 py-4 rounded-xl font-bold"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
