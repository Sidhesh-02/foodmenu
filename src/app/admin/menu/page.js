"use client";
import { useState, useEffect } from "react";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  const handleAddMenuItem = async () => {
    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });

    if (res.ok) {
      setMenuItems([...menuItems, { name, price }]);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Menu</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAddMenuItem} className="bg-black text-white p-2 rounded">
          Add
        </button>
      </div>
      <ul className="border p-4 rounded bg-gray-50">
        {menuItems.map((item, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
