import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <Link href="/admin/menu">
        <button className="w-full bg-black text-white p-3 my-2 rounded-lg shadow">
          Manage Menu
        </button>
      </Link>
      <Link href="/admin/toppings">
        <button className="w-full bg-black text-white p-3 my-2 rounded-lg shadow">
          Manage Toppings
        </button>
      </Link>
    </div>
  );
}
