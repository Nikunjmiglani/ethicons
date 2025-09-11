"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaThermometerHalf, FaVideo, FaShieldAlt } from "react-icons/fa";

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center"
      >
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
          ✅ Herb Storage Verified
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          Your herb is securely stored under the best verified conditions.
        </p>

        {/* Features */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow"
          >
            <FaThermometerHalf className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">
              Maintained at <span className="font-bold">-20°C Room Temperature</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow"
          >
            <FaVideo className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">
              24x7 Surveillance & Monitoring
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow"
          >
            <FaShieldAlt className="text-green-600 dark:text-green-400 text-3xl" />
            <p className="text-gray-700 dark:text-gray-200 text-lg font-medium">
              Verified & Authenticated for Safety
            </p>
          </motion.div>
        </div>

        {/* Final Check */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          className="mt-10 flex flex-col items-center"
        >
          <FaCheckCircle className="text-green-600 dark:text-green-400 text-6xl mb-4" />
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Storage Verified & Secure
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
