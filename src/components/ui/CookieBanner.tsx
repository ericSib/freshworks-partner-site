"use client";

import { useSyncExternalStore, useCallback } from "react";
import { useTranslations } from "next-intl";
import { setConsent, CONSENT_KEY } from "@/lib/analytics";

/**
 * Subscribe to consent key changes — both cross-tab and same-tab.
 *
 * The DOM `storage` event is dispatched by the browser ONLY for changes
 * made in OTHER tabs (MDN spec). Same-tab changes (e.g., the user
 * clicking Accept) never fire `storage` — that's why we also listen to
 * the custom `was-consent-change` event dispatched by the Accept and
 * Decline handlers below (fix US-S20-BUG.1).
 */
const CONSENT_CHANGE_EVENT = "was-consent-change";

function subscribe(onStoreChange: () => void) {
  function onStorage(e: StorageEvent) {
    if (e.key === CONSENT_KEY) onStoreChange();
  }
  function onCustom() {
    onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(CONSENT_CHANGE_EVENT, onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onCustom);
  };
}

/**
 * Minimal GDPR cookie consent banner.
 *
 * - Shows once if no consent decision stored
 * - Stores decision in localStorage (no cookies until consent)
 * - Dispatches custom event for GoogleAnalytics component to pick up
 *
 * US-22.8
 */
export default function CookieBanner() {
  const t = useTranslations("cookies");

  // True if no decision has been stored yet
  const getSnapshot = useCallback(
    () => localStorage.getItem(CONSENT_KEY) === null,
    []
  );
  const getServerSnapshot = useCallback(() => false, []);

  const shouldShow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleAccept() {
    setConsent(true);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  function handleDecline() {
    setConsent(false);
    // Same event on decline — keeps the banner re-render symmetric and
    // lets GoogleAnalytics react if it ever needs to (US-S20-BUG.1).
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  }

  if (!shouldShow) return null;

  return (
    <div
      role="dialog"
      aria-label={t("bannerLabel")}
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="max-w-2xl mx-auto bg-deep-light border border-white/10 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xl">
        <p className="text-sm text-slate-300 flex-1 leading-relaxed">
          {t("message")}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-xs text-slate-400 hover:text-surface transition-colors px-3 py-2"
          >
            {t("decline")}
          </button>
          <button
            onClick={handleAccept}
            className="text-xs font-medium bg-accent text-deep px-4 py-2 rounded-lg hover:bg-accent-light transition-colors"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
