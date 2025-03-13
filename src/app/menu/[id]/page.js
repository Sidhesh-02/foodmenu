"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function MenuItemPage() {
  // Use useParams() to extract dynamic route parameters
  const { id } = useParams();
  const { addToCart } = useCart();
  const [menuItem, setMenuItem] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch a single menu item by its id
      const menuRes = await fetch(`/api/menu/${id}`);
      const menuData = await menuRes.json();
      setMenuItem(menuData); // Corrected from setMenuItem(menuItem) to menuData

      // Fetch toppings for this menu item
      const toppingRes = await fetch(`/api/admin/toppings?menuItemId=${id}`);
      const toppingsData = await toppingRes.json();
      setToppings(toppingsData);
    }

    if (id) fetchData();
  }, [id]);

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  if (!menuItem) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold">{menuItem.name}</h1>
      <p className="text-gray-600">{menuItem.description}</p>
      <h3 className="text-xl font-bold mt-4">Price: ${menuItem.price}</h3>
      <h4 className="mt-4 font-bold">Choose Toppings:</h4>
      <div className="space-y-2">
        {toppings.map((topping) => (
          <label key={topping.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={() => toggleTopping(topping)}
              checked={selectedToppings.some((t) => t.id === topping.id)}
            />
            <span>
              {topping.name} (+${topping.price})
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={() => addToCart(menuItem, selectedToppings)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
