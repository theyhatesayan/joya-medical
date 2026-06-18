"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

type Category = {
  id: number;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (data) setCategories(data);
  }

  async function addCategory() {
    if (!newCategory.trim()) return;

    const { error } = await supabase
      .from("categories")
      .insert({
        name: newCategory,
      });

    if (error) {
      toast.error("Failed");
      return;
    }

    toast.success("Category Added");
    setNewCategory("");
    fetchCategories();
  }

  async function deleteCategory(id: number) {
    const confirmDelete = confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    toast.success("Deleted");
    fetchCategories();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">
          Categories
        </h1>

        <p className="text-slate-500 mt-2">
          Manage product categories.
        </p>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-4">
          Add New Category
        </h2>

        <div className="flex gap-3">
          <input
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value)
            }
            placeholder="Category Name"
            className="flex-1 border rounded-xl px-4 py-3"
          />

          <button
            onClick={addCategory}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-xl font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-xl font-bold mb-5">
          All Categories
        </h2>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between border rounded-xl px-4 py-3"
            >
              <span className="font-medium">
                {category.name}
              </span>

              <button
                onClick={() =>
                  deleteCategory(category.id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}