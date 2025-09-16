"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function BatchDetailsPage() {
  const { batchId } = useParams();
  const router = useRouter();
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

  function handleReportDownload() {
    setTimeout(() => {
      router.push("/storage");
    }, 5000);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-green-700">⏳ Loading batch details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-4 shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-green-200">
        <h1 className="text-2xl font-bold mt-15 text-green-800 text-center mb-6">
          🌿 Herb Batch Details
        </h1>

        {batchData && (
          <div className="space-y-6 text-center">
            {/* Batch Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
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

              {/* Herbs list */}
              <div className="mt-4 text-left">
                <h3 className="font-bold text-green-700 mb-2">Herbs in this batch:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {batchData.herbs.map((h, i) => (
                    <li key={i}>
                      <span className="font-semibold">{h.name}</span> — {h.geo}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ✅ Status Section */}
            <div className="bg-white border border-green-300 shadow rounded-lg p-4">
              <h3 className="font-bold text-green-700 mb-3">Batch Verification Status</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
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
                size={160}
                bgColor="#ffffff"
                fgColor="#166534"
                level="H"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500">📲 Scan to verify batch</p>
            </div>

            {/* ✅ Download Report */}
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
          </div>
        )}
      </div>
    </div>
  );
}
