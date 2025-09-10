"use client";

import { useState } from "react";
import { getContract } from "../../lib/contract";
import { QRCodeCanvas } from "qrcode.react";

export default function LookupPage() {
  const [herbId, setHerbId] = useState("");
  const [herbData, setHerbData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup() {
    try {
      setLoading(true);
      setError("");
      setHerbData(null);

      const contract = await getContract();
      const herb = await contract.getHerb(herbId);

      // Format timestamp
      const date = new Date(Number(herb.timestamp) * 1000).toLocaleString();

      setHerbData({
        herbId: herb.herbId,
        name: herb.name,
        geo: herb.geoLocation,
        collector: herb.collector,
        timestamp: date,
      });
    } catch (err) {
      console.error(err);
      setError("❌ Herb not found or error fetching data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-green-200">
        <h1 className="text-2xl font-bold text-green-800 text-center mb-6">
          🌿 Lookup Herb by ID
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter Herb ID (e.g. HERB-XYZ123)"
            value={herbId}
            onChange={(e) => setHerbId(e.target.value)}
          />
          <button
            onClick={handleLookup}
            disabled={loading || !herbId}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "🔍 Lookup"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-center mb-4">
            {error}
          </div>
        )}

        {/* Herb Data */}
        {herbData && (
          <div className="space-y-4 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-lg font-semibold text-green-700">
                ✅ Herb Found
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Herb ID:</span> {herbData.herbId}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Name:</span> {herbData.name}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Geo:</span> {herbData.geo}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Collector:</span>{" "}
                {herbData.collector}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Timestamp:</span>{" "}
                {herbData.timestamp}
              </p>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-2">
              <QRCodeCanvas value={JSON.stringify(herbData)} size={160} />
              <p className="text-xs text-gray-500">📲 Scan to verify</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
