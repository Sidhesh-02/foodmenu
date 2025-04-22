export default function OrderConfirmedPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Thank you! 🎉</h1>
      <p>Your order has been placed successfully. Please wait while we prepare it.</p>
      <p className="mt-2 text-sm text-gray-600">
        Once you receive your bill, the restaurant staff will mark your order as paid and served.
      </p>
      <button onClick={() => window.location.href = "/"} className="mt-4 underline">
        Back to Home
      </button>
    </div>
  );
}
