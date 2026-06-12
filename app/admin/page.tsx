"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  image?: string;
  category?: string;
  description?: string;
};

type Order = {
  id: number;
  customer_name: string;
  mobile: string;
  address: string;
  products: string;
  total: string;
  status: string;
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState("");

  const [reviews, setReviews] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAdmin();
    fetchProducts();
    fetchReviews();
    fetchOrders();
  }, []);

  async function checkAdmin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/admin/login");
      return;
    }

    setIsLoggedIn(true);
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setProducts(data);
      setTotalProducts(data.length);
    }
  }

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setReviews(data);
    }
  }

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setOrders(data);
    }
  }

  async function updateProduct() {
    if (!editingId) return;

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

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        image: imageUrl,
        category,
        description,
        benefits: description,
      })
      .eq("id", editingId);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product Updated ✅");

    setEditingId(null);
    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setDescription("");
    setFile(null);

    fetchProducts();
  }

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

    fetchProducts();

    setName("");
    setPrice("");
    setImage("");
    setCategory("");
    setDescription("");
    setFile(null);
  }

  async function deleteProduct(id: number) {
    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) return;

    const { error, data } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select();

    console.log("DELETE RESULT:", data);
    console.log("DELETE ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Deleted Successfully");
    fetchProducts();
  }

  async function deleteReview(id: number) {
    const confirmDelete = confirm("Delete this review?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Review Deleted ✅");

    fetchReviews();
  }

  async function updateOrderStatus(id: number, status: string) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchOrders();
  }

  async function deleteOrder(id: number) {
    const confirmDelete = confirm("Delete this order?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("orders").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchOrders();
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      {" "}
      <h1 className="text-4xl font-black mb-8">Admin Panel </h1>
      <div className="bg-teal-700 text-white p-4 rounded-xl mb-4">
        Total Products: {totalProducts}
      </div>
      <div className="flex gap-3 mb-4">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/admin/login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <input
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-4 rounded-xl mb-6"
      />
      <div className="space-y-4 bg-white p-6 rounded-2xl shadow">
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
          placeholder="Image URL (optional)"
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
          placeholder="Description / Benefits"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-4 rounded-xl h-32"
        />

        {(image || file) && (
          <div className="mt-4">
            <img
              src={file ? URL.createObjectURL(file) : image}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl border"
            />
          </div>
        )}

        <button
          onClick={editingId ? updateProduct : addProduct}
          className="bg-teal-700 text-white px-8 py-4 rounded-xl font-bold"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>
      <div className="mt-10">
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-100 p-4 rounded-xl">
              <h3 className="font-bold">Pending</h3>
              <p className="text-2xl">
                {orders.filter((o) => o.status === "Pending").length}
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              <h3 className="font-bold">Confirmed</h3>
              <p className="text-2xl">
                {orders.filter((o) => o.status === "Confirmed").length}
              </p>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
              <h3 className="font-bold">Delivered</h3>
              <p className="text-2xl">
                {orders.filter((o) => o.status === "Delivered").length}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Orders ({orders.length})</h2>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border rounded-xl p-4">
                <h3 className="font-bold">{order.customer_name}</h3>

                <p>📞 {order.mobile}</p>

                <p>📍 {order.address}</p>

                <p>💰 ₹{order.total}</p>

                <div className="mt-3 space-y-2">
                  {(() => {
                    try {
                      const items = JSON.parse(order.products);

                      return items.map((item: any) => (
                        <div
                          key={item.id}
                          className="bg-slate-100 rounded-xl p-3"
                        >
                          <p className="font-semibold text-slate-800">
                            🛒 {item.name}
                          </p>

                          <p className="text-sm text-slate-600">
                            Qty: {item.quantity || 1}
                          </p>

                          <p className="text-sm font-bold text-green-600">
                            ₹ {item.price}
                          </p>
                        </div>
                      ));
                    } catch {
                      return (
                        <p className="text-sm text-slate-500">
                          {order.products}
                        </p>
                      );
                    }
                  })()}
                </div>

                <p className="mt-3">
                  Status:
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-white text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Confirmed"
                          ? "bg-green-600"
                          : "bg-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                  {order.status === "Pending" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "Confirmed")}
                      className="bg-green-600 text-white px-3 py-2 rounded"
                    >
                      Confirm
                    </button>
                  )}

                  {order.status === "Confirmed" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "Delivered")}
                      className="bg-blue-600 text-white px-3 py-2 rounded"
                    >
                      Delivered
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <span className="bg-green-100 text-green-700 px-3 py-2 rounded font-bold">
                      ✅ Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">All Products</h2>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex justify-between items-center border p-4 rounded-xl bg-white"
              >
                <div>
                  <h3 className="font-bold">{review.name}</h3>

                  <p className="text-sm text-slate-500">{review.review}</p>
                </div>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border p-4 rounded-xl bg-white"
              >
                <div>
                  <h3 className="font-bold">{product.name}</h3>

                  <p className="text-slate-500">₹{product.price}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(product.id);
                      setName(product.name);
                      setPrice(product.price);
                      setCategory(product.category || "");
                      setDescription(product.description || "");
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
