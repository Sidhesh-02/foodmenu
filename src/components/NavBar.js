"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/menu">
            <span className="text-lg cursor-pointer">
              Menu
            </span>
          </Link>
          <Link href="/cart">
            <span className="text-lg text-gray-700 cursor-pointer">Cart</span>
          </Link>
          <Link href="/admin">
            <span className="text-lg text-gray-700 cursor-pointer">Admin</span>
          </Link>
          {/* Uncomment if you have a checkout route */}
          {/* <Link href="/checkout">
            <span className="text-lg text-gray-700 cursor-pointer">Checkout</span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
