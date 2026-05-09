"use client";

import { useLocale } from "next-intl";
import { DEFAULT_LOCALE, LOCALE_CODES } from "@/i18n/config";

/**
 * Pick the best translation for the active locale.
 *
 * - If the active locale has a non-empty value, return it.
 * - Otherwise return the default-locale value with `fallback: true`.
 * - If even the default is empty, return null.
 *
 * Shape of `value` is `{ en: "...", es: "...", ... }`. Strings count as
 * "non-empty" only if they have content after trimming whitespace.
 */
export function pickLocalized(value, locale) {
  if (!value || typeof value !== "object") {
    return { text: typeof value === "string" ? value : null, fallback: false, source: locale };
  }

  const direct = value[locale];
  if (typeof direct === "string" && direct.trim()) {
    return { text: direct, fallback: false, source: locale };
  }

  const defaultText = value[DEFAULT_LOCALE];
  if (typeof defaultText === "string" && defaultText.trim()) {
    return { text: defaultText, fallback: true, source: DEFAULT_LOCALE };
  }

  // Last-ditch: any locale that has content (helpful when the default itself is empty).
  for (const code of LOCALE_CODES) {
    const candidate = value[code];
    if (typeof candidate === "string" && candidate.trim()) {
      return { text: candidate, fallback: true, source: code };
    }
  }

  return { text: null, fallback: false, source: null };
}

/**
 * Client hook — returns the active locale's value (or fallback) for a
 * localized string map.
 */
export function useLocalizedText(value) {
  const locale = useLocale();
  return pickLocalized(value, locale);
}

/**
 * Build an empty localized-text record covering all configured locales.
 */
export function emptyLocalizedText() {
  return Object.fromEntries(LOCALE_CODES.map((code) => [code, ""]));
}

/**
 * Flatten a localized value (or plain string, or array of either) into a
 * single lowercased haystack covering every available translation. Used by
 * directory search inputs so that a query in any language matches a card,
 * even when only one of its translations contains the term.
 */
export function localizedHaystack(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.toLowerCase();
  if (Array.isArray(value)) return value.map(localizedHaystack).join(" ");
  if (typeof value === "object") {
    return Object.values(value)
      .filter((v) => typeof v === "string")
      .join(" ")
      .toLowerCase();
  }
  return "";
}
