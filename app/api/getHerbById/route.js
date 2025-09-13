import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const herbId = searchParams.get("herbId");

    if (!herbId) {
      return new Response(JSON.stringify({ error: "Missing herbId" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const herb = await db.collection("herbs").findOne({ herbId });

    if (!herb) {
      return new Response(JSON.stringify({ error: "Herb not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(herb), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
