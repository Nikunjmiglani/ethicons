"use client";

import { useState } from "react";
import { keccak256, toUtf8Bytes } from "ethers";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { getWriteContract } from "@/lib/contract";
import { useSession, signIn, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast"; // ✅ toasts

export default function ImportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const predefinedHerbs = [
    "Tulsi", "Ashwagandha", "Aloe Vera", "Neem", "Turmeric", "Ginger", "Giloy",
    "Shatavari", "Brahmi", "Amla", "Triphala", "Haritaki", "Baheda", "Arjuna",
    "Manjistha", "Guggul", "Mulethi", "Kalonji", "Fenugreek", "Cinnamon", "Other",
  ];

  function generateBatchId() {
    return "BATCH-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  const [herbs, setHerbs] = useState([{ name: "", otherHerb: "", geo: "" }]);
  const [batchId, setBatchId] = useState("");
  const [progress, setProgress] = useState(0);
  const [reportReady, setReportReady] = useState(false);

  async function handleGetLocation(index) {
    toast.loading("📍 Fetching your location...", { id: "geo" });

    if (!navigator.geolocation) {
      toast.error("❌ Geolocation not supported by your browser.", { id: "geo" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(7);
        const lon = pos.coords.longitude.toFixed(7);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          let place =
            data.display_name ||
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.state ||
            `${lat}, ${lon}`;

          setHerbs((prev) =>
            prev.map((h, i) => (i === index ? { ...h, geo: place } : h))
          );
          toast.success("✅ Location fetched: " + place, { id: "geo" });
        } catch (err) {
          console.error("Reverse geocode error:", err);
          setHerbs((prev) =>
            prev.map((h, i) => (i === index ? { ...h, geo: `${lat}, ${lon}` } : h))
          );
          toast("⚠️ Location fetched (coords only)", { id: "geo" });
        }
      },
      (err) => {
        console.error("Geo error:", err);
        toast.error("❌ Error fetching location: " + err.message, { id: "geo" });
      }
    );
  }

  function computeBatchHash(batch) {
  // Create deterministic string → hash
  const batchString = JSON.stringify(batch);
  return keccak256(toUtf8Bytes(batchString));
}

  async function handleCollectBatch() {
  try {
    // ✅ Validation before submission
    for (const h of herbs) {
      if (!h.name) {
        toast.error("❌ Please select a herb for each entry.");
        return;
      }
      if (h.name === "Other" && !h.otherHerb.trim()) {
        toast.error("❌ Please enter herb name for 'Other'.");
        return;
      }
      if (!h.geo.trim()) {
        toast.error("❌ Please fetch location for all herbs.");
        return;
      }
    }

    const finalBatchId = generateBatchId();
    const formattedHerbs = herbs.map((h) => ({
      name: h.name === "Other" ? h.otherHerb : h.name,
      geo: h.geo,
    }));

    // 1️⃣ Save full data to MongoDB
    const res = await fetch("/api/addHerbBatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batchId: finalBatchId,
        herbs: formattedHerbs,
        collector: session?.user?.email || "Anonymous",
      }),
    });
    if (!res.ok) throw new Error("Failed to save batch in MongoDB");

    // 2️⃣ Compute batch hash
    const batchHash = computeBatchHash({
      batchId: finalBatchId,
      herbs: formattedHerbs,
      collector: session?.user?.email || "Anonymous",
    });

    // 3️⃣ Save hash to Blockchain
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = await getWriteContract();
      const tx = await contract.createBatch(finalBatchId, batchHash);
      await tx.wait();
      
    } catch (err) {
      
      toast("🌿 Saved ");
    }

    // 4️⃣ UI update
    setBatchId(finalBatchId);
    toast.success("🌿 Herbs batch submitted successfully!");
    setProgress(1);
    setReportReady(false);
    simulateProgress();
  } catch (err) {
    console.error("Error details:", err);
    toast.error("❌ Error collecting batch: " + (err?.reason || err?.message));
  }
}

  function simulateProgress() {
    setTimeout(() => setProgress(2), 2000);
    setTimeout(() => {
      setProgress(3);
      setReportReady(true);
    }, 5000);
  }

  function handleReportDownload() {
    setTimeout(() => {
      router.push("/storage");
    }, 5000);
  }

  function addNewHerb() {
    setHerbs([...herbs, { name: "", otherHerb: "", geo: "" }]);
  }

  // ✅ AUTH
  if (status === "loading") {
    return <p className="text-center mt-10">Loading session...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">You must sign in to access this page</p>
        <button
          onClick={() => signIn("google")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // ✅ Signed in
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <Toaster position="top-right" /> 
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-3xl font-extrabold text-center mt-17 text-green-800">
          🌿 Ayurvedic Traceability Demo
        </h1>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-green-200 space-y-6">
          <h2 className="text-xl font-semibold text-green-700">Collect Herbs (Batch)</h2>

          {herbs.map((herb, idx) => (
            <div key={idx} className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <h3 className="font-bold text-green-600">Herb #{idx + 1}</h3>

              <select
                className="w-full p-3 border border-green-300 rounded-lg"
                value={herb.name}
                onChange={(e) =>
                  setHerbs((prev) =>
                    prev.map((h, i) => (i === idx ? { ...h, name: e.target.value } : h))
                  )
                }
              >
                <option value="">Select Herb</option>
                {predefinedHerbs.map((h, i) => (
                  <option key={i} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              {herb.name === "Other" && (
                <input
                  className="w-full p-3 border border-green-300 rounded-lg"
                  placeholder="Enter Herb Name"
                  value={herb.otherHerb}
                  onChange={(e) =>
                    setHerbs((prev) =>
                      prev.map((h, i) => (i === idx ? { ...h, otherHerb: e.target.value } : h))
                    )
                  }
                />
              )}

              <div className="flex gap-2">
                <input
                  className="flex-1 p-3 border border-green-300 rounded-lg"
                  placeholder="Geo Location"
                  value={herb.geo}
                  onChange={(e) =>
                    setHerbs((prev) =>
                      prev.map((h, i) => (i === idx ? { ...h, geo: e.target.value } : h))
                    )
                  }
                />
                <button
                  onClick={() => handleGetLocation(idx)}
                  className="px-4 py-2 bg-gray-100 border border-green-400 rounded-lg hover:bg-green-50"
                >
                  📍
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addNewHerb}
            className="w-full bg-gray-200 text-green-800 py-2 rounded-lg hover:bg-gray-300"
          >
            ➕ Add Another Herb
          </button>

          <button
            onClick={handleCollectBatch}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            🌿 Submit All Herbs (One Batch)
          </button>
        </div>

        {batchId && (
          <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-6 text-center font-medium shadow space-y-4 mt-8">
            <p className="mt-2 text-xl font-bold text-green-700">
              🆔 Batch ID: <span className="font-mono">{batchId}</span>
            </p>
            <div className="mt-4 flex justify-center">
              <QRCodeCanvas
                value={`${window.location.origin}/batches/${batchId}`}
                size={160}
                bgColor="#ffffff"
                fgColor="#166534"
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              📱 Scan this QR to retrieve all herbs in this batch
            </p>

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
                  <span>{progress >= 2 ? "✔ Sent for Testing" : "⏳ Testing"}</span>
                  <span>{progress === 3 ? "✔ Report Ready" : "⏳ Report"}</span>
                </div>
              </div>
            )}

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
          </div>
        )}

        <div className="text-center mt-6">
          <p>Signed in as {session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-full mt-2"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
