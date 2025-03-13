"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link key={item.id} href={`/menu/${item.id}`}>
            <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
          </Link>
    ))}
      </div>
    </div>
  );
}
