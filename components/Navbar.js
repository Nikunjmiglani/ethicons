"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full mb-4 z-50 bg-black/40 backdrop-blur-md text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo */}
          <Link href="/">
            <span className="font-bold text-xl sm:text-2xl font-mono hover:scale-110 transition-transform duration-200 cursor-pointer">
              ETHICONS
            </span>
          </Link>

          {/* Center - Links (Desktop) */}
          <div className="hidden md:flex space-x-10 font-medium">
            <Link
              href="/about"
              className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            >
              About
            </Link>
            <Link
              href="/developers"
              className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            >
              Developers
            </Link>
            <Link
              href="/herbs"
              className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            >
              Herbs
            </Link>
            <Link
              href="/vision"
              className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            >
              Our Vision
            </Link>
          </div>

          {/* Right - Logos */}
          <div className="hidden sm:flex space-x-4 sm:space-x-6">
            <Image
              src="/srm.webp"
              alt="Logo 1"
              width={40}
              height={20}
              className="hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
            <Image
              src="/sih.webp"
              alt="Logo 2"
              width={40}
              height={20}
              className="hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md flex flex-col items-center space-y-6 py-6">
          <Link
            href="/about"
            className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/developers"
            className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Developers
          </Link>
          <Link
            href="/herbs"
            className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Herbs
          </Link>
          <Link
            href="/vision"
            className="hover:text-green-400 hover:scale-110 transition-transform duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Our Vision
          </Link>
        </div>
      )}
    </nav>
  );
}
