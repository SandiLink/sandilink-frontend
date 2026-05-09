"use client";

import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    // Only register in production or when explicitly enabled
    const isEnabled =
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_ENABLE_SW === "true";

    if (!isEnabled) {
      // In dev, actively unregister any leftover SW from a prior production
      // build — otherwise the browser keeps serving cached pages and 404s
      // from a previously-broken state. Also wipe the SW caches so HMR
      // updates aren't shadowed by a stale chunk.
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
      if (typeof caches !== "undefined") {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.info("[sw] Service worker registered");

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          newWorker?.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.info("[sw] New version available — refresh to update");
              // Integrate with useUIStore to show an update banner/toast
            }
          });
        });
      })
      .catch((error) => {
        console.error("[sw] Registration failed:", error);
      });

    // Detect when a new service worker takes control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.info("[sw] New service worker activated");
    });
  }, []);

  return null;
}
