import { z } from "zod";
import { DEFAULT_LOCALE, LOCALE_CODES } from "@/i18n/config";

/**
 * Build a Zod object schema for a localized string map.
 * The default locale is required (with optional minLength); every other
 * configured locale is optional and may be left empty.
 *
 *   bio: localizedString({ minLength: 10 })
 *   // → { en: "...", es: "" | "...", fr: "" | "...", pt: "...", ar: "...", ... }
 */
export function localizedString({ minLength = 0, defaultMessage } = {}) {
  const shape = {};
  for (const code of LOCALE_CODES) {
    if (code === DEFAULT_LOCALE) {
      const base = z.string();
      shape[code] =
        minLength > 0
          ? base.min(
              minLength,
              defaultMessage ??
                `Must be at least ${minLength} characters in the default language`,
            )
          : base.min(1, defaultMessage ?? "Required in the default language");
    } else {
      shape[code] = z.string().optional().default("");
    }
  }
  return z.object(shape);
}
