"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to continue using Ethicons.
        </p>

        {/* Username/Password form (already exists in your code) */}
        <form
          action="/api/auth/callback/credentials"
          method="post"
          className="space-y-4"
        >
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

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
