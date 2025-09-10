"use client";

import { motion } from "framer-motion";

export default function VisionPage() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br  from-green-50 to-green-100 text-gray-800 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800">
            🌿 Our Vision & Mission
          </h1>
          <p className="text-lg text-gray-600">
            Empowering Ayurveda with trust, transparency, and technology.
          </p>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            🌍 Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to create a world where every Ayurvedic herb is
            authentic, traceable, and sustainably sourced. By integrating
            blockchain technology into the traditional Ayurvedic supply chain,
            we aim to build trust for farmers, manufacturers, and consumers
            alike. We believe that the future of wellness lies in combining
            ancient knowledge with modern innovation.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            🚀 Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower smallholder farmers and Ayurvedic
            practitioners by providing a transparent ecosystem where every herb
            is tracked from its origin to the final formulation. Through
            geo-tagging, digital IDs, and decentralized records, we aim to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Ensure authenticity and purity of Ayurvedic herbs.</li>
            <li>Support sustainable and ethical sourcing practices.</li>
            <li>
              Provide consumers with verifiable information about their wellness
              products.
            </li>
            <li>
              Strengthen India’s Ayurvedic heritage with cutting-edge
              technology.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
