"use client";
import { useState, useEffect } from "react";

export default function ToppingsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [toppings, setToppings] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  useEffect(() => {
    if (selectedMenuItem) {
      fetch(`/api/admin/toppings?menuItemId=₹{selectedMenuItem}`)
        .then((res) => res.json())
        .then((data) => setToppings(data));
    }
  }, [selectedMenuItem]);

  const handleAddTopping = async () => {
    const res = await fetch("/api/admin/toppings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        menuItemId: selectedMenuItem,
      }),
    });

    if (res.ok) {
      setToppings([...toppings, { name, price }]);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Toppings</h2>
      
      <select
        value={selectedMenuItem}
        onChange={(e) => setSelectedMenuItem(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="">Select Menu Item</option>
        {menuItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {selectedMenuItem && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Topping Name"
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
            <button onClick={handleAddTopping} className="bg-black text-white p-2 rounded">
              Add
            </button>
          </div>

          <ul className="border p-4 rounded bg-gray-50">
            {toppings.map((topping, index) => (
              <li key={index} className="flex justify-between p-2 border-b">
                {topping.name} - ₹{topping.price}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
