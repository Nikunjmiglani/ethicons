"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🚫 Disable right click everywhere
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-900">
      {/* Background Video */}
      <video
        src="/videobg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full text-white dark:text-gray-100">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-4 sm:px-6 h-16 dark:border-gray-700 font-sans bg-black/30 backdrop-blur-xs relative">
          {/* Left - Logo */}
          <div className="flex-1">
            <span className="font-bold text-xl sm:text-2xl font-mono hover:scale-110 transition-transform duration-200 cursor-pointer">
              ETHICONS
            </span>
          </div>

          {/* Center - Nav Links (Desktop) */}
          <div className="hidden md:flex flex-2 max-w-xl justify-center space-x-10 font-medium">
            <Link href="/about" className="hover:scale-110 transition-transform">
              About
            </Link>
            <Link
              href="/developers"
              className="hover:scale-110 transition-transform"
            >
              Developers
            </Link>
            <Link href="/herbs" className="hover:scale-110 transition-transform">
              Herbs
            </Link>
          </div>

          {/* Mobile Menu (More ▼) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-1 text-sm sm:text-base font-medium focus:outline-none"
            >
              <span>More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Right - Logos */}
          <div className="flex-1 flex justify-end space-x-4 sm:space-x-8">
            <Image src="/srm.webp" alt="Logo 1" width={40} height={20} />
            <Image src="/sih.webp" alt="Logo 2" width={40} height={20} />
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-16 left-0 w-full bg-black/80 backdrop-blur-md flex flex-col items-center space-y-6 py-6 md:hidden z-50">
              <Link
                href="/about"
                className="text-lg font-medium hover:scale-110 transition-transform"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/developers"
                className="text-lg font-medium hover:scale-110 transition-transform"
                onClick={() => setMenuOpen(false)}
              >
                Developers
              </Link>
              <Link
                href="/herbs"
                className="text-lg font-medium hover:scale-110 transition-transform"
                onClick={() => setMenuOpen(false)}
              >
                Herbs
              </Link>
            </div>
          )}
        </nav>

        {/* Main Hero Text */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Ethicons
          </h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl drop-shadow-lg text-gray-100">
            Blockchain-based traceability for Ayurvedic herbs.
          </p>

          <Link href="/importt">
            <button className="bg-white text-black dark:bg-gray-200 dark:text-black px-5 mt-6 py-2 rounded-full cursor-pointer font-medium hover:bg-gray-300 dark:hover:bg-gray-400 hover:scale-110 transition-transform duration-200 animate-pulse text-sm sm:text-base">
              Check Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
