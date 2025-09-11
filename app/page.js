"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaLeaf, FaBoxOpen, FaQrcode, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  function handleCheckNow() {
    if (!session) {
      router.push("/login");
    } else {
      router.push("/importt");
    }
  }

  return (
    <div className="relative w-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
      <video
  src="/api/video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  webkit-playsinline="true"
  x-webkit-airplay="true"
  disablePictureInPicture
  className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
/>


        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4 text-white"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono drop-shadow-lg">
            Welcome to Ethicons
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl drop-shadow-lg text-gray-100">
            Blockchain-based traceability for Ayurvedic herbs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/lookup">
                <button className="flex items-center space-x-2 bg-lime-900 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition">
                  <FiSearch className="text-xl" />
                  <span>Track your Herb</span>
                </button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <button
                onClick={handleCheckNow}
                className="bg-gray-400 text-black dark:bg-gray-200 dark:text-black mt-2 px-5 py-2 rounded-full cursor-pointer font-medium hover:bg-gray-300 dark:hover:bg-gray-400"
              >
                Check Now!
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-100 dark:bg-gray-800 text-center px-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400">
          About Ethicons
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Ethicons is a blockchain-powered system for the traceability of
          Ayurvedic herbs. From collection to final packaging, every step is
          verified and securely stored on-chain, ensuring authenticity,
          transparency, and trust.
        </p>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-700 dark:text-green-400">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaLeaf size={40} />,
              title: "Herb Collection",
              desc: "Capture geo-tagged herb details directly from collectors.",
            },
            {
              icon: <FaBoxOpen size={40} />,
              title: "Batch Creation",
              desc: "Combine herbs into batches with full traceability.",
            },
            {
              icon: <FaQrcode size={40} />,
              title: "QR Integration",
              desc: "Generate unique QR codes for every herb & product.",
            },
            {
              icon: <FaShieldAlt size={40} />,
              title: "Blockchain Security",
              desc: "Immutable records stored on Ethereum for transparency.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 text-white p-6 rounded-xl shadow hover:scale-105 transition"
            >
              <div className="text-green-600 dark:text-green-400 mb-4 flex justify-center">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Video Section */}
{/* Video Section */}
{/* Video Section */}
<section className="py-1 mb-10 px-6 bg-white dark:bg-gray-900">
  <h2 className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-400">
    Glimpse of Testing
  </h2>
  <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
    <video
      src="/video1.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      className="w-full h-64 object-cover"
    />
  </div>
</section>




      {/* Workflow Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800   text-center px-6">
        <h2 className="text-3xl  font-bold mb-8  text-green-800 dark:text-green-300">
          How It Works
        </h2>
        <div className="flex flex-col text-white md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
          {["Collector", "Processor", "Packager", "Consumer"].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white dark:bg-gray-900  p-6 rounded-full shadow-md w-60 hover:scale-105 transition"
            >
              <span className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                {i + 1}
              </span>
              <p className="text-lg font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-white dark:bg-gray-900 text-center px-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-green-700 ">
          Start Your Journey
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-6">
          Trace your herbs today and experience the power of blockchain
          transparency.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/importt">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition">
              Add Your Herb
            </button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-black text-white py-6 text-center"
      >
        <p className="text-sm">© 2025 Ethicons. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
