import crypto from "crypto";

let lastNonce = null;

/**
 * Generate a new random nonce (hex string).
 */
export async function GET() {
  lastNonce = crypto.randomBytes(16).toString("hex");
  return Response.json({ nonce: lastNonce });
}

/**
 * Validate a nonce.
 * - In production: strict one-time usage.
 * - In development: always accept (makes testing easier).
 */
export function validateNonce(nonce) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("⚠️ Dev mode: skipping strict nonce validation");
    return true;
  }

  if (!lastNonce || lastNonce !== nonce) return false;

  // burn the nonce after use in production
  lastNonce = null;
  return true;
}
