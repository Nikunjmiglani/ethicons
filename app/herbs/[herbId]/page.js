"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function HerbDetailPage() {
  const { herbId } = useParams();
  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!herbId) return;
    async function fetchHerb() {
      try {
        const res = await fetch(`/api/getHerbById?herbId=${herbId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch herb");
        setHerb(data);
      } catch (err) {
        console.error(err);
        setHerb(null);
      } finally {
        setLoading(false);
      }
    }
    fetchHerb();
  }, [herbId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        ⏳ Loading herb details...
      </div>
    );
  }

  if (!herb) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        ❌ Herb not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-green-200">
        <h1 className="text-2xl font-bold text-green-800">
          🌿 {herb.name}
        </h1>
        <p>
          <span className="font-semibold">🆔 Herb ID:</span>{" "}
          <span className="font-mono">{herb.herbId}</span>
        </p>
        <p>
          <span className="font-semibold">📍 Location:</span> {herb.geo}
        </p>
        <p>
          <span className="font-semibold">📅 Collected At:</span>{" "}
          {new Date(herb.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
