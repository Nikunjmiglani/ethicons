import { NextResponse } from "next/server";
import { getGeolocation } from "@/utils/ip-geolocation";
import { calculateAnomalyScore } from "@/utils/anomaly-detector";
import { generateRiskAssessment } from "@/utils/risk-assessor";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchId, herbs, collector, ipAddress, deviceInfo, previousLocations = [] } = body;

    // Step 1: Get IP Geolocation
    const geoData = await getGeolocation(ipAddress);

    // Step 2: Run anomaly detector
    const anomalyScore = await calculateAnomalyScore({
      geoData,
      claimedLocation: herbs[0]?.geo || {}, // check first herb's location
      deviceInfo,
      previousLocations,
      batchId,
    });

    // Step 3: Risk assessment
    const risk = generateRiskAssessment(anomalyScore, geoData);

    return NextResponse.json({
      batchId,
      collector,
      detectedLocation: geoData,
      anomalyScore: anomalyScore.totalScore,
      riskLevel: risk.riskLevel,
      isSuspicious: anomalyScore.totalScore > 70,
      alerts: risk.alerts,
      recommendations: risk.recommendations,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
