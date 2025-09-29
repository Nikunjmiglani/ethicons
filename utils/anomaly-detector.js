class LocationAnomalyDetector {
  constructor() {
    this.weights = {
      locationMismatch: 0.4,
      vpnDetection: 0.3,
      deviceConsistency: 0.2,
      timeAnomaly: 0.1,
    };
  }

  async calculateAnomalyScore(data) {
    const scores = {
      locationMismatch: this.checkLocationMismatch(data.geoData, data.claimedLocation),
      vpnDetection: await this.detectVPN(data.geoData),
      deviceConsistency: this.checkDeviceConsistency(data.deviceInfo, data.geoData),
      timeAnomaly: this.checkTimePatterns(data.geoData),
    };

    const totalScore = Object.keys(scores).reduce(
      (sum, key) => sum + scores[key] * this.weights[key],
      0
    );

    return { ...scores, totalScore };
  }

  checkLocationMismatch(geoData, claimedLocation) {
    if (!claimedLocation) return 50;

    if (claimedLocation.country && claimedLocation.country !== geoData.country) {
      return 100;
    }
    if (claimedLocation.state && claimedLocation.state !== geoData.region) {
      return 75;
    }
    if (claimedLocation.lat && claimedLocation.lon) {
      const dist = this.calculateDistance(
        parseFloat(claimedLocation.lat),
        parseFloat(claimedLocation.lon),
        geoData.lat,
        geoData.lon
      );
      if (dist > 500) return 80;
    }

    return 0;
  }

  async detectVPN(geoData) {
    const isp = geoData.isp?.toLowerCase() || "";
    if (geoData.proxy || isp.includes("vpn") || isp.includes("proxy")) return 100;
    return 0;
  }

  checkDeviceConsistency(deviceInfo, geoData) {
    if (deviceInfo?.timezone && !geoData.timezone.includes(deviceInfo.timezone)) {
      return 40;
    }
    return 5;
  }

  checkTimePatterns() {
    return 10; // Simplified placeholder
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}

const detector = new LocationAnomalyDetector();
export async function calculateAnomalyScore(data) {
  return detector.calculateAnomalyScore(data);
}
