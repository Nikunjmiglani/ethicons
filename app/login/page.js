"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Welcome 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue using Ethicons.
        </p>

        

        

        {/* Google Sign-In */}
        <button
          onClick={() => signIn("google")}
          className="w-full bg-red-500 text-white py-2 rounded-full font-medium hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
