"use client";

import { motion } from "framer-motion";

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mt-15">
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
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌍 Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to create a world where every Ayurvedic herb is
            authentic, traceable, and sustainably sourced. We believe in a
            future where ancient wisdom of Ayurveda is seamlessly blended with
            modern technologies such as blockchain, IoT, and AI to deliver
            health solutions that are transparent, reliable, and accessible to
            all.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            We envision empowering farmers with fair opportunities, supporting
            researchers with reliable data, and offering consumers a guarantee
            of purity and authenticity. Our long-term dream is to see Ayurveda
            recognized globally as a trusted, science-backed system of wellness,
            with India leading the way in sustainable herbal innovation.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚀 Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to build a transparent ecosystem where every herb is
            tracked from its origin to the consumer. Through geo-tagging,
            blockchain-based digital IDs, and decentralized records, we aim to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
            <li>Ensure authenticity and purity of Ayurvedic herbs.</li>
            <li>Support sustainable and ethical sourcing practices.</li>
            <li>
              Provide consumers with verifiable and accessible information about
              their wellness products.
            </li>
            <li>
              Strengthen India’s Ayurvedic heritage with cutting-edge
              technology and global collaborations.
            </li>
            <li>
              Reduce exploitation of farmers by creating direct farmer-to-market
              supply chains.
            </li>
            <li>
              Encourage research and innovation in Ayurveda by providing trusted
              and digitized herbal data.
            </li>
          </ul>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-md rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            💡 Our Core Values
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm md:text-base">
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              🌱 <span className="font-semibold">Sustainability:</span> Every
              herb cultivated with care for the environment and future
              generations.
            </li>
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              🤝 <span className="font-semibold">Fairness:</span> Providing fair
              wages and opportunities to farmers and rural communities.
            </li>
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              🔒 <span className="font-semibold">Transparency:</span> Ensuring
              every step of the supply chain is traceable and verifiable.
            </li>
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              🌍 <span className="font-semibold">Global Reach:</span> Bringing
              Ayurveda to the world with credibility and trust.
            </li>
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              🧪 <span className="font-semibold">Innovation:</span> Combining
              traditional knowledge with modern science and technology.
            </li>
            <li className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
              ❤️ <span className="font-semibold">Wellness First:</span> Keeping
              consumer health, safety, and wellness at the heart of everything.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
