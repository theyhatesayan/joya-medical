"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  mobile: string;
  address: string;
  products: string;
  total: string;
  status: string;
  created_at: string;
};

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data || []);
  }

  async function updateStatus(id: number, newStatus: string) {
    const currentOrder = orders.find((order) => order.id === id);

    if (!currentOrder) return;

    if (
      currentOrder.status === "Delivered" ||
      currentOrder.status === "Cancelled"
    ) {
      alert("Final Status Change Nahi Kar Sakte");
      return;
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    fetchOrders();
  }

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-black mb-8">Orders </h1>
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4">{order.customer_name}</td>

                <td className="p-4">{order.mobile}</td>

                <td className="p-4 max-w-xs">{order.address}</td>

                <td className="p-4 max-w-sm">
                  <div className="text-sm">
                    {(() => {
                      try {
                        const products = JSON.parse(order.products);

                        return products.map((item: any) => (
                          <div key={item.id} className="mb-2">
                            <p className="font-semibold">{item.name}</p>

                            <p className="text-slate-500 text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        ));
                      } catch {
                        return order.products;
                      }
                    })()}
                  </div>
                </td>

                <td className="p-4 font-bold">₹{order.total}</td>

                <td className="p-4">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      statusColor[order.status as keyof typeof statusColor]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border border-slate-300 px-4 py-2 rounded-xl bg-white font-medium"
                  >
                    {order.status === "Pending" && (
                      <>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                      </>
                    )}

                    {order.status === "Confirmed" && (
                      <>
                        <option>Confirmed</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </>
                    )}

                    {order.status === "Delivered" && <option>Delivered</option>}

                    {order.status === "Cancelled" && <option>Cancelled</option>}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-10 text-center">No Orders Found</div>
        )}
      </div>
    </div>
  );
}
