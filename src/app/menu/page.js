"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Image from "next/image";


export function MenuItemCard({ menuItem }) {
  const { addToCart } = useCart();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    addToCart(menuItem, selectedToppings, quantity);
    toast.success("Added to Cart! 🛒", { position: "top-right", autoClose: 2000 });
    setSelectedToppings([]);
    setQuantity(1);
  };

  if (!menuItem) {
    return <p>No Item Available</p>;
  }

  return (
    <div className="flex items-center justify-center p-2 border rounded-lg shadow-md hover:shadow-lg transition">
      <div className="pr-5">
        {menuItem.menuImage && (
          <Image src={menuItem.menuImage} alt={menuItem.name} width={200} height={300}/>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{menuItem.name}</h2>
        <p className="text-gray-600">₹{menuItem.price.toFixed(2)}</p>
        {menuItem.description && (
          <p className="text-gray-500">{menuItem.description}</p>
        )}

        <div className="mt-2">
          <h3 className="font-semibold">Toppings:</h3>
          {menuItem.toppings && menuItem.toppings.length > 0 ? (
            <div className="space-y-1">
              {menuItem.toppings.map((topping) => (
                <label key={topping.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleTopping(topping)}
                    checked={selectedToppings.some((t) => t.id === topping.id)}
                  />
                  <span>
                    {topping.name} (+₹{topping.price})
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No toppings available.</p>
          )}
        </div>

        <div className="mt-2 flex items-center space-x-2">
          <label className="font-semibold">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const parsed = parseInt(e.target.value);
              setQuantity(isNaN(parsed) ? 1 : parsed);
            }}
            className="w-16 border p-1 rounded"
          />
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-black text-white py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuItems(data);
        } else {
          setMenuItems([]); // Ensuring menuItems is always an array
        }
      })
      .catch(() => setMenuItems([]));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.length > 0 ? (
        menuItems.map((menuItem) => <MenuItemCard key={menuItem.id} menuItem={menuItem} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">No menu items available.</p>
      )}
    </div>
  );
}
