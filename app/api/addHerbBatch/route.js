import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchId, herbs, collector } = body;

    if (!batchId || !herbs?.length) {
      return Response.json(
        { success: false, error: "Batch ID and herbs are required" },
        { status: 400 }
      );
    }

    // Normalize herbs: keep geoVerified if present
    const formattedHerbs = herbs.map((h) => ({
      name: h.name,
      geo: h.geo,
      geoVerified: h.geoVerified || null, // ✅ store verified metadata
    }));

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const collection = db.collection("herb_batches");

    await collection.insertOne({
      batchId,
      herbs: formattedHerbs,
      collector: collector || "Anonymous",
      createdAt: new Date(),
    });

    return Response.json({ success: true, batchId }, { status: 200 });
  } catch (err) {
    console.error("❌ Error saving batch:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
