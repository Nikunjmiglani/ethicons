"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 for redirect
import { getContract } from "@/lib/contract";
import { QRCodeCanvas } from "qrcode.react";

export default function ImportPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [otherHerb, setOtherHerb] = useState("");
  const [geo, setGeo] = useState("");
  const [message, setMessage] = useState("");
  const [herbId, setHerbId] = useState("");
  const [progress, setProgress] = useState(0); // track herb journey
  const [reportReady, setReportReady] = useState(false);

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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
              headers: {
                "User-Agent": "ayurvedic-traceability-demo/1.0 (contact@example.com)",
                "Accept": "application/json",
              },
            }
          );

          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          console.log("Nominatim response:", data);

          // Try best options
          let place =
            data.display_name ||
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.state ||
            `${lat}, ${lon}`;

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

      // trigger progress simulation
      setProgress(1);
      setReportReady(false);
      simulateProgress();
    } catch (err) {
      console.error("Error details:", err);
      setMessage("❌ Error collecting herb: " + (err?.reason || err?.message));
    }
  }

  function simulateProgress() {
    // step 1 -> sent for testing
    setTimeout(() => setProgress(2), 2000);
    // step 2 -> report ready
    setTimeout(() => {
      setProgress(3);
      setReportReady(true);
    }, 5000);
  }

  function handleReportDownload() {
    // After clicking download, wait 5s then redirect
    setTimeout(() => {
      router.push("/storage");
    }, 5000);
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
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-6 text-center font-medium shadow space-y-4">
            <p className="text-lg">{message}</p>
            {herbId && (
              <>
                <p className="mt-2 text-xl font-bold text-green-700">
                  🆔 Herb ID: <span className="font-mono">{herbId}</span>
                </p>
                <div className="mt-4 flex justify-center">
                <QRCodeCanvas
value={JSON.stringify(herbData)} size={160}
  bgColor="#ffffff"
  fgColor="#166534"
  level="H"
  includeMargin={true}
/>

                </div>
                <p className="mt-2 text-sm text-gray-600">
                  📱 Scan this QR to retrieve herb details later
                </p>

                {/* Progress bar */}
                {progress > 0 && (
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          progress === 1
                            ? "bg-yellow-500 w-1/3"
                            : progress === 2
                            ? "bg-blue-500 w-2/3"
                            : "bg-green-600 w-full"
                        } transition-all duration-700`}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm mt-2 text-gray-700">
                      <span>✔ Submitted</span>
                      <span>
                        {progress >= 2 ? "✔ Sent for Testing" : "⏳ Testing"}
                      </span>
                      <span>
                        {progress === 3 ? "✔ Report Ready" : "⏳ Report"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Download button */}
                {reportReady && (
                  <div className="mt-6">
                    <a
                      href="/soil_testing_report.pdf"
                      download
                      onClick={handleReportDownload}
                      className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
                    >
                      ⬇ Download Test Report
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      Redirecting to storage page in 5 seconds after download...
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
