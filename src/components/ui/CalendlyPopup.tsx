"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CALENDLY_URL } from "@/config/site";
import { trackCalendlyOpened } from "@/lib/analytics";

interface CalendlyPopupProps {
  /** Label displayed on the trigger button. */
  label: string;
  /** Fallback label shown while the script loads or if it fails. */
  fallbackLabel: string;
  /** Prefill visitor name in the Calendly form. */
  name?: string;
  /** Prefill visitor email in the Calendly form. */
  email?: string;
}

/**
 * Renders a CTA button that opens the Calendly popup widget on click.
 *
 * - The Calendly script is loaded lazily (`afterInteractive` with manual init).
 * - If the script hasn't loaded yet, falls back to a direct link (new tab).
 * - Prefills name & email from the contact form submission.
 */
export default function CalendlyPopup({
  label,
  fallbackLabel,
  name,
  email,
}: CalendlyPopupProps) {
  const [scriptReady, setScriptReady] = useState(false);
  const attemptedOpen = useRef(false);

  const openPopup = useCallback(() => {
    const Calendly = (window as unknown as Record<string, unknown>)
      .Calendly as
      | { initPopupWidget?: (opts: Record<string, unknown>) => void }
      | undefined;

    if (Calendly?.initPopupWidget) {
      Calendly.initPopupWidget({
        url: CALENDLY_URL,
        prefill: {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
        },
      });
      trackCalendlyOpened("contact");
      return true;
    }
    return false;
  }, [name, email]);

  // If script loads after user already clicked, open automatically.
  useEffect(() => {
    if (scriptReady && attemptedOpen.current) {
      openPopup();
      attemptedOpen.current = false;
    }
  }, [scriptReady, openPopup]);

  const handleClick = () => {
    if (!openPopup()) {
      // Script not ready yet — mark for auto-open when it loads.
      attemptedOpen.current = true;
    }
  };

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
      {/* Calendly CSS loaded via next/script to avoid <link> in body */}
      <Script
        id="calendly-css"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            if (!document.getElementById('calendly-widget-css')) {
              var link = document.createElement('link');
              link.id = 'calendly-widget-css';
              link.rel = 'stylesheet';
              link.href = 'https://assets.calendly.com/assets/external/widget.css';
              document.head.appendChild(link);
            }
          `,
        }}
      />

      {scriptReady ? (
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light active:scale-[0.98] transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)]"
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {label}
        </button>
      ) : (
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light active:scale-[0.98] transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)]"
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {fallbackLabel}
        </a>
      )}
    </>
  );
}
