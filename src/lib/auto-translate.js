/**
 * Server-side auto-translation.
 *
 * Two providers, picked automatically:
 *   1. If GOOGLE_TRANSLATE_API_KEY is set → official Google Cloud Translation
 *      REST API (no rate limits, production-grade, free 500k chars/mo for
 *      the first 12 months on a new GCP project).
 *   2. Otherwise → @vitalets/google-translate-api unofficial scraper
 *      (free, but rate-limits unpredictably — fine for dev, NOT for prod).
 *
 * Brand terms (SandiLink, Stripe, M-Pesa, …) are masked before translation
 * and restored after so they survive untouched. Results are cached in memory
 * — production should swap this for Redis or a database table.
 *
 * Never throws — on any failure the original English string is returned, so
 * a translator outage just degrades gracefully.
 */
import "server-only";
import { translate as scraperTranslate } from "@vitalets/google-translate-api";

const PROTECTED_TERMS = [
  "Preceptor Connect™",
  "Preceptor Connect",
  "One Sandi Platform",
  "One Sandi",
  "SandiLink",
  "MercadoPago",
  "Flutterwave",
  "Razorpay",
  "Paystack",
  "M-Pesa",
  "Apple Pay",
  "Google Pay",
  "PayPal",
  "Stripe",
  "PHI",
  "USD",
];

const LOCALE_TO_GOOGLE = {
  en: "en",
  es: "es",
  fr: "fr",
  pt: "pt",
  ar: "ar",
  sw: "sw",
  zh: "zh-CN",
  hi: "hi",
};

const cache = new Map();

function maskBrand(text) {
  let masked = text;
  const map = new Map();
  let i = 0;
  for (const term of PROTECTED_TERMS) {
    while (masked.includes(term)) {
      const token = `__P${i}__`;
      masked = masked.replace(term, token);
      map.set(token, term);
      i++;
    }
  }
  return { masked, map };
}

function unmaskBrand(text, map) {
  let out = text;
  for (const [token, term] of map) {
    out = out.replaceAll(token, term);
  }
  return out;
}

async function callOfficial(text, googleCode) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) throw new Error("no-api-key");
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, target: googleCode, source: "en", format: "text" }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`google-cloud ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const translated = data?.data?.translations?.[0]?.translatedText;
  if (!translated) throw new Error("google-cloud: empty response");
  return translated;
}

async function callScraper(text, googleCode) {
  const res = await scraperTranslate(text, { to: googleCode });
  return res.text;
}

export async function autoTranslate(text, targetLocale) {
  if (!text || typeof text !== "string") {
    return { text: text ?? "", source: "original", cached: false, provider: "none" };
  }
  if (targetLocale === "en") {
    return { text, source: "original", cached: false, provider: "none" };
  }

  const googleCode = LOCALE_TO_GOOGLE[targetLocale];
  if (!googleCode) {
    return { text, source: "fallback-english", cached: false, provider: "none" };
  }

  const cacheKey = `${targetLocale}:${text}`;
  if (cache.has(cacheKey)) {
    return { text: cache.get(cacheKey), source: "translated", cached: true, provider: "cache" };
  }

  const { masked, map } = maskBrand(text);

  // 1) Official API if a key is configured.
  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    try {
      const raw = await callOfficial(masked, googleCode);
      const translated = unmaskBrand(raw, map);
      cache.set(cacheKey, translated);
      return { text: translated, source: "translated", cached: false, provider: "google-cloud" };
    } catch (err) {
      // fall through to scraper
      console.warn(`[auto-translate] official API failed, falling back: ${err.message}`);
    }
  }

  // 2) Unofficial scraper fallback.
  try {
    const raw = await callScraper(masked, googleCode);
    const translated = unmaskBrand(raw, map);
    cache.set(cacheKey, translated);
    return { text: translated, source: "translated", cached: false, provider: "scraper" };
  } catch {
    return { text, source: "fallback-english", cached: false, provider: "none" };
  }
}
