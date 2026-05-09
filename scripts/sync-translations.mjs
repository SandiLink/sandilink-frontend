/**
 * Sync translations: walks en.json (the source of truth), finds keys missing
 * in each non-English locale, translates them, and writes results back.
 * Existing translations are NEVER overwritten unless --force is passed.
 *
 * Two providers, picked automatically:
 *   1. Official Google Cloud Translation REST API if GOOGLE_TRANSLATE_API_KEY
 *      is set in your environment (no rate limits, free 500k chars/mo for
 *      the first year on a new GCP project).
 *   2. @vitalets/google-translate-api unofficial scraper otherwise (free,
 *      but rate-limits unpredictably).
 *
 * Usage:
 *   node scripts/sync-translations.mjs              # all locales, missing keys only
 *   node scripts/sync-translations.mjs --locale ar  # only ar.json
 *   node scripts/sync-translations.mjs --force      # re-translate everything (overwrites)
 *   node scripts/sync-translations.mjs --dry        # report what would change, write nothing
 *
 * Brand terms (SandiLink, Stripe, M-Pesa, etc.) are masked before translation
 * and restored after, so they are never mangled.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { translate as scraperTranslate } from "@vitalets/google-translate-api";

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
const PROVIDER = API_KEY ? "google-cloud" : "scraper";

async function callOfficial(text, googleCode) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(API_KEY)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, target: googleCode, source: "en", format: "text" }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const out = data?.data?.translations?.[0]?.translatedText;
  if (!out) throw new Error("empty response");
  return out;
}

async function translateOnce(text, googleCode) {
  if (PROVIDER === "google-cloud") {
    try {
      return await callOfficial(text, googleCode);
    } catch (err) {
      // Try scraper as fallback so a bad key / quota issue doesn't kill the whole run.
      console.warn(`  official API failed (${err.message}), falling back to scraper`);
    }
  }
  const res = await scraperTranslate(text, { to: googleCode });
  return res.text;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");

// Map our locale code → Google Translate code
const LOCALES = {
  es: "es",
  fr: "fr",
  pt: "pt",
  ar: "ar",
  sw: "sw",
  zh: "zh-CN",
  hi: "hi",
};

// Brand / proper-noun terms that must survive translation untouched.
// Order matters: longer phrases first so they match before substrings.
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

// CLI args
const args = process.argv.slice(2);
const onlyLocale = args.includes("--locale") ? args[args.indexOf("--locale") + 1] : null;
const force = args.includes("--force");
const dryRun = args.includes("--dry");

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

function* walkLeaves(obj, path = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && !Array.isArray(v)) {
      yield* walkLeaves(v, [...path, k]);
    } else if (typeof v === "string") {
      yield { path: [...path, k], value: v };
    }
  }
}

function getByPath(obj, path) {
  let cur = obj;
  for (const k of path) {
    if (cur && typeof cur === "object" && k in cur) cur = cur[k];
    else return undefined;
  }
  return cur;
}

function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (!cur[k] || typeof cur[k] !== "object" || Array.isArray(cur[k])) cur[k] = {};
    cur = cur[k];
  }
  cur[path[path.length - 1]] = value;
}

async function translateOne(text, to) {
  const { masked, map } = maskBrand(text);
  const result = await translateOnce(masked, to);
  return unmaskBrand(result, map);
}

async function syncLocale(code, googleCode, source) {
  const file = join(MESSAGES_DIR, `${code}.json`);
  const data = JSON.parse(await readFile(file, "utf8"));

  const todo = [];
  for (const leaf of walkLeaves(source)) {
    const existing = getByPath(data, leaf.path);
    if (force || existing === undefined) todo.push(leaf);
  }

  if (todo.length === 0) {
    console.log(`[${code}] up to date — nothing to translate`);
    return;
  }

  console.log(`[${code}] ${todo.length} keys to translate${dryRun ? " (dry run)" : ""}`);
  if (dryRun) {
    for (const leaf of todo.slice(0, 20)) {
      console.log(`  + ${leaf.path.join(".")}`);
    }
    if (todo.length > 20) console.log(`  ... and ${todo.length - 20} more`);
    return;
  }

  let done = 0;
  let failed = 0;
  for (const leaf of todo) {
    try {
      const translated = await translateOne(leaf.value, googleCode);
      setByPath(data, leaf.path, translated);
      done++;
      if (done % 10 === 0) console.log(`  [${code}] ${done}/${todo.length}`);
    } catch (err) {
      failed++;
      console.error(`  [${code}] FAIL ${leaf.path.join(".")}: ${err.message}`);
    }
    // gentle pace to avoid the scraper getting rate-limited
    await new Promise((r) => setTimeout(r, 120));
  }

  await writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`[${code}] wrote ${done} keys (${failed} failed)`);
}

async function main() {
  console.log(`Provider: ${PROVIDER === "google-cloud" ? "Google Cloud Translation API (official)" : "@vitalets/google-translate-api (unofficial scraper — set GOOGLE_TRANSLATE_API_KEY for the official API)"}\n`);
  const source = JSON.parse(await readFile(join(MESSAGES_DIR, "en.json"), "utf8"));
  const locales = onlyLocale
    ? { [onlyLocale]: LOCALES[onlyLocale] }
    : LOCALES;

  if (onlyLocale && !LOCALES[onlyLocale]) {
    console.error(`Unknown locale: ${onlyLocale}. Known: ${Object.keys(LOCALES).join(", ")}`);
    process.exit(1);
  }

  for (const [code, googleCode] of Object.entries(locales)) {
    await syncLocale(code, googleCode, source);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
