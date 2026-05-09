"use client";

import { useLocalizedText } from "@/lib/localized-text";

/**
 * Read-side counterpart to <LocalizedTextField>: renders the active locale's
 * value of a localized string map (or a plain string, unchanged). Designed
 * for inline use inside directory cards, table cells, etc.
 *
 *   <LocalizedText value={expert.specialty} />
 *
 * Accepts either `{ en: "...", es: "..." }` or a raw string, so callers can
 * adopt localized fields incrementally without breaking existing data.
 */
export function LocalizedText({ value, fallback = null }) {
  const { text } = useLocalizedText(value);
  if (!text) return fallback;
  return text;
}
