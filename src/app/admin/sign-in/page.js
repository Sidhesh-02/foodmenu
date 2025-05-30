// src/app/sign-in/page.js
"use client";
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn path="/sign-in" routing="path" signUpUrl={null} />
    </div>
  );
}
