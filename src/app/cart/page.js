// src/app/cart/page.js
"use client";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, totalAmount, removeFromCart } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="p-4 border rounded-lg">
                <h2 className="font-semibold">{item.name}</h2>
                <p>
                  Price: ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
                {item.toppings.length > 0 && (
                  <div>
                    <p>Toppings:</p>
                    <ul>
                      {item.toppings.map((topping, idx) => (
                        <li key={idx}>
                          {topping.name} (+₹{topping.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={() => removeFromCart(item.id, item.toppings)}
                  className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-xl font-bold">
            Total: ₹{totalAmount.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
