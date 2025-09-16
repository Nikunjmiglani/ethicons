import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return Response.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const collection = db.collection("herb_batches");

    const batches = await collection
      .find({ collector: email })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({ success: true, batches }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching user batches:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
