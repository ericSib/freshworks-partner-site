"use client";

import Script from "next/script";
import { useSyncExternalStore, useCallback } from "react";
import { hasConsent, CONSENT_KEY } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Subscribe to consent changes from localStorage + custom events. */
function subscribeToConsent(onStoreChange: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === CONSENT_KEY) onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener("was-consent-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("was-consent-change", onStoreChange);
  };
}

/**
 * Google Analytics 4 — consent-gated loader.
 *
 * Only loads gtag.js when the user has given cookie consent.
 * Uses useSyncExternalStore to react to localStorage changes.
 *
 * US-22.8
 */
export default function GoogleAnalytics() {
  const getSnapshot = useCallback(() => hasConsent(), []);
  const getServerSnapshot = useCallback(() => false, []);

  const consentGranted = useSyncExternalStore(
    subscribeToConsent,
    getSnapshot,
    getServerSnapshot
  );

  if (!GA_ID || !consentGranted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
