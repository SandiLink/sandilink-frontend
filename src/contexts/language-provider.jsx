"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

// Our internal locale codes (match src/i18n/config.js LOCALES).
const SUPPORTED = ["en", "es", "fr", "pt", "ar", "sw", "zh", "hi"];

// Internal code → Google Translate code (the widget needs zh-CN, not zh).
const TO_GOOGLE = {
  en: "en", es: "es", fr: "fr", pt: "pt",
  ar: "ar", sw: "sw", zh: "zh-CN", hi: "hi",
};

// First-visit auto-detect based on IP geolocation (HTTPS, ipapi.co).
const COUNTRY_TO_LOCALE = {
  // English
  US: "en", GB: "en", AU: "en", CA: "en", NZ: "en", IE: "en", ZA: "en",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", PE: "es", VE: "es", CL: "es", EC: "es",
  GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es",
  CR: "es", PA: "es", UY: "es",
  // French
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr", SN: "fr", CI: "fr", ML: "fr",
  BF: "fr", NE: "fr", TG: "fr", BJ: "fr", GA: "fr", CG: "fr", CD: "fr", CM: "fr",
  MG: "fr", HT: "fr",
  // Portuguese
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt", GW: "pt", CV: "pt", ST: "pt", TL: "pt",
  // Arabic
  SA: "ar", AE: "ar", EG: "ar", JO: "ar", LB: "ar", SY: "ar", IQ: "ar", KW: "ar",
  QA: "ar", BH: "ar", OM: "ar", YE: "ar", MA: "ar", DZ: "ar", TN: "ar", LY: "ar",
  PS: "ar", SD: "ar",
  // Swahili
  KE: "sw", TZ: "sw", UG: "sw", RW: "sw",
  // Chinese
  CN: "zh", TW: "zh", HK: "zh", SG: "zh", MO: "zh",
  // Hindi
  IN: "hi",
};

const STORAGE_KEY = "sandilink-language";
const DETECTED_KEY = "sandilink-language-detected";

function readStored() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStored(code) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // disabled / quota — silently ignore
  }
}

function markDetected() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DETECTED_KEY, "true");
  } catch {
    // ignore
  }
}

function clearGoogleTranslateCookie() {
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `googtrans=; ${expire}`;
  document.cookie = `googtrans=; ${expire} domain=${window.location.hostname};`;
  document.cookie = `googtrans=; ${expire} domain=.${window.location.hostname};`;
}

function selectInWidget(code) {
  const sel = document.querySelector(".goog-te-combo");
  if (!sel) return false;
  sel.value = TO_GOOGLE[code] ?? code;
  sel.dispatchEvent(new Event("change"));
  return true;
}

export function LanguageProvider({ children }) {
  // Always start "en" so SSR and first client render match (avoids hydration
  // mismatch). The stored value is reapplied in the effect below.
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isReady, setIsReady] = useState(false);

  // Load the Google Translate widget script once. Both the host element AND
  // the script live outside React's tree so the DOM nodes Google mutates are
  // never reconciled by React (silences the "script tag inside React" warning
  // and avoids the insertBefore crash from facebook/react#11538).
  //
  // Skipped in development: the widget's MutationObserver + per-navigation
  // re-translation pass adds visible lag during dev work. Set
  // NEXT_PUBLIC_ENABLE_GT_WIDGET=true to force-enable it locally for testing.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDev = process.env.NODE_ENV === "development";
    const forceEnabled = process.env.NEXT_PUBLIC_ENABLE_GT_WIDGET === "true";
    if (isDev && !forceEnabled) {
      setIsReady(false);
      return;
    }
    if (window.__sandilinkGTLoaded) {
      setIsReady(true);
      return;
    }
    window.__sandilinkGTLoaded = true;

    // 1. Host div — append directly to document.body, NOT rendered via JSX.
    if (!document.getElementById("google_translate_element")) {
      const host = document.createElement("div");
      host.id = "google_translate_element";
      host.style.display = "none";
      host.setAttribute("aria-hidden", "true");
      document.body.appendChild(host);
    }

    // 2. Init callback must exist on window before the script's ?cb= fires.
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: Object.values(TO_GOOGLE).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
      setIsReady(true);
    };

    // 3. Append the loader script to <head> — outside React's body subtree.
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Belt-and-suspenders banner suppression. CSS hides it, but Google sometimes
  // re-inserts the iframe and re-applies an inline `top: 40px` on <body>; this
  // observer rips both out the moment they appear. Skipped in dev (the widget
  // isn't loaded there, so there's nothing to suppress and the observer just
  // adds DOM-mutation overhead on every HMR update).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const isDev = process.env.NODE_ENV === "development";
    const forceEnabled = process.env.NEXT_PUBLIC_ENABLE_GT_WIDGET === "true";
    if (isDev && !forceEnabled) return;

    const purge = () => {
      // Only the user-visible chrome: banner iframe, hover tooltip. Do NOT
      // touch arbitrary `.skiptranslate iframe` — those are the widget's
      // hidden plumbing; removing them kills translation.
      document.querySelectorAll("iframe.goog-te-banner-frame, .goog-tooltip, #goog-gt-tt").forEach((node) => {
        node.parentNode?.removeChild(node);
      });
      if (document.body.style.top) document.body.style.top = "";
      if (document.body.style.position === "relative") document.body.style.position = "";
    };

    purge();
    const observer = new MutationObserver(purge);
    observer.observe(document.body, { childList: true, subtree: false, attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  // First-visit setup: stored choice wins, otherwise IP geolocation.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = readStored();
    if (stored && SUPPORTED.includes(stored)) {
      setCurrentLanguage(stored);
      return;
    }

    let detected = false;
    try {
      detected = localStorage.getItem(DETECTED_KEY) === "true";
    } catch {
      // ignore
    }
    if (detected) return;

    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const code = COUNTRY_TO_LOCALE[data?.country_code];
        if (code && SUPPORTED.includes(code) && code !== "en") {
          setCurrentLanguage(code);
          writeStored(code);
        }
      })
      .catch(() => {})
      .finally(markDetected);
  }, []);

  // Mirror currentLanguage onto <html dir/lang> so shadcn's logical-property
  // utilities (start/end, ms/me, …) flip for RTL automatically. Runs on every
  // language change including the initial restore from localStorage and the
  // IP-detected first visit.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // When the widget is ready and we have a non-English target, push the
  // selection into the widget. Polls briefly for the .goog-te-combo element.
  useEffect(() => {
    if (!isReady || currentLanguage === "en") return;
    let attempts = 0;
    const id = setInterval(() => {
      attempts += 1;
      if (selectInWidget(currentLanguage) || attempts > 50) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [isReady, currentLanguage]);

  function changeLanguage(code) {
    if (!SUPPORTED.includes(code) || code === currentLanguage) return;
    setCurrentLanguage(code);
    writeStored(code);
    markDetected();
    // Flip <html dir> so shadcn logical-property utilities (start/end, ms/me)
    // mirror for RTL languages.
    if (typeof document !== "undefined") {
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = code;
    }
    if (code === "en") {
      // Reset Google Translate to English source by clearing its cookie + reload.
      clearGoogleTranslateCookie();
      window.location.reload();
      return;
    }
    selectInWidget(code);
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}
