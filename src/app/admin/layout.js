"use client";
import { useUser, RedirectToSignIn, SignOutButton } from "@clerk/nextjs";

export default function AdminLayout({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SignOutButton className="bg-black text-white cursor-pointer p-2 rounded-lg shadow"/>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        {children}
      </div>
    </div>
  );
}
