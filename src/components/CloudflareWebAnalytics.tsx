const BEACON_INTEGRITY =
  "sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==";

// Self-hosted copy of Cloudflare Web Analytics beacon (2024.11.0). Disable
// automatic injection in Cloudflare Dashboard → Analytics & Logs → Web Analytics
// → Manage site → Advanced → JS snippet installation, or PSI will still flag
// the third-party script.
export default function CloudflareWebAnalytics() {
  const token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;
  if (!token) return null;

  const beaconConfig = JSON.stringify({
    version: "2024.11.0",
    token,
    r: 1,
    server_timing: {
      name: {
        cfCacheStatus: true,
        cfEdge: true,
        cfExtPri: true,
        cfL4: true,
        cfOrigin: true,
        cfSpeedBrain: true,
      },
      location_startswith: null,
    },
  });

  return (
    <script
      defer
      src="/cf-beacon.min.js"
      integrity={BEACON_INTEGRITY}
      crossOrigin="anonymous"
      data-cf-beacon={beaconConfig}
    />
  );
}
