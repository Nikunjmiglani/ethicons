export function generateRiskAssessment(score, geoData) {
  let risk = "LOW";
  let alerts = [];
  let recs = [];

  if (score.totalScore > 80) {
    risk = "CRITICAL";
    alerts.push("HIGH_PROBABILITY_LOCATION_SPOOFING");
    recs.push("REJECT_BATCH");
  } else if (score.totalScore > 60) {
    risk = "HIGH";
    alerts.push("SUSPICIOUS_PATTERN");
    recs.push("REQUIRE_MANUAL_VERIFICATION");
  } else if (score.totalScore > 40) {
    risk = "MEDIUM";
    alerts.push("POTENTIAL_ANOMALY");
    recs.push("MONITOR");
  }

  if (score.vpnDetection > 70) alerts.push("VPN_USAGE_DETECTED");
  return { riskLevel: risk, alerts, recommendations: recs };
}
