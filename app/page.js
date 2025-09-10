"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaLeaf, FaBoxOpen, FaQrcode, FaShieldAlt } from "react-icons/fa";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
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
          src="/videobg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-4 text-white">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
            Welcome to Ethicons
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl drop-shadow-lg text-gray-100">
            Blockchain-based traceability for Ayurvedic herbs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Link href="/lookup">
              <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition hover:scale-105">
                <FiSearch className="text-xl" />
                <span>Track your Herb</span>
              </button>
            </Link>
            <button
              onClick={handleCheckNow}
              className="bg-white text-black dark:bg-gray-200 dark:text-black px-5 py-2 rounded-full cursor-pointer font-medium hover:bg-gray-300 dark:hover:bg-gray-400 hover:scale-110 transition-transform duration-200 animate-pulse text-sm sm:text-base"
            >
              Check Now!
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400">
          About Ethicons
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Ethicons is a blockchain-powered system for the traceability of
          Ayurvedic herbs. From collection to final packaging, every step is
          verified and securely stored on-chain, ensuring authenticity,
          transparency, and trust.
        </p>
      </section>

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
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition"
            >
              <div className="text-green-600 dark:text-green-400 mb-4 flex justify-center">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-green-50 dark:bg-green-900 text-center px-6">
        <h2 className="text-3xl font-bold mb-8 text-green-800 dark:text-green-300">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
          {["Collector", "Processor", "Packager", "Consumer"].map(
            (step, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-60 hover:scale-105 transition"
              >
                <span className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                  {i + 1}
                </span>
                <p className="text-lg font-medium">{step}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-400">
          Start Your Journey
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-6">
          Trace your herbs today and experience the power of blockchain
          transparency.
        </p>
        <Link href="/lookup">
          <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition hover:scale-105">
            Try Herb Lookup
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 text-center">
        <p className="text-sm">© 2025 Ethicons. All rights reserved.</p>
      </footer>
    </div>
  );
}
