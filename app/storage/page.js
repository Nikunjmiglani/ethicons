"use client";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaThermometerHalf,
  FaVideo,
  FaShieldAlt,
  FaBoxOpen,
  FaLeaf,
} from "react-icons/fa";
import Link from "next/link";

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br  from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 mt-15 rounded-3xl shadow-2xl p-8 md:p-10 max-w-3xl w-full"
      >
        {/* Header */}
        <div className="flex flex-col  items-center text-center mb-8">
          <FaLeaf className="text-green-600 dark:text-green-400 text-6xl mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400">
            ✅ Herb Storage Verified
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg max-w-xl">
            Your herbal batch has been securely stored under certified conditions,
            ensuring safety, potency, and authenticity.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-green-50 dark:bg-gray-700 p-5 rounded-2xl shadow"
          >
            <FaThermometerHalf className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Maintained at{" "}
              <span className="font-bold">-20°C Controlled Temperature</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-green-50 dark:bg-gray-700 p-5 rounded-2xl shadow"
          >
            <FaVideo className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              24×7 Surveillance & Monitoring
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-green-50 dark:bg-gray-700 p-5 rounded-2xl shadow"
          >
            <FaShieldAlt className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Verified & Authenticated for Safety
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-green-50 dark:bg-gray-700 p-5 rounded-2xl shadow"
          >
            <FaBoxOpen className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Ready for Secure Distribution
            </p>
          </motion.div>
        </div>

        {/* Certificate Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="bg-white dark:bg-gray-900 border border-green-300 dark:border-green-600 rounded-2xl p-6 shadow-md text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
            📜 Storage Certificate
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
            This batch has been successfully verified and stored.
          </p>
          <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            
            <p>
              <span className="font-semibold">Verified On:</span>{" "}
              {new Date().toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Final Check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center"
        >
          <FaCheckCircle className="text-green-600 dark:text-green-400 text-6xl mb-4" />
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Storage Verified & Secure
          </p>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/lookup"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
          >
            🔍 Lookup Another Batch
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold shadow"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
