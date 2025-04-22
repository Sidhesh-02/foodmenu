"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  };

  const markPaid = async (id) => {
    await fetch("/api/admin/orders/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    fetchOrders();
  };

  const markServed = async (id) => {
    await fetch("/api/admin/orders/mark-served", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Incoming Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="p-4 border rounded-lg flex justify-between">
              <div>
                <p>
                  <strong>#{o.id}</strong> ({o.orderType})
                </p>
                <p>Total: ₹{o.totalPrice.toFixed(2)}</p>
                <p>
                  Payment:{" "}
                  <span
                    className={
                      o.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {o.paymentStatus}
                  </span>
                </p>
                <p>
                  Served:{" "}
                  {o.isHandled ? (
                    <span className="text-green-600">✅</span>
                  ) : (
                    <span className="text-red-600">❌</span>
                  )}
                </p>
              </div>

              <div className="space-x-2">
                {o.paymentStatus === "pending" && (
                  <button
                    onClick={() => markPaid(o.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Mark Paid
                  </button>
                )}
                {o.paymentStatus === "paid" && !o.isHandled && (
                  <button
                    onClick={() => markServed(o.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Mark Served
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
