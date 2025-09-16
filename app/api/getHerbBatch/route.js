import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get("batchId");

    if (!batchId) {
      return Response.json(
        { success: false, error: "Batch ID required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const collection = db.collection("herb_batches");

    const batch = await collection.findOne({ batchId });

    if (!batch) {
      return Response.json(
        { success: false, error: "Batch not found" },
        { status: 404 }
      );
    }

    return Response.json(batch, { status: 200 });
  } catch (err) {
    console.error("Error fetching batch:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
