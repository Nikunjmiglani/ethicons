"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LookupPage() {
  const { data: session, status } = useSession();
  const [batchId, setBatchId] = useState("");
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup() {
    try {
      setLoading(true);
      setError("");
      setBatchData(null);

      // 1️⃣ Fetch from MongoDB API
      const res = await fetch(`/api/getHerbBatch?batchId=${batchId}`);
      const data = await res.json();

      if (res.ok && data?.batchId) {
        setBatchData({
          batchId: data.batchId,
          herbs: data.herbs || [],
          collector: data.collector || "N/A",
          timestamp: new Date(data.createdAt).toLocaleString(),
        });
        return;
      }

      // 2️⃣ Blockchain fallback skipped (batch-based not implemented yet)
      setError("❌ Batch not found.");
    } catch (err) {
      console.error("Lookup error:", err);
      setError("❌ Error looking up batch.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Auth check
  if (status === "loading") {
    return <p className="text-center mt-10">Loading session...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="mb-4 text-center text-gray-700">
          You must sign in to access this page
        </p>
        <button
          onClick={() => signIn("google")}
          className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition w-full sm:w-auto"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  // ✅ Signed in → UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-green-200">
        <h1 className="text-xl sm:text-2xl mt-17 font-bold text-green-800 text-center mb-6">
          🌿 Lookup Herb Batch by ID
        </h1>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            className="flex-1 p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            placeholder="Enter Batch ID (e.g. BATCH-XYZ123)"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />
          <button
            onClick={handleLookup}
            disabled={loading || !batchId}
            className="px-4 py-3 sm:py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400 text-sm sm:text-base"
          >
            {loading ? "Searching..." : "🔍 Lookup"}
          </button>
        </div>

        {/* Error */}
        {error && !batchData && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-center mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Batch Data */}
        {batchData && (
          <div className="space-y-6 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <p className="text-lg font-semibold text-green-700">✅ Batch Found</p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Batch ID:</span> {batchData.batchId}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Collector:</span> {batchData.collector}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Timestamp:</span> {batchData.timestamp}
              </p>

              {/* List of herbs */}
              <div className="mt-4 text-left">
                <h3 className="font-bold text-green-700 mb-2">
                  Herbs in this batch:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                  {batchData.herbs.map((h, i) => (
                    <li key={i}>
                      <span className="font-semibold">{h.name}</span> — {h.geo}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ✅ Status Section */}
            <div className="bg-white border border-green-300 shadow rounded-lg p-4 sm:p-6">
              <h3 className="font-bold text-green-700 mb-3 text-sm sm:text-base">
                Batch Verification Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 p-2 rounded-lg">
                  <span className="text-green-700">✅</span>
                  <span>Stored under verified conditions</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 p-2 rounded-lg">
                  <span className="text-green-700">🛡️</span>
                  <span>Under surveillance</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 p-2 rounded-lg">
                  <span className="text-green-700">🧪</span>
                  <span>Quality test done</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 p-2 rounded-lg">
                  <span className="text-green-700">📦</span>
                  <span>Ready for distribution</span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-2">
              <QRCodeCanvas
                value={`${window.location.origin}/batches/${batchData.batchId}`}
                size={140}
                bgColor="#ffffff"
                fgColor="#166534"
                level="H"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500">📲 Scan to verify batch</p>
            </div>
          </div>
        )}

        {/* ✅ Sign out */}
        <div className="text-center mt-6">
          <p className="text-sm sm:text-base">
            Signed in as <span className="font-semibold">{session.user.email}</span>
          </p>
          <button
            onClick={() => signOut()}
            className="bg-green-600 text-white px-5 py-2 rounded-full mt-3 hover:bg-green-700 transition text-sm sm:text-base"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
