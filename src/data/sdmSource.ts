const ARBUTUS_BASE = 'https://object-arbutus.alliancecan.ca/swift/v1/4903c6264e0c4191a74a54c93b6fe1d9/def-pollock-eckert/vertebrates_NA/ECCC_2026';
// shortcut: titiler.xyz is Development Seed's public demo instance (no SLA) and the pre-CORS bridge; target is EPSG:3857 GoogleMapsCompatible display COGs read client-side with @geomatico/maplibre-cog-protocol once the bucket has CORS.
const TITILER_BASE = 'https://titiler.xyz/cog';

// titiler.xyz's CDN caches the first caller's Access-Control-Allow-Origin without Vary: Origin; a per-origin key keeps sites from getting each other's header
const ORIGIN_KEY = `&_host=${encodeURIComponent(window.location.host)}`; // host, not origin: titiler.xyz's firewall rejects 'http://localhost' in a query

export type SdmPeriod = 'current' | 'current-model' | '2100';

// Only 1980-2010 has an evidence-clipped product, so 2100 compares like with like against 'current-model'
const SDM_FILES: Record<SdmPeriod, string> = {
  current: 'sdm-ensemble-clipped_1km_na_1980-2010',
  'current-model': 'sdm-ensemble_1km_na_1980-2010',
  '2100': 'sdm-ensemble_1km_na_2071-2100',
};

export const sdmCogUrl = (slug: string, period: SdmPeriod = 'current') =>
  `${ARBUTUS_BASE}/${slug}_${SDM_FILES[period]}_sett1.tif`;

// Byte 0..99 suitability %, nodata 255
export const sdmTileUrl = (cogUrl: string) =>
  `${TITILER_BASE}/tiles/WebMercatorQuad/{z}/{x}/{y}.png?url=${encodeURIComponent(cogUrl)}&colormap_name=viridis&rescale=0,99&nodata=255${ORIGIN_KEY}`;

export const sdmPointUrl = (cogUrl: string, lon: number, lat: number) =>
  `${TITILER_BASE}/point/${lon},${lat}?url=${encodeURIComponent(cogUrl)}${ORIGIN_KEY}`;
