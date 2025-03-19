"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the CartContext
const CartContext = createContext();

/**
 * Helper function to generate a key based on the toppings.
 * This sorts the topping ids and joins them into a string.
 * If no toppings, it returns an empty string.
 */
function getToppingsKey(toppings) {
  if (!toppings || toppings.length === 0) return "";
  return toppings
    .map((t) => t.id)
    .sort()
    .join("-");
}

export function CartProvider({ children }) {
  // Cart state: each item is an object that includes at least: 
  // id, name, price, quantity, and toppings (an array)
  const [cart, setCart] = useState([]);

  // Optionally persist the cart in localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * addToCart: Adds an item to the cart.
   * If the same product with an identical toppings combination exists, it updates the quantity.
   * Otherwise, it adds a new entry.
   *
   * @param {object} item - The product item (should have a unique id)
   * @param {Array} selectedToppings - An array of topping objects for the item.
   * @param {number} quantity - Number of items to add (default is 1).
   */
  const addToCart = (item, selectedToppings, quantity = 1) => {
    const newToppingsKey = getToppingsKey(selectedToppings);

    // Find an existing item with the same id and identical toppings
    const existingIndex = cart.findIndex((cartItem) => {
      return (
        cartItem.id === item.id &&
        getToppingsKey(cartItem.toppings) === newToppingsKey
      );
    });

    if (existingIndex >= 0) {
      // If found, update the quantity
      const newCart = [...cart];
      newCart[existingIndex] = {
        ...newCart[existingIndex],
        quantity: newCart[existingIndex].quantity + quantity,
      };
      setCart(newCart);
    } else {
      // Otherwise, add the new item with quantity and toppings
      const newItem = {
        ...item,
        quantity,
        toppings: selectedToppings || [],
      };
      setCart([...cart, newItem]);
    }
  };

  // Remove an item from the cart by its id and toppings combination if needed.
  // Here, for simplicity, we remove by id. If you need to remove a specific entry
  // based on toppings too, you might also pass the toppings key.
  const removeFromCart = (itemId, toppings = []) => {
    const targetKey = getToppingsKey(toppings);
    setCart(
      cart.filter(
        (item) => !(item.id === itemId && getToppingsKey(item.toppings) === targetKey)
      )
    );
  };

  // Calculate the total amount dynamically from the cart items.
  // For each item, multiply its price by its quantity.
  // If you want to add extra cost from toppings, include that as well.
  const totalAmount = cart.reduce((sum, item) => {
    const toppingsTotal = item.toppings.reduce((s, topping) => s + topping.price, 0);
    return sum + (item.price * item.quantity + toppingsTotal);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing the cart context
export function useCart() {
  return useContext(CartContext);
}
