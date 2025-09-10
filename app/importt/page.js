"use client";
import { useState } from "react";
import { getContract } from "@/lib/contract";

export default function ImportPage() {
  const [name, setName] = useState("");
  const [otherHerb, setOtherHerb] = useState("");
  const [geo, setGeo] = useState("");
  const [herbId, setHerbId] = useState("");
  const [batchDetails, setBatchDetails] = useState("");
  const [batchId, setBatchId] = useState("");
  const [formulation, setFormulation] = useState("");
  const [message, setMessage] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // predefined herbs
  const predefinedHerbs = [
    "Tulsi", "Ashwagandha", "Aloe Vera", "Neem", "Turmeric", "Ginger",
    "Giloy", "Shatavari", "Brahmi", "Amla", "Triphala", "Haritaki",
    "Baheda", "Arjuna", "Manjistha", "Guggul", "Mulethi", "Kalonji",
    "Fenugreek", "Cinnamon", "Other"
  ];

  // 🌍 Auto-detect geo location with reverse geocoding
  async function handleGetLocation() {
    if (!navigator.geolocation) {
      setMessage("❌ Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(5);
        const lon = pos.coords.longitude.toFixed(5);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();
          const place = data.display_name || `${lat}, ${lon}`;
          setGeo(place);
          setMessage("✅ Location fetched: " + place);
        } catch (err) {
          console.error("Reverse geocode error:", err);
          setGeo(`${lat}, ${lon}`);
          setMessage("⚠️ Location fetched (coords only)");
        }
      },
      (err) => {
        console.error("Geo error:", err);
        setMessage("❌ Error fetching location: " + err.message);
      }
    );
  }

  // ✅ collectHerb
  async function handleCollectHerb() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = await getContract();
      const herbName = name === "Other" ? otherHerb : name;
      const tx = await contract.collectHerb(herbName, geo);
      await tx.wait();
      setMessage("✅ Herb collected successfully!");
      setActiveStep(2);
      setName("");
      setOtherHerb("");
      setGeo("");
    } catch (err) {
      console.error("Error details:", err);
      setMessage("❌ Error collecting herb: " + (err?.reason || err?.message));
    }
  }

  // ✅ createBatch
  async function handleCreateBatch() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = await getContract();
      const herbIds = [Number(herbId)];
      const tx = await contract.createBatch(herbIds, batchDetails);
      await tx.wait();
      setMessage("✅ Batch created successfully!");
      setActiveStep(3);
      setHerbId("");
      setBatchDetails("");
    } catch (err) {
      console.error("Error details:", err);
      setMessage("❌ Error creating batch: " + (err?.reason || err?.message));
    }
  }

  // ✅ labelProduct
  async function handleLabelProduct() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = await getContract();
      const tx = await contract.labelProduct(Number(batchId), formulation);
      await tx.wait();
      setMessage("✅ Product labeled successfully!");
      setActiveStep(3);
      setBatchId("");
      setFormulation("");
    } catch (err) {
      console.error("Error details:", err);
      setMessage("❌ Error labeling product: " + (err?.reason || err?.message));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-10">
        <h1 className="text-3xl font-extrabold text-center text-green-800">
          🌿 Ayurvedic Traceability Demo
        </h1>

        {/* Stepper */}
        <div className="flex justify-between items-center">
          {["Collect Herb", "Create Batch", "Label Product"].map(
            (step, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 text-center"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 ${
                    activeStep >= index + 1
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-500 border-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    activeStep >= index + 1
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
            )
          )}
        </div>

        {/* Collect Herb */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Collect Herb
          </h2>
          <div className="space-y-3">
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              <option value="">Select Herb</option>
              {predefinedHerbs.map((herb, idx) => (
                <option key={idx} value={herb}>
                  {herb}
                </option>
              ))}
            </select>

            {name === "Other" && (
              <input
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Herb Name"
                value={otherHerb}
                onChange={(e) => setOtherHerb(e.target.value)}
              />
            )}

            <div className="flex gap-2">
              <input
                className="flex-1 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Geo Location"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
              />
              <button
                onClick={handleGetLocation}
                className="px-4 py-2 bg-gray-100 border border-green-400 rounded-lg hover:bg-green-50 transition"
              >
                📍
              </button>
            </div>
            <button
              onClick={handleCollectHerb}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              🌿 Collect Herb
            </button>
          </div>
        </div>

        {/* Create Batch */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Create Batch
          </h2>
          <div className="space-y-3">
            <input
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Herb ID"
              value={herbId}
              onChange={(e) => setHerbId(e.target.value)}
            />
            <input
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Process Details"
              value={batchDetails}
              onChange={(e) => setBatchDetails(e.target.value)}
            />
            <button
              onClick={handleCreateBatch}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              📦 Create Batch
            </button>
          </div>
        </div>

        {/* Label Product */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Label Product
          </h2>
          <div className="space-y-3">
            <input
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            />
            <input
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Formulation Details"
              value={formulation}
              onChange={(e) => setFormulation(e.target.value)}
            />
            <button
              onClick={handleLabelProduct}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              🏷 Label Product
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-4 text-center font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
