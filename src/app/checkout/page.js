"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [orderType, setOrderType] = useState("restaurant");
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [upiLink, setUpiLink] = useState("");
  const [orderId, setOrderId] = useState("");

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
      setLoading(false);
      alert("Error creating order");
      return;
    }

    const { orderId } = await res.json();
    setOrderId(orderId);

    const merchantUpi = process.env.NEXT_PUBLIC_UPI_MERCHANT_UPI;
    const merchantName = process.env.NEXT_PUBLIC_UPI_MERCHANT_NAME;

    const upiDeepLink = `upi://pay?pa=${encodeURIComponent(
      merchantUpi
    )}&pn=${encodeURIComponent(merchantName)}&tn=${encodeURIComponent(
      "Payment for Order " + orderId
    )}&am=${encodeURIComponent(totalAmount)}&cu=INR`;

    setUpiLink(upiDeepLink);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleCheckout}
        className="max-w-md w-full bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Order Type:</label>
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
            <label className="block font-semibold mb-1">Table Number:</label>
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
          <p className="text-lg">Total: ₹{totalAmount}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        {upiLink && (
          <div className="mt-6 p-4 bg-gray-50 border rounded text-center">
            <h2 className="text-lg font-semibold mb-2">
              Scan to Pay for Order #{orderId}
            </h2>
            <QRCodeCanvas value={upiLink} size={200} includeMargin={true} />
            <p className="mt-2 text-sm text-gray-600">
              Use any UPI app like Paytm, PhonePe, GPay etc.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
