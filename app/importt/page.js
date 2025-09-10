"use client";
import { useState } from "react";
import { getContract } from "@/lib/contract";
import { QRCodeCanvas } from "qrcode.react";

export default function ImportPage() {
  const [name, setName] = useState("");
  const [otherHerb, setOtherHerb] = useState("");
  const [geo, setGeo] = useState("");
  const [message, setMessage] = useState("");
  const [herbId, setHerbId] = useState("");

  const predefinedHerbs = [
    "Tulsi", "Ashwagandha", "Aloe Vera", "Neem", "Turmeric", "Ginger",
    "Giloy", "Shatavari", "Brahmi", "Amla", "Triphala", "Haritaki",
    "Baheda", "Arjuna", "Manjistha", "Guggul", "Mulethi", "Kalonji",
    "Fenugreek", "Cinnamon", "Other"
  ];

  function generateHerbId() {
    return "HERB-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  }

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

  async function handleCollectHerb() {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = await getContract();
      const herbName = name === "Other" ? otherHerb : name;
      const newHerbId = generateHerbId();

      const tx = await contract.collectHerb(newHerbId, herbName, geo);
      await tx.wait();

      setHerbId(newHerbId);
      setMessage(`🌿 Herb submitted successfully!`);
      setName("");
      setOtherHerb("");
      setGeo("");
    } catch (err) {
      console.error("Error details:", err);
      setMessage("❌ Error collecting herb: " + (err?.reason || err?.message));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-extrabold text-center text-green-800">
          🌿 Ayurvedic Traceability Demo
        </h1>

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
              🌿 Submit Herb
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-6 text-center font-medium shadow">
            <p className="text-lg">{message}</p>
            {herbId && (
              <>
                <p className="mt-2 text-xl font-bold text-green-700">
                  🆔 Herb ID: <span className="font-mono">{herbId}</span>
                </p>
                <div className="mt-4 flex justify-center">
                  <QRCodeCanvas
                    value={herbId}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#166534"
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  📱 Scan this QR to retrieve herb details later
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
