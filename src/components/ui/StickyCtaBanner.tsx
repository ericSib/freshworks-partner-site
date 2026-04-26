"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CALENDLY_URL } from "@/config/site";
import { trackCalendlyOpened, trackCtaSticky } from "@/lib/analytics";

/**
 * Persistent CTA banner fixed at the bottom of the viewport.
 * Appears after the user has scrolled past the hero section (~600px).
 * Hides when the contact section is in view (avoid double CTA).
 *
 * Per Marketing Guidelines: +18% conversions with a sticky CTA.
 * CTA hierarchy: "Reserver un appel strategie" (primary).
 */
export default function StickyCtaBanner() {
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById("contact");
      const contactTop = contactSection?.getBoundingClientRect().top ?? Infinity;

      // Show after hero, hide when contact is visible
      setVisible(scrollY > 600 && contactTop > 200);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
      aria-hidden={!visible}
      inert={!visible ? true : undefined}
    >
      <div className="bg-deep/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="text-slate-300 text-sm hidden sm:block">
            {t("subheadline").slice(0, 80)}...
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackCtaSticky();
              trackCalendlyOpened("sticky");
            }}
            className="bg-accent hover:bg-accent-light text-deep px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
          >
            {t("ctaPrimary")}
          </a>
        </div>
      </div>
    </div>
  );
}
