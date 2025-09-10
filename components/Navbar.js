"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
        relative w-full z-50
        bg-black/80 backdrop-blur-sm
        text-white
        flex items-center justify-between
        px-6 h-16
      "
    >
      {/* Logo */}
      <Link href="/" className="flex-1">
        <span className="font-bold text-xl sm:text-2xl font-mono hover:scale-110 transition-transform duration-200 cursor-pointer">
          ETHICONS
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex flex-2 justify-center space-x-10 font-medium">
        <Link href="/about" className="hover:scale-110 transition-transform">
          About
        </Link>
        <Link href="/developers" className="hover:scale-110 transition-transform">
          Developers
        </Link>
        <Link href="/herbs" className="hover:scale-110 transition-transform">
          Herbs
        </Link>
        <Link href="/vision" className="hover:scale-110 transition-transform">
          Our Vision
        </Link>
      </div>

      {/* Logos (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-end space-x-4 sm:space-x-6">
        <Image src="/srm.webp" alt="Logo 1" width={40} height={40} className="rounded-full" />
        <Image src="/sih.webp" alt="Logo 2" width={40} height={40} className="rounded-full" />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-1 text-sm font-medium focus:outline-none"
        >
          <span>Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-300 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-sm flex flex-col items-center space-y-6 py-6 md:hidden z-40">
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
          <Link
            href="/vision"
            className="text-lg font-medium hover:scale-110 transition-transform"
            onClick={() => setMenuOpen(false)}
          >
            Our Vision
          </Link>
        </div>
      )}
    </nav>
  );
}
