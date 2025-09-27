// app/api/generateReport/[batchId]/route.js
import clientPromise from "@/lib/mongodb";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

// Helper function to stream PDF data into a buffer
async function generatePdfBuffer(batch, soilData) {
  // ✅ Tell pdfkit not to load a default font on initialization
  const doc = new PDFDocument({ margin: 50, size: "A4", font: null });

  // Correct paths to your Roboto fonts in the root /fonts folder
  const fontPath = path.join(process.cwd(), "fonts", "Roboto-Regular.ttf");
  const boldFontPath = path.join(process.cwd(), "fonts", "Roboto-Bold.ttf");

  // Check if fonts exist before proceeding
  if (!fs.existsSync(fontPath) || !fs.existsSync(boldFontPath)) {
    throw new Error(`One or more font files not found in the /fonts directory.`);
  }

  // Register both Roboto fonts
  doc.registerFont("Regular", fontPath);
  doc.registerFont("Bold", boldFontPath);

  // --- Start PDF Content ---

  // Title
  doc
    .font("Bold") // Use Bold font for the title
    .fontSize(22)
    .fillColor("#166534")
    .text("🌿 Herb Soil Test Report", {
      align: "center",
    });
  doc.moveDown(2);

  // Batch Info using Bold for labels and Regular for data
  doc.fontSize(14).fillColor("black");
  doc.font("Bold").text("Batch ID: ", { continued: true }).font("Regular").text(batch.batchId);
  doc.font("Bold").text("Collector: ", { continued: true }).font("Regular").text(batch.collector);
  doc.font("Bold").text("Date: ", { continued: true }).font("Regular").text(new Date(batch.createdAt).toLocaleString());
  doc.moveDown();

  // Herb list
  doc
    .font("Bold")
    .fontSize(16)
    .fillColor("#166534")
    .text("Herbs in this Batch:", {
      underline: true,
    });
  doc.moveDown(0.5);
  batch.herbs.forEach((h, i) => {
    doc
      .font("Regular")
      .fontSize(13)
      .fillColor("black")
      .text(`${i + 1}. ${h.name} — ${h.geo}`);
  });
  doc.moveDown(1.5);

  // Soil results
  doc
    .font("Bold")
    .fontSize(16)
    .fillColor("#166534")
    .text("Soil Test Results:", {
      underline: true,
    });
  doc.moveDown(0.5);

  Object.entries(soilData).forEach(([key, value]) => {
    doc.fontSize(13).fillColor("black");
    doc.font("Bold").text(`${capitalize(key)}: `, { continued: true }).font("Regular").text(value);
  });
  doc.moveDown(2);

  // Footer
  doc
    .font("Regular")
    .fontSize(11)
    .fillColor("gray")
    .text(
      "✅ Verified by Ayurvedic Traceability Lab | Auto-generated report",
      { align: "center" }
    );

  // Finalize the PDF and end the stream
  doc.end();

  // --- Convert Stream to Buffer ---
  const buffers = [];
  for await (const chunk of doc) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers);
}

export async function GET(req, { params }) {
  try {
    const { batchId } = params;
    console.log("📥 Request for report:", batchId);

    const client = await clientPromise;
    const db = client.db("herbTraceability");
    const collection = db.collection("herb_batches");

    const batch = await collection.findOne({ batchId });
    if (!batch) {
      return Response.json({ error: "Batch not found" }, { status: 404 });
    }

    console.log("🔍 Batch from DB:", batch);

    // Random soil values
    const soilData = {
      "pH Level": (6.5 + Math.random() * 0.5).toFixed(2),
      "Moisture": (25 + Math.random() * 5).toFixed(1) + " %",
      "Temperature": (20 + Math.random() * 5).toFixed(1) + " °C",
      "Nitrogen (N)": (280 + Math.random() * 20).toFixed(0) + " mg/kg",
      "Phosphorus (P)": (22 + Math.random() * 5).toFixed(0) + " mg/kg",
      "Potassium (K)": (180 + Math.random() * 20).toFixed(0) + " mg/kg",
      "Soil Type": "Loamy Soil",
    };

    // Generate PDF using the async helper function
    const pdfBuffer = await generatePdfBuffer(batch, soilData);

    // Send PDF response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${batchId}_report.pdf"`,
      },
    });
  } catch (err) {
    console.error("❌ PDF generation error:", err);
    return Response.json(
      { error: "Failed to generate report", details: err.message },
      { status: 500 }
    );
  }
}

// Helper
function capitalize(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}