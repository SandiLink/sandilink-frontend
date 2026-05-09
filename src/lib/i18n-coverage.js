import { DEFAULT_LOCALE } from "@/i18n/config";

/**
 * Brand terms / abbreviations that are *expected* to be identical across
 * locales — the "same as English" warning skips these. Mirrors the
 * ALLOW_SAME set in scripts/i18n-check.mjs so the admin UI matches CI.
 */
export const ALLOW_SAME = new Set([
  "SandiLink",
  "One Sandi",
  "Preceptor Connect™",
  "FAQ",
  "Cookies",
  "USD",
]);

/**
 * Flatten a nested message object (`{ landing: { hero: { badge: "..." } } }`)
 * into dotted-path keys (`{ "landing.hero.badge": "..." }`). Same algorithm
 * as scripts/i18n-check.mjs.
 */
export function flatten(obj, prefix = "") {
  const out = {};
  if (!obj || typeof obj !== "object") return out;
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flatten(value, path));
    } else {
      out[path] = value;
    }
  }
  return out;
}

/**
 * Compare a target locale's flat keys against the source. Returns
 * `{ missing, extra, same }` arrays — same shape as the CLI report so the
 * admin UI and CI agree on what "translated" means.
 */
export function compareLocale(sourceFlat, targetFlat) {
  const missing = [];
  const extra = [];
  const same = [];

  for (const key of Object.keys(sourceFlat)) {
    if (!(key in targetFlat)) {
      missing.push(key);
      continue;
    }
    const s = sourceFlat[key];
    const t = targetFlat[key];
    if (
      typeof s === "string" &&
      typeof t === "string" &&
      s === t &&
      !ALLOW_SAME.has(s.trim())
    ) {
      same.push(key);
    }
  }
  for (const key of Object.keys(targetFlat)) {
    if (!(key in sourceFlat)) extra.push(key);
  }
  return { missing, extra, same };
}

/**
 * Coverage % a locale displays in the admin UI: keys that are *both*
 * present *and* not identical to English (excluding allow-listed brand
 * terms). Matches the CLI's "translated" math.
 */
export function coveragePercent(report, totalKeys) {
  if (totalKeys === 0) return 100;
  const translated = totalKeys - report.same.length - report.missing.length;
  return Math.round((translated / totalKeys) * 1000) / 10;
}

/**
 * Build a per-locale report map from raw message objects.
 *   buildCoverageReport({ en: {...}, es: {...}, fr: {...} })
 *   → { totalKeys, sourceFlat, byLocale: { es: { report, flat, coverage }, ... } }
 */
export function buildCoverageReport(messagesByLocale) {
  const sourceFlat = flatten(messagesByLocale[DEFAULT_LOCALE] ?? {});
  const totalKeys = Object.keys(sourceFlat).length;
  const byLocale = {};
  for (const [code, raw] of Object.entries(messagesByLocale)) {
    if (code === DEFAULT_LOCALE) continue;
    const flat = flatten(raw);
    const report = compareLocale(sourceFlat, flat);
    byLocale[code] = {
      flat,
      report,
      coverage: coveragePercent(report, totalKeys),
    };
  }
  return { sourceFlat, totalKeys, byLocale };
}
