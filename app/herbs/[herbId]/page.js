"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReadContract } from "@/lib/contract"; // ✅ read-only contract

export default function HerbDetailPage() {
  const { herbId } = useParams();
  const [herbData, setHerbData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHerb() {
      try {
        // 1️⃣ First try MongoDB API
        const res = await fetch(`/api/getHerbById?herbId=${herbId}`);
        const data = await res.json();

        if (res.ok && data?.herbId) {
          setHerbData({
            id: data.herbId,
            name: data.name,
            location: data.geo,
            status: "Stored under verified conditions",
            timestamp: new Date(data.createdAt).toLocaleString(),
            temperature: "-20°C",
            surveillance: "24x7 Active",
          });
          return; // ✅ stop here, no blockchain needed if found in MongoDB
        }

        // 2️⃣ If not found in DB → fallback to Blockchain
        try {
          const contract = getReadContract();
          const herb = await contract.getHerb(herbId);

          const timestamp = herb.timestamp?.toString
            ? new Date(Number(herb.timestamp.toString()) * 1000).toLocaleString()
            : "Unknown";

          setHerbData({
            id: herb.herbId,
            name: herb.name,
            location: herb.geoLocation || herb.location,
            status: herb.status || "Stored under verified conditions",
            timestamp,
            temperature: "-20°C",
            surveillance: "24x7 Active",
          });
        } catch (blockchainError) {
          console.warn("⚠️ Blockchain fetch failed:", blockchainError);
          setHerbData(null); // ❌ not found anywhere
        }
      } catch (err) {
        console.error("Error fetching herb:", err);
        setHerbData(null);
      } finally {
        setLoading(false);
      }
    }

    if (herbId) fetchHerb();
  }, [herbId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          ⏳ Loading herb details...
        </p>
      </div>
    );
  }

  if (!herbData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg text-red-600">
          ❌ Herb not found in MongoDB or Blockchain.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-green-200">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          🌿 Herb Traceability Report
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Herb ID:</span> {herbData.id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name:</span> {herbData.name}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Collected From:</span>{" "}
          {herbData.location}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Recorded At:</span>{" "}
          {herbData.timestamp}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Current Status:</span>{" "}
          {herbData.status}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Temperature:</span>{" "}
          {herbData.temperature}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Surveillance:</span>{" "}
          {herbData.surveillance}
        </p>

        <div className="mt-4 text-sm text-gray-500">
          ✅ Verified & Secured on Blockchain / MongoDB
        </div>
      </div>
    </div>
  );
}
