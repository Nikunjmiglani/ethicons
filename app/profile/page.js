"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBatches() {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/getUserBatches?email=${session.user.email}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setBatches(data.batches);
        }
      } catch (err) {
        console.error("❌ Error fetching batches:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBatches();
  }, [session?.user?.email]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading session...</p>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="mb-4">You must sign in to view your profile</p>
        <button
          onClick={() => signIn("google")}
          className="bg-green-800 text-white px-4 py-2 rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-green-200">
        <h1 className="text-3xl font-bold mt-15 text-green-800 mb-6">👤User Profile</h1>

        {/* User Info */}
        <div className="mb-6">
          <p className="text-lg">
            <span className="font-bold">Name:</span> {session.user.name}
          </p>
          <p className="text-lg">
            <span className="font-bold">Email:</span> {session.user.email}
          </p>
        </div>

        {/* Batches */}
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🌿Submitted Batches
        </h2>

        {loading ? (
          <p>⏳ Loading your batches...</p>
        ) : batches.length === 0 ? (
          <p className="text-gray-600">No batches submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {batches.map((batch) => (
              <div
                key={batch.batchId}
                className="bg-green-50 border border-green-200 rounded-lg p-4 shadow"
              >
                <p className="font-semibold text-green-800">
                  🆔 Batch ID: {batch.batchId}
                </p>
                <p className="text-sm text-gray-600">
                  Submitted on: {new Date(batch.createdAt).toLocaleString()}
                </p>

                {/* Herbs list */}
                <ul className="list-disc list-inside mt-2 text-gray-700 text-sm">
                  {batch.herbs.map((h, i) => (
                    <li key={i}>
                      <span className="font-semibold">{h.name}</span> — {h.geo}
                    </li>
                  ))}
                </ul>

                {/* Link to details */}
                <Link
                  href={`/batches/${batch.batchId}`}
                  className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded-full  hover:bg-green-700 hover:scale-110 transition-transform duration-200"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Sign out */}
        <div className="mt-6">
          <button
            onClick={() => signOut()}
            className="bg-green-900 text-white px-4 py-2 rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
