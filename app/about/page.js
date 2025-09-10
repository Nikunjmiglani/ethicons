"use client";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-green-950 to-green-800 text-white font-sans">
      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center drop-shadow-md">
          About Ethicons
        </h1>

        {/* Problem Statement */}
        <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-200 text-justify">
          Ethicons is a blockchain-based system designed to ensure{" "}
          <span className="font-semibold text-green-300">
            botanical traceability of Ayurvedic herbs
          </span>
          . Our platform addresses the growing need for authenticity,
          transparency, and safety in herbal medicines by tracking every step
          from the source of collection to the final Ayurvedic formulation.
        </p>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              🌿 Traceability
            </h2>
            <p className="text-gray-200">
              Each herb is registered on the blockchain with a unique digital
              identity, ensuring it can be traced back to its origin.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              📍 Geo-Tagging
            </h2>
            <p className="text-gray-200">
              Farmers and wild collectors geo-tag collection points, adding a
              layer of authenticity and proof of origin.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              🔗 Blockchain Security
            </h2>
            <p className="text-gray-200">
              Immutable blockchain records guarantee tamper-proof data, ensuring
              that herbs are genuine and ethically sourced.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-green-300">
              🧪 End-to-End Transparency
            </h2>
            <p className="text-gray-200">
              From farm to Ayurvedic formulation label, every stage of the herb’s
              journey is recorded, empowering consumers with confidence.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-16 p-8 rounded-2xl bg-green-900/40 border border-green-600 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-green-200 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            To revolutionize Ayurveda with cutting-edge technology by creating
            a transparent, secure, and globally trusted herbal supply chain,
            empowering both farmers and consumers while preserving the integrity
            of ancient wisdom.
          </p>
        </div>
      </div>
    </div>
  );
}
