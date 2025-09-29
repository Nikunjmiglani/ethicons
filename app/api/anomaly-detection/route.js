import { NextResponse } from "next/server";
import { getGeolocation } from "@/utils/ip-geolocation";
import { calculateAnomalyScore } from "@/utils/anomaly-detector";
import { generateRiskAssessment } from "@/utils/risk-assessor";

export async function POST(req) {
  try {
    const body = await req.json();
    const { batchId, herbs, collector, ipAddress, deviceInfo, claimedLocation } = body;

    const geoData = await getGeolocation(ipAddress);

    const anomalyScore = await calculateAnomalyScore({
      geoData,
      claimedLocation,
      deviceInfo,
      batchId,
    });

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
