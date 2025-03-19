// src/components/NavBar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  // If the pathname starts with "/admin", don't render the navbar
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/menu">
            <span className="text-lg cursor-pointer px-2">
              Menu
            </span>
          </Link>
          <Link href="/cart">
            <span className="text-lg cursor-pointer px-2">
              Cart
            </span>
          </Link>
      </div>
    </nav>
  );
}
