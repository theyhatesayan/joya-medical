"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data } = await supabase.from("orders").select("*");

    if (!data) return;

    setTotalOrders(data.length);

    setPendingOrders(data.filter((item) => item.status === "Pending").length);

    setDeliveredOrders(
      data.filter((item) => item.status === "Delivered").length,
    );

    const revenue = data
      .filter((item) => item.status === "Delivered")
      .reduce((sum, item) => sum + Number(item.total), 0);

    setTotalRevenue(revenue);

    const { data: recent } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);

    setRecentOrders(recent || []);
  }

return (
  <div>
    <h1 className="text-4xl font-black mb-8">Dashboard</h1>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <p className="text-slate-500">Total Orders</p>
        <h2 className="text-4xl font-black mt-3">{totalOrders}</h2>
      </div>

      <div className="bg-yellow-50 rounded-3xl shadow-lg p-6">
        <p className="text-yellow-700">Pending Orders</p>
        <h2 className="text-4xl font-black mt-3">{pendingOrders}</h2>
      </div>

      <div className="bg-green-50 rounded-3xl shadow-lg p-6">
        <p className="text-green-700">Delivered Orders</p>
        <h2 className="text-4xl font-black mt-3">{deliveredOrders}</h2>
      </div>

      <div className="bg-blue-50 rounded-3xl shadow-lg p-6">
        <p className="text-blue-700">Total Revenue</p>
        <h2 className="text-4xl font-black mt-3">₹{totalRevenue}</h2>
      </div>

    </div>

    {/* Recent Orders */}
    <div className="mt-10 bg-white rounded-3xl shadow-lg p-8 w-full">
      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      {recentOrders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold">
                  {order.customer_name}
                </h3>

                <p className="text-sm text-slate-500">
                  {order.mobile}
                </p>
              </div>

              <div className="font-bold text-teal-700">
                ₹{order.total}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}