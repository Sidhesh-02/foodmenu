// src/app/order-confirmed/page.js
"use client";
import { useEffect, useState } from "react";

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState(null);

  // In a real app, you might pass the order ID via query params or session.
  // For this example, we assume you have a way to retrieve the latest order.
  useEffect(() => {
    // Fetch order details from an API route; here we simulate it.
    async function fetchOrder() {
      const res = await fetch("/api/orders/latest"); // Create this endpoint as needed
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    }
    fetchOrder();
  }, []);

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Loading order...</div>;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
      <p className="mb-2">Order ID: {order.id}</p>
      <p className="mb-2">Total: ₹{order.totalPrice}</p>
      {order.orderType === "restaurant" && (
        <p className="mb-2">Table Number: {order.tableNumber}</p>
      )}
      {/* Display cart items or bill details as needed */}
      <div className="mt-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
        <pre>{JSON.stringify(order.items, null, 2)}</pre>
      </div>
    </div>
  );
}
