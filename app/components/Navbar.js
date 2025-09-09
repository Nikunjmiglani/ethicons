import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 h-16 border-b border-gray-300 font-sans">
      {/* Left Section */}
      <div className="flex-1  hover:scale-110 transition-transform duration-200">
        <span className="font-bold text-2xl font-mono cursor-pointer">ETHICONS</span>
      </div>

      {/* Center Section - Nav Links */}
      <div className="flex-2 max-w-xl flex justify-center space-x-20 text-purple-800 font-semibold">
        <a href="#about" className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          About
        </a>
        <a href="#developers" className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          Developers
        </a>
        <a href="#contact" className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          Contact Us
        </a>
        <a href="#herbs" className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          Herbs
        </a>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-end space-x-6">
        <Image
          src="/srm.webp"
          alt="Logo 1"
          width={50}
          height={20}
          className="cursor-pointer"
        />
        <Image
          src="/sih.webp"
          alt="Logo 2"
          width={50}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
}
