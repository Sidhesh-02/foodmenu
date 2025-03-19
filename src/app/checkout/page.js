// src/app/checkout/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [orderType, setOrderType] = useState("restaurant"); // "restaurant" or "parcel"
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total (example calculation; adjust as needed)
  const totalAmount = cart.reduce(
    (sum, item) =>
      sum +
      item.price * (item.quantity || 1) +
      item.toppings.reduce((tSum, topping) => tSum + topping.price, 0),
    0
  ).toFixed(2);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create the order on the backend, including order type and table number (if applicable)
    const orderData = {
      cart,
      orderType,
      tableNumber: orderType === "restaurant" ? tableNumber : null,
      totalAmount,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      // Handle error
      setLoading(false);
      alert("Error creating order");
      return;
    }
    const { orderId } = await res.json();

    // Generate UPI deep link using merchant info from env variables and order details.
    // The UPI link format:
    // upi://pay?pa={merchant_upi}&pn={merchant_name}&tn=Payment+for+Order+{orderId}&am={totalAmount}&cu=INR&url={return_url}
    const merchantUpi = process.env.NEXT_PUBLIC_UPI_MERCHANT_UPI; // e.g., "merchant@okaxis"
    const merchantName = process.env.NEXT_PUBLIC_UPI_MERCHANT_NAME; // e.g., "My Restaurant"
    const returnUrl = process.env.NEXT_PUBLIC_RETURN_URL || "http://localhost:3000/order-confirmed";
    const upiLink = `upi://pay?pa=₹{encodeURIComponent(
      merchantUpi
    )}&pn=₹{encodeURIComponent(merchantName)}&tn=₹{encodeURIComponent(
      "Payment for Order " + orderId
    )}&am=₹{encodeURIComponent(totalAmount)}&cu=INR&url=₹{encodeURIComponent(
      returnUrl
    )}`;

    // Redirect to the UPI deep link.
    // On mobile, this should prompt a UPI app selection.
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleCheckout}
        className="max-w-md w-full bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Order Type:
          </label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="restaurant">Eat at Restaurant</option>
            <option value="parcel">Parcel</option>
          </select>
        </div>
        {orderType === "restaurant" && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Table Number:
            </label>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <p className="text-lg">
            Total: ₹{totalAmount}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}
