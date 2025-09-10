import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "protected/video/videobg.mp4");
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Cache-Control": "no-store",
      // Optional: fake name to obfuscate
      "Content-Disposition": "inline; filename=hidden.mp4",
    },
  });
}
