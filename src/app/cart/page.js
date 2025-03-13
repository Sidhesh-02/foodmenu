"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      item.price +
      item.toppings.reduce((toppingSum, topping) => toppingSum + topping.price, 0),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="p-4 border rounded-lg shadow-md">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p>Base Price: ${item.price.toFixed(2)}</p>
                {item.toppings.length > 0 && (
                  <ul className="text-gray-600">
                    {item.toppings.map((topping) => (
                      <li key={topping.id}>+ {topping.name} (${topping.price.toFixed(2)})</li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => removeFromCart(index)}
                  className="mt-2 bg-black text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-6">Total: ${totalPrice.toFixed(2)}</h2>
          <Link href="/checkout">
            <button className="mt-4 bg-black text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
