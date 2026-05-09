#!/usr/bin/env node
/**
 * i18n coverage check.
 *
 * Compares every locale message file in src/messages/ against the canonical
 * en.json and reports three kinds of issue:
 *
 *   - missing  — key exists in en.json but not in this locale (FAILS)
 *   - extra    — key exists in this locale but not in en.json (FAILS)
 *   - same     — key value is identical to English (likely untranslated; warns
 *                but does NOT fail, since brand terms are intentionally shared
 *                and Tier 2 work is in-progress)
 *
 * Run: pnpm i18n:check
 *      pnpm i18n:check --strict   (also fail on `same`)
 *      pnpm i18n:check --json     (machine-readable output)
 */
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, "..", "src", "messages");
const SOURCE_LOCALE = "en";

// Strings we EXPECT to be identical across locales (brand names, generic
// abbreviations). The "same" check skips these.
const ALLOW_SAME = new Set([
  "SandiLink",
  "One Sandi",
  "Preceptor Connect™",
  "FAQ",
  "Cookies",
  "USD",
]);

const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const JSON_OUT = args.has("--json");

const COLORS = process.stdout.isTTY
  ? {
      reset: "\x1b[0m",
      red: "\x1b[31m",
      yellow: "\x1b[33m",
      green: "\x1b[32m",
      gray: "\x1b[90m",
      bold: "\x1b[1m",
    }
  : {
      reset: "",
      red: "",
      yellow: "",
      green: "",
      gray: "",
      bold: "",
    };

function flatten(obj, prefix = "") {
  const out = {};
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

async function loadLocale(code) {
  const raw = await readFile(join(MESSAGES_DIR, `${code}.json`), "utf8");
  return JSON.parse(raw);
}

async function listLocales() {
  const files = await readdir(MESSAGES_DIR);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

function compare(sourceFlat, targetFlat) {
  const missing = [];
  const extra = [];
  const same = [];

  for (const key of Object.keys(sourceFlat)) {
    if (!(key in targetFlat)) {
      missing.push(key);
      continue;
    }
    const sourceValue = sourceFlat[key];
    const targetValue = targetFlat[key];
    if (
      typeof sourceValue === "string" &&
      typeof targetValue === "string" &&
      sourceValue === targetValue &&
      !ALLOW_SAME.has(sourceValue.trim())
    ) {
      same.push({ key, value: sourceValue });
    }
  }

  for (const key of Object.keys(targetFlat)) {
    if (!(key in sourceFlat)) extra.push(key);
  }

  return { missing, extra, same };
}

function pct(n, total) {
  if (total === 0) return "100.0";
  return ((n / total) * 100).toFixed(1);
}

function statusLine(locale, report, totalKeys) {
  const translated = totalKeys - report.same.length - report.missing.length;
  const coverage = pct(translated, totalKeys);
  const color =
    report.missing.length || report.extra.length
      ? COLORS.red
      : report.same.length === 0
        ? COLORS.green
        : COLORS.yellow;
  const tick =
    report.missing.length || report.extra.length
      ? "✖"
      : report.same.length === 0
        ? "✓"
        : "•";
  return `${color}${tick}${COLORS.reset} ${COLORS.bold}${locale}${COLORS.reset}  ${coverage.padStart(5)}% translated  ${COLORS.gray}(${translated}/${totalKeys} keys)${COLORS.reset}`;
}

function printList(label, items, color) {
  if (items.length === 0) return;
  console.log(`    ${color}${label}${COLORS.reset} (${items.length}):`);
  for (const item of items.slice(0, 20)) {
    if (typeof item === "string") {
      console.log(`      ${COLORS.gray}-${COLORS.reset} ${item}`);
    } else {
      console.log(
        `      ${COLORS.gray}-${COLORS.reset} ${item.key} ${COLORS.gray}=${COLORS.reset} ${JSON.stringify(item.value)}`,
      );
    }
  }
  if (items.length > 20) {
    console.log(
      `      ${COLORS.gray}… and ${items.length - 20} more${COLORS.reset}`,
    );
  }
}

async function main() {
  const locales = await listLocales();
  if (!locales.includes(SOURCE_LOCALE)) {
    console.error(
      `${COLORS.red}error:${COLORS.reset} source locale ${SOURCE_LOCALE}.json not found in ${MESSAGES_DIR}`,
    );
    process.exit(2);
  }

  const sourceFlat = flatten(await loadLocale(SOURCE_LOCALE));
  const totalKeys = Object.keys(sourceFlat).length;

  const reports = {};
  for (const code of locales) {
    if (code === SOURCE_LOCALE) continue;
    const targetFlat = flatten(await loadLocale(code));
    reports[code] = compare(sourceFlat, targetFlat);
  }

  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        { source: SOURCE_LOCALE, totalKeys, locales: reports },
        null,
        2,
      ),
    );
  } else {
    console.log(
      `\n${COLORS.bold}i18n coverage${COLORS.reset}  ${COLORS.gray}(source: ${SOURCE_LOCALE}.json, ${totalKeys} keys)${COLORS.reset}\n`,
    );
    for (const code of Object.keys(reports)) {
      const report = reports[code];
      console.log(statusLine(code, report, totalKeys));
      printList("missing", report.missing, COLORS.red);
      printList("extra", report.extra, COLORS.red);
      printList("same as English", report.same, COLORS.yellow);
    }
    console.log("");
  }

  let failed = false;
  for (const report of Object.values(reports)) {
    if (report.missing.length || report.extra.length) failed = true;
    if (STRICT && report.same.length) failed = true;
  }
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
