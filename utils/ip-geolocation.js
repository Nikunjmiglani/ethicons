export async function getGeolocation(ipAddress) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();

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
