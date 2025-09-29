import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchId, herbs, collector, anomalyCheck } = body;

    const client = await clientPromise;
    const db = client.db("herbTraceability"); // ✅ matches Atlas DB

    await db.collection("herb_batches").insertOne({
      batchId,
      herbs,
      collector,
      geoVerified: anomalyCheck || { status: "NOT_VERIFIED" },
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error saving herb batch:", error);
    return NextResponse.json(
      { error: "Failed to save herb batch", details: error.message },
      { status: 500 }
    );
  }
}
