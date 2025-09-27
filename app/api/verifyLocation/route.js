import { validateNonce } from "../locationNonce/route";

export async function POST(req) {
  try {
    const { payload, signature, account } = await req.json();
    console.log("📥 Incoming verify request:", { payload, signature, account });

    if (!payload) {
      return Response.json({ error: "Missing payload" }, { status: 400 });
    }

    // 1️⃣ Nonce validation
    if (!validateNonce(payload.nonce)) {
      return Response.json({ error: "Invalid or expired nonce" }, { status: 400 });
    }

    // 2️⃣ Timestamp freshness
    if (Math.abs(Date.now() - payload.timestamp) > 3 * 60 * 1000) {
      return Response.json({ error: "Timestamp too old" }, { status: 400 });
    }

    // 3️⃣ Accuracy threshold (adaptive)
    const ua = req.headers.get("user-agent") || "";
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
    const maxAcc = isMobile ? 200 : 2000;

    if ((payload.accuracy ?? 9999) > maxAcc) {
      console.warn(`⚠️ Accuracy too low: ${payload.accuracy}m (limit ${maxAcc}m)`);
      if (process.env.NODE_ENV === "production") {
        return Response.json(
          { error: `GPS accuracy too low (${Math.round(payload.accuracy)}m)` },
          { status: 400 }
        );
      }
    }

    // 4️⃣ 🚫 Skip signature check completely (TEMP mode)
    console.warn("⚠️ Skipping wallet signature check (temporary mode)");

    // 5️⃣ Reverse geocode to human-readable place
    let place = `${payload.lat.toFixed(4)}, ${payload.lon.toFixed(4)}`;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${payload.lat}&lon=${payload.lon}`
      );
      if (res.ok) {
        const geo = await res.json();
        if (geo.display_name) place = geo.display_name;
      }
    } catch (err) {
      console.warn("⚠️ Reverse geocoding failed, fallback to coords", err);
    }

    // ✅ Success
    console.log("✅ Verification success:", place);
    return Response.json({ ok: true, place });
  } catch (err) {
    console.error("verifyLocation error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
