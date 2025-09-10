"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center border border-green-200"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold font-mono text-green-800 mb-3">
          Welcome to Ethicons 🌿
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to explore blockchain-based Ayurvedic traceability.
        </p>

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center space-x-3 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition transform hover:scale-105 duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            className="w-5 h-5"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248.7 504 111.3 504 0 392.7 0 255.3 0 117.9 111.3 6.7 248.7 6.7c66.8 0 122.4 24.5 164.1 64.7l-66.6 63.8c-18-17.2-50.5-37.3-97.5-37.3-83.7 0-151.7 70.3-151.7 156.5 0 86.2 68 156.5 151.7 156.5 96.7 0 132.9-69.4 138.5-105.3H248.7v-84.6H488z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </motion.div>
    </div>
  );
}
