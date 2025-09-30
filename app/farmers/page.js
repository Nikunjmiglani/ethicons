"use client";

const categorizedHerbs = {
  Roots: [
    {
      name: "Ashwagandha",
      soil: "Sandy loam or light red soil with good drainage",
      fertilizers: "Minimal fertilizer needed; apply FYM and low nitrogen",
      pesticides: "Neem cake and bio-pesticides against root grubs",
      practices: "Grows well in dry conditions, sow in early monsoon",
    },
    {
      name: "Ginger",
      soil: "Well-drained loamy soil, rich in humus, slightly acidic",
      fertilizers: "FYM + NPK in 3–4 splits during crop cycle",
      pesticides: "Trichoderma and neem cake for rhizome rot",
      practices: "Keep soil moist, avoid water stagnation, intercrop with legumes",
    },
    {
      name: "Turmeric",
      soil: "Fertile, well-drained sandy loam or clay loam with pH 5–7",
      fertilizers: "FYM + NPK (Nitrogen, Phosphorus, Potassium) in split doses",
      pesticides: "Copper oxychloride for leaf spot, neem oil for pests",
      practices: "Requires partial shade, regular irrigation, mulch with leaves",
    },
    {
      name: "Shatavari",
      soil: "Sandy loam or red soil with good organic matter",
      fertilizers: "FYM and phosphorus-rich fertilizers before sowing",
      pesticides: "Neem cake to prevent root rot",
      practices: "Plant tubers at onset of monsoon, requires 18–24 months",
    },
    {
      name: "Mulethi (Licorice)",
      soil: "Sandy loam or light soil with good drainage",
      fertilizers: "FYM + NPK in basal dose",
      pesticides: "Neem oil for aphids and root grubs",
      practices: "Long-duration crop (18–24 months), needs dry climate",
    },
    {
      name: "Manjistha",
      soil: "Light sandy loam, well-drained soils",
      fertilizers: "Organic compost preferred",
      pesticides: "Generally pest-free; use neem spray if required",
      practices: "Roots harvested after 2–3 years, requires climbing support",
    },
  ],

  Leaves: [
    {
      name: "Tulsi (Holy Basil)",
      soil: "Well-drained loamy soil, slightly acidic to neutral pH (6.0–7.5)",
      fertilizers: "Organic compost, farmyard manure, and nitrogen-rich fertilizers in small doses",
      pesticides: "Neem oil spray for aphids/whiteflies, Trichoderma for soil-borne diseases",
      practices: "Regular weeding, avoid waterlogging, prune to encourage branching",
    },
    {
      name: "Neem",
      soil: "Grows in all soils, best in black cotton or sandy loam",
      fertilizers: "Minimal need; occasional compost for young plants",
      pesticides: "Rarely attacked, but neem oil spray controls aphids",
      practices: "Tolerates drought, plant in open sunlight",
    },
    {
      name: "Brahmi",
      soil: "Clayey loam, prefers marshy or wet soil conditions",
      fertilizers: "Organic compost or FYM",
      pesticides: "Rarely attacked; use organic sprays if needed",
      practices: "Grows well in waterlogged or damp conditions, propagate via cuttings",
    },
    {
      name: "Giloy (Guduchi)",
      soil: "Alluvial soil with good drainage, pH 6–7",
      fertilizers: "Minimal fertilizers; organic compost preferred",
      pesticides: "Generally resistant; use neem spray if needed",
      practices: "Requires support (trellis), thrives in tropical climate",
    },
  ],

  Fruits: [
    {
      name: "Amla (Indian Gooseberry)",
      soil: "Light to medium loam, well-drained soil",
      fertilizers: "FYM + nitrogen-based fertilizers annually",
      pesticides: "Neem oil for fruit fly and aphids",
      practices: "Irrigate during dry months, prune regularly",
    },
    {
      name: "Aloe Vera",
      soil: "Light sandy soil with good drainage, slightly alkaline",
      fertilizers: "Well-decomposed cow dung or compost once a year",
      pesticides: "Neem oil for mealybugs and scale insects",
      practices: "Requires low water, avoid frost, propagate using suckers",
    },
  ],

  Spices: [
    {
      name: "Cinnamon",
      soil: "Well-drained sandy loam or laterite soil",
      fertilizers: "FYM + NPK applied annually",
      pesticides: "Leaf spot controlled with copper fungicides",
      practices: "Harvest bark after 2–3 years, requires humid tropical climate",
    },
    {
      name: "Fenugreek (Methi)",
      soil: "Loamy or sandy loam soil, pH 6–7",
      fertilizers: "FYM + light nitrogen dose",
      pesticides: "Aphids controlled with neem oil spray",
      practices: "Quick crop (30–40 days), grows in winter season",
    },
  ],
};

export default function FarmersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-6">
      {/* Page Heading */}
      <h1 className="text-4xl mt-15 md:text-5xl font-extrabold text-green-800 text-center mb-12 drop-shadow-sm">
        🌿 Farmer’s Guide to Herbal Cultivation
      </h1>

      {/* Categories */}
      <div className="space-y-16 max-w-7xl mx-auto">
        {Object.entries(categorizedHerbs).map(([category, herbs]) => (
          <div key={category}>
            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
              {category} Based Herbs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {herbs.map((herb, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md border border-green-200 hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-green-700 text-center">
                      {herb.name}
                    </h3>
                    <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                      <p>
                        <span className="font-semibold text-green-800">
                          🌱 Soil:
                        </span>{" "}
                        {herb.soil}
                      </p>
                      <p>
                        <span className="font-semibold text-green-800">
                          🌿 Fertilizers:
                        </span>{" "}
                        {herb.fertilizers}
                      </p>
                      <p>
                        <span className="font-semibold text-green-800">
                          🐛 Pesticides:
                        </span>{" "}
                        {herb.pesticides}
                      </p>
                      <p>
                        <span className="font-semibold text-green-800">
                          👨‍🌾 Practices:
                        </span>{" "}
                        {herb.practices}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-600 text-sm">
        © 2025 Farmer’s Herbal Guide – Empowering Sustainable Agriculture 🌾
      </div>
    </div>
  );
}
