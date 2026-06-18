"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "🏠",
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: "📦",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: "🛒",
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: "⭐",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: "📂",
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-white p-4 lg:min-h-screen">
      <h1 className="text-3xl font-black mb-10">
        JOYA Admin
      </h1>

      <div className="space-y-2">
        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              pathname === item.href
                ? "bg-teal-600"
                : "hover:bg-slate-800"
            }`}
          >
            <span>{item.icon}</span>

            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
