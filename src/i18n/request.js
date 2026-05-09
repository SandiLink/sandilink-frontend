import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_CODES,
  isValidLocale,
} from "./config";

/**
 * Negotiate the locale for the current request:
 *   1. Cookie (user-selected) wins.
 *   2. Otherwise sniff Accept-Language for the first supported match.
 *   3. Fall back to the default.
 */
async function negotiateLocale() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const headerStore = await headers();
  const acceptLanguage = headerStore.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((entry) => entry.split(";")[0].trim().toLowerCase());
    for (const candidate of preferred) {
      const base = candidate.split("-")[0];
      if (LOCALE_CODES.includes(base)) return base;
    }
  }

  return DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
  const locale = await negotiateLocale();
  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
