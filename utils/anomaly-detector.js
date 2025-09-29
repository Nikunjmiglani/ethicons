class LocationAnomalyDetector {
  constructor() {
    this.weights = {
      locationMismatch: 0.3,
      vpnDetection: 0.25,
      behavioralPattern: 0.2,
      timeAnomaly: 0.15,
      deviceConsistency: 0.1,
    };
  }

  async calculateAnomalyScore(data) {
    const scores = {
      locationMismatch: this.checkLocationMismatch(data.geoData, data.claimedLocation),
      vpnDetection: await this.detectVPN(data.geoData),
      behavioralPattern: this.analyzeBehavioralPatterns(data.previousLocations, data.geoData),
      timeAnomaly: this.checkTimePatterns(data.geoData),
      deviceConsistency: this.checkDeviceConsistency(data.deviceInfo, data.geoData),
    };

    const totalScore = Object.keys(scores).reduce(
      (sum, k) => sum + scores[k] * this.weights[k],
      0
    );
    return { ...scores, totalScore };
  }

  checkLocationMismatch(geoData, claimedLocation) {
    if (!claimedLocation) return 50;
    if (claimedLocation.includes(",") && !claimedLocation.includes(geoData.country)) return 100;
    return 0;
  }

  async detectVPN(geoData) {
    const isp = geoData.isp?.toLowerCase() || "";
    if (geoData.proxy || isp.includes("vpn") || isp.includes("proxy")) return 100;
    return 0;
  }

  analyzeBehavioralPatterns(prev, currentGeo) {
    if (!prev.length) return 20;
    return 10; // simplified: you can extend with distance checks
  }

  checkTimePatterns(geoData) {
    return 10; // placeholder, can improve
  }

  checkDeviceConsistency(deviceInfo, geoData) {
    if (deviceInfo?.timezone && deviceInfo.timezone !== geoData.timezone) return 40;
    return 5;
  }
}

const detector = new LocationAnomalyDetector();
export async function calculateAnomalyScore(data) {
  return detector.calculateAnomalyScore(data);
}
