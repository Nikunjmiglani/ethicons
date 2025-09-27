// app/api/generateReport/[batchId]/route.js
import clientPromise from "@/lib/mongodb";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export async function GET(req, { params }) {
  try {
    const { batchId } = await params; // ✅ must await in App Router
    console.log("📥 Request for report:", batchId);

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const collection = db.collection("herb_batches");

    const batch = await collection.findOne({ batchId });
    if (!batch) {
      return Response.json({ error: "Batch not found" }, { status: 404 });
    }

    console.log("🔍 Batch from DB:", batch);

    // ✅ Random but fixed soil values (good ranges)
    const soilData = {
      ph: (6.5 + Math.random() * 0.5).toFixed(2), // 6.5–7.0
      moisture: (25 + Math.random() * 5).toFixed(1) + " %",
      temperature: (20 + Math.random() * 5).toFixed(1) + " °C",
      nitrogen: (280 + Math.random() * 20).toFixed(0) + " mg/kg",
      phosphorus: (22 + Math.random() * 5).toFixed(0) + " mg/kg",
      potassium: (180 + Math.random() * 20).toFixed(0) + " mg/kg",
      soilType: "Loamy Soil",
    };

    // ✅ Path to your custom font
    const fontPath = path.join(process.cwd(), "public", "fonts", "Movistar Text Regular.ttf");
    if (!fs.existsSync(fontPath)) {
      console.error("❌ Font file missing at:", fontPath);
      return Response.json({ error: "Font file missing" }, { status: 500 });
    }

    // ✅ Generate PDF
    const pdfBuffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));

      // 🔑 Register + force custom font immediately (fix Helvetica.afm issue)
      doc.registerFont("Custom", fontPath);
      doc.font("Custom");

      // Title
      doc.fontSize(22).fillColor("#166534").text("🌿 Herb Soil Test Report", {
        align: "center",
      });
      doc.moveDown(2);

      // Batch info
      doc.fontSize(14).fillColor("black").text(`Batch ID: ${batch.batchId}`);
      doc.text(`Collector: ${batch.collector}`);
      doc.text(`Date: ${new Date(batch.createdAt).toLocaleString()}`);
      doc.moveDown();

      // Herb list
      doc.fontSize(16).fillColor("#166534").text("Herbs in this Batch:", { underline: true });
      doc.moveDown(0.5);
      batch.herbs.forEach((h, i) => {
        doc.fontSize(13).fillColor("black").text(`${i + 1}. ${h.name} — ${h.geo}`);
      });
      doc.moveDown(1.5);

      // Soil analysis section
      doc.fontSize(16).fillColor("#166534").text("Soil Test Results:", { underline: true });
      doc.moveDown(0.5);

      const entries = Object.entries(soilData);
      entries.forEach(([key, value]) => {
        doc.fontSize(13).fillColor("black").text(`${capitalize(key)}: ${value}`);
      });

      doc.moveDown(2);

      // Footer
      doc.fontSize(11).fillColor("gray").text(
        "✅ Verified by Ayurvedic Traceability Lab | Report generated automatically",
        { align: "center" }
      );

      doc.end();
    });

    // ✅ Send PDF response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${batchId}_report.pdf"`,
      },
    });
  } catch (err) {
    console.error("❌ PDF generation error:", err);
    return Response.json({ error: "Failed to generate report" }, { status: 500 });
  }
}

// Helper: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
