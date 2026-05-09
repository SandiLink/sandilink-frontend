/**
 * Locale configuration for SandiLink.
 *
 * Tier 1 (must ship at launch): English, Spanish, French.
 * Tier 2 (architecture-ready, fill translations later): Portuguese, Arabic,
 * Swahili, Mandarin Chinese, Hindi.
 *
 * Adding a new locale:
 *   1. Add the entry to LOCALES below with `tier`, `label`, native name and `dir`.
 *   2. Drop a `<code>.json` file in `src/messages/` (start by copying en.json).
 *   3. The middleware, language switcher, and provider all read from this file —
 *      no other code changes required.
 */
export const LOCALES = [
  { code: "en", label: "English", native: "English", flag: "🇺🇸", tier: 1, dir: "ltr" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸", tier: 1, dir: "ltr" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷", tier: 1, dir: "ltr" },
  { code: "pt", label: "Portuguese", native: "Português", flag: "🇵🇹", tier: 2, dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦", tier: 2, dir: "rtl" },
  { code: "sw", label: "Swahili", native: "Kiswahili", flag: "🇰🇪", tier: 2, dir: "ltr" },
  { code: "zh", label: "Mandarin Chinese", native: "中文", flag: "🇨🇳", tier: 2, dir: "ltr" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳", tier: 2, dir: "ltr" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);
export const DEFAULT_LOCALE = "en";
export const LOCALE_COOKIE = "sandilink-locale";

export function getLocaleConfig(code) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isValidLocale(code) {
  return LOCALE_CODES.includes(code);
}
