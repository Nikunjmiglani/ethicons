import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const herbs = await db.collection("herbs").find({}).toArray();

    return new Response(JSON.stringify(herbs), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
