"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      name: "Orders",
      href: "/admin/orders",
    },
    {
      name: "Products",
      href: "/admin/products",
    },
    {
      name: "Categories",
      href: "/admin/categories",
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
    },
    {
      name: "Settings",
      href: "/admin/settings",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-black text-teal-700">
          JOYA ADMIN
        </h2>
      </div>

      <div className="p-4 space-y-2">
        {menus.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-xl font-medium transition ${
              pathname === item.href
                ? "bg-teal-700 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}