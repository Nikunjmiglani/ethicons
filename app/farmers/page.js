"use client";
import { Card, CardContent } from "@/components/ui/card";

const herbs = [
  {
    name: "Tulsi (Holy Basil)",
    soil: "Well-drained loamy soil, slightly acidic to neutral pH (6.0–7.5)",
    fertilizers: "Organic compost, farmyard manure, and nitrogen-rich fertilizers in small doses",
    pesticides: "Neem oil spray for aphids/whiteflies, Trichoderma for soil-borne diseases",
    practices: "Regular weeding, avoid waterlogging, prune to encourage branching",
  },
  {
    name: "Ashwagandha",
    soil: "Sandy loam or light red soil with good drainage",
    fertilizers: "Minimal fertilizer needed; apply FYM and low nitrogen",
    pesticides: "Neem cake and bio-pesticides against root grubs",
    practices: "Grows well in dry conditions, sow in early monsoon",
  },
  {
    name: "Aloe Vera",
    soil: "Light sandy soil with good drainage, slightly alkaline",
    fertilizers: "Well-decomposed cow dung or compost once a year",
    pesticides: "Neem oil for mealybugs and scale insects",
    practices: "Requires low water, avoid frost, propagate using suckers",
  },
  {
    name: "Neem",
    soil: "Grows in all soils, best in black cotton or sandy loam",
    fertilizers: "Minimal need; occasional compost for young plants",
    pesticides: "Rarely attacked, but neem oil spray controls aphids",
    practices: "Tolerates drought, plant in open sunlight",
  },
  {
    name: "Turmeric",
    soil: "Fertile, well-drained sandy loam or clay loam with pH 5–7",
    fertilizers: "FYM + NPK (Nitrogen, Phosphorus, Potassium) in split doses",
    pesticides: "Copper oxychloride for leaf spot, neem oil for pests",
    practices: "Requires partial shade, regular irrigation, mulch with leaves",
  },
  {
    name: "Ginger",
    soil: "Well-drained loamy soil, rich in humus, slightly acidic",
    fertilizers: "FYM + NPK in 3–4 splits during crop cycle",
    pesticides: "Trichoderma and neem cake for rhizome rot",
    practices: "Keep soil moist, avoid water stagnation, intercrop with legumes",
  },
  {
    name: "Amla (Indian Gooseberry)",
    soil: "Light to medium loam, well-drained soil",
    fertilizers: "FYM + nitrogen-based fertilizers annually",
    pesticides: "Neem oil for fruit fly and aphids",
    practices: "Irrigate during dry months, prune regularly",
  },
];

export default function FarmersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
      <h1 className="text-4xl font-extrabold text-green-800 text-center mb-10">
        🌿 Farmer’s Guide to Herbal Cultivation
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {herbs.map((herb, idx) => (
          <Card key={idx} className="shadow-md rounded-2xl border border-green-200">
            <CardContent className="p-6 space-y-3">
              <h2 className="text-2xl font-bold text-green-700">{herb.name}</h2>
              <p><span className="font-semibold">🌱 Soil:</span> {herb.soil}</p>
              <p><span className="font-semibold">🌿 Fertilizers:</span> {herb.fertilizers}</p>
              <p><span className="font-semibold">🐛 Pesticides:</span> {herb.pesticides}</p>
              <p><span className="font-semibold">👨‍🌾 Practices:</span> {herb.practices}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
