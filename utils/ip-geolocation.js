import axios from "axios";

export async function getGeolocation(ipAddress) {
  try {
    const res = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const d = res.data;
    return {
      ip: d.query,
      country: d.country,
      region: d.regionName,
      city: d.city,
      lat: d.lat,
      lon: d.lon,
      timezone: d.timezone,
      isp: d.isp,
      proxy: d.proxy,
      hosting: d.hosting,
    };
  } catch (e) {
    throw new Error("Geolocation lookup failed: " + e.message);
  }
}
