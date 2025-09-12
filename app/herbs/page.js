"use client";

export default function HerbsPage() {
  return (
    <div className="relative w-full  min-h-screen bg-gradient-to-b from-green-950 to-green-800 text-white font-sans">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-15 text-center drop-shadow-md">
          Ayurvedic Herbs & Collection Process
        </h1>

        <p className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Ayurveda relies on the purity and authenticity of herbs. In India,
          thousands of farmers and wild collectors contribute to the cultivation
          and harvesting of medicinal plants that form the foundation of
          traditional formulations.
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1: Importance of Herbs */}
          <section className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-4">
              🌱 Importance of Ayurvedic Herbs
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Ayurvedic herbs like{" "}
              <span className="font-semibold text-green-200">
                Ashwagandha, Tulsi, Giloy, Neem, and Amla
              </span>{" "}
              are used in formulations for immunity, vitality, and healing.
              Their therapeutic value depends on proper identification,
              collection, and preservation methods. India’s biodiversity makes
              it a global hub for medicinal plants, but ensuring authenticity is
              a key challenge.
            </p>
          </section>

          {/* Section 2: Collection Process */}
          <section className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-4">
              📍 Collection Process in India
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-200">
              <li>
                <span className="font-semibold text-green-200">Cultivation:</span>{" "}
                Farmers grow herbs in controlled environments ensuring quality
                and sustainability.
              </li>
              <li>
                <span className="font-semibold text-green-200">Wild Collection:</span>{" "}
                Collectors harvest plants from forests, often in tribal regions
                where traditional knowledge is preserved.
              </li>
              <li>
                <span className="font-semibold text-green-200">Seasonal Harvesting:</span>{" "}
                Herbs are picked during specific seasons to maintain maximum
                potency.
              </li>
              <li>
                <span className="font-semibold text-green-200">Drying & Storage:</span>{" "}
                Herbs are sun-dried or shade-dried to prevent contamination and
                stored under safe conditions.
              </li>
            </ul>
          </section>

          {/* Section 3: Challenges */}
          <section className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-4">
              ⚠️ Challenges in Herb Collection
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Many herbs face issues like adulteration, overharvesting,
              misidentification, and supply chain gaps. Farmers and collectors
              often don’t get fair prices due to lack of traceability and
              middlemen exploitation.
            </p>
          </section>

          {/* Section 4: Blockchain for Traceability */}
          <section className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-300 mb-4">
              🔗 Role of Blockchain in Traceability
            </h2>
            <p className="text-gray-200 leading-relaxed">
              Ethicons leverages blockchain to{" "}
              <span className="font-semibold text-green-200">
                record geo-tags, collection points, and farmer details
              </span>{" "}
              in an immutable ledger. This guarantees that the herbs reaching
              Ayurvedic manufacturers and consumers are{" "}
              <span className="underline">authentic, safe, and ethically sourced</span>.
            </p>
          </section>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 p-8 rounded-2xl bg-green-900/40 border border-green-600 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-green-200 mb-4">Our Commitment</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            By connecting farmers, collectors, and manufacturers with
            technology, Ethicons ensures transparency in the Ayurvedic herb
            ecosystem while preserving the integrity of India’s traditional
            knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
