import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { herbId, name, geo } = body;

    const client = await clientPromise;
    const db = client.db("herbTraceability");

    const herb = {
      herbId,
      name,
      geo,
      collector: session.user.email, // ✅ store logged-in user's email
      createdAt: new Date(),
    };

    await db.collection("herbs").insertOne(herb);

    return new Response(JSON.stringify(herb), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save herb" }), {
      status: 500,
    });
  }
}
