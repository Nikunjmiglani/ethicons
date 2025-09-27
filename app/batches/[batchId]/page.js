"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BatchDetailsPage() {
  const { batchId } = useParams();
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBatch() {
      try {
        const res = await fetch(`/api/getHerbBatch?batchId=${batchId}`);
        const data = await res.json();

        if (res.ok && data?.batchId) {
          setBatchData({
            batchId: data.batchId,
            herbs: data.herbs || [],
            collector: data.collector || "N/A",
            timestamp: new Date(data.createdAt).toLocaleString(),
          });
        } else {
          setError(data.error || "Batch not found.");
        }
      } catch (err) {
        console.error("Error fetching batch:", err);
        setError("❌ Could not load batch details.");
      } finally {
        setLoading(false);
      }
    }

    if (batchId) fetchBatch();
  }, [batchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-lg text-green-700 animate-pulse">
          ⏳ Loading batch details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white border border-red-300 text-red-700 rounded-lg p-6 shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden border border-green-200">
        {/* Header */}
        <div className="bg-green-700 text-white px-6 py-5">
          <h1 className="text-2xl font-bold">🌿 Verified Herb Batch</h1>
          <p className="text-sm opacity-90 break-words">
            Batch ID: <span className="font-mono">{batchData.batchId}</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Collector Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-sm">
            <p>
              <span className="font-semibold text-green-800">Collector:</span>{" "}
              {batchData.collector}
            </p>
            <p>
              <span className="font-semibold text-green-800">Created At:</span>{" "}
              {batchData.timestamp}
            </p>
          </div>

          {/* Herbs List */}
          <div>
            <h3 className="font-bold text-green-700 mb-3 text-lg">
              🌱 Herbs in this batch
            </h3>
            <ul className="space-y-2">
              {batchData.herbs.map((h, i) => (
                <li
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="break-words">
                    <span className="font-semibold">{h.name}</span> — {h.geo}
                  </div>

                  {h.geoVerified ? (
                    <span className="text-green-700 text-xs bg-green-100 border border-green-300 rounded px-2 py-0.5 whitespace-nowrap">
                      ✅ Verified ({Math.round(h.geoVerified.accuracy)}m,{" "}
                      {h.geoVerified.account
                        ? `${h.geoVerified.account.slice(
                            0,
                            6
                          )}...${h.geoVerified.account.slice(-4)}`
                        : "wallet"})
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs bg-gray-100 border border-gray-300 rounded px-2 py-0.5 whitespace-nowrap">
                      Not verified
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Status Timeline */}
          <div>
            <h3 className="font-bold text-green-700 mb-3 text-lg">
              ✅ Verification Status
            </h3>
            <div className="relative border-l-2 border-green-300 ml-3 space-y-4">
              <div className="ml-4">
                <span className="text-green-700">
                  ✅ Stored under verified conditions
                </span>
              </div>
              <div className="ml-4">
                <span className="text-green-700">🛡️ Under surveillance</span>
              </div>
              <div className="ml-4">
                <span className="text-green-700">🧪 Quality test completed</span>
              </div>
              <div className="ml-4">
                <span className="text-green-700">📦 Ready for distribution</span>
              </div>
            </div>
          </div>

          {/* Download Report */}
          <div className="text-center">
            <a
              href={`/api/generateReport/${batchId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
            >
              ⬇ Download Test Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
