"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CALENDLY_URL } from "@/config/site";
import { trackCalendlyOpened, trackCtaHero } from "@/lib/analytics";

interface ServicePageContentProps {
  slug:
    | "freshservice"
    | "freshdesk"
    | "migration"
    | "freddy-ai"
    | "audit-optimisation";
  priceFrom: number;
  locale: string;
}

/**
 * Dedicated service page content (US-S20-2).
 *
 * Scroll-narrative aligned with homepage rhythm but condensed for SEO
 * landing pages — picks up where the homepage Services card stops.
 *
 * Sections (data via i18n namespace `services.detail.<slug>`) :
 *   1. Hero — H1 SEO + intro + 2 CTAs
 *   2. Problems — 3 pain points specific to this service
 *   3. Approach — 4 steps (Discover/Implement/Optimize/Scale)
 *   4. Benefits — 4 metrics chiffres (citing Forrester TEI 2024)
 *   5. Pricing — "à partir de X €" (D15)
 *   6. FAQ — 6 Q/A specific (also injected as FAQPage JSON-LD by page.tsx)
 *   7. Final CTA — Calendly + back to home
 */
export default function ServicePageContent({
  slug,
  priceFrom,
  locale,
}: ServicePageContentProps) {
  const t = useTranslations(`services.detail.${slug}`);
  const tCommon = useTranslations("services.common");

  const priceFormatter = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <article className="bg-deep text-surface">
      {/* ── 1. Hero ───────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-6">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            {t("hero.h1")}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaHero("primary");
                trackCalendlyOpened("hero");
              }}
              className="inline-flex items-center justify-center bg-accent text-deep px-8 py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)]"
            >
              {t("hero.ctaPrimary")}
            </a>
            <Link
              href="/quiz"
              onClick={() => trackCtaHero("secondary")}
              className="inline-flex items-center justify-center border border-white/10 text-surface/80 px-8 py-4 rounded-lg text-base font-medium hover:border-accent/30 hover:text-accent transition-all duration-300"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            {t("hero.trust")}
          </p>
        </div>
      </section>

      {/* ── 2. Problems agitation ─────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12 max-w-2xl">
            {t("problems.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-deep-light/40 border border-white/5 rounded-2xl p-6"
              >
                <p className="text-accent text-xs uppercase tracking-wide mb-3">
                  {t(`problems.p${n}.label`)}
                </p>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`problems.p${n}.title`)}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t(`problems.p${n}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Approach 4 steps ───────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t("approach.title")}
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            {t("approach.subtitle")}
          </p>
          <ol className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <li
                key={n}
                className="flex gap-4 bg-deep-light/30 border border-white/5 rounded-2xl p-6"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent text-deep flex items-center justify-center font-semibold">
                  {n}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">
                    {t(`approach.step${n}.title`)}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {t(`approach.step${n}.body`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. Benefits chiffres ──────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t("benefits.title")}
          </h2>
          <p className="text-slate-400 mb-12 max-w-3xl">
            {t("benefits.subtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-deep-light/30 border border-white/5 rounded-2xl p-6 text-center"
              >
                <p className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-2">
                  {t(`benefits.metric${n}.value`)}
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  {t(`benefits.metric${n}.label`)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400 italic">
            {t("benefits.source")}
          </p>
        </div>
      </section>

      {/* ── 5. Pricing ────────────────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-slate-400 mb-8">{t("pricing.subtitle")}</p>
          <div className="inline-flex flex-col items-center bg-deep-light/40 border border-accent/20 rounded-2xl px-10 py-8">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
              {tCommon("priceFromLabel")}
            </p>
            <p className="text-5xl font-heading font-bold text-accent mb-1">
              {priceFormatter.format(priceFrom)}
            </p>
            <p className="text-sm text-slate-400">{t("pricing.unit")}</p>
            <p className="mt-4 text-xs text-slate-400 max-w-xs">
              {t("pricing.note")}
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">
            {t("faq.title")}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <details
                key={n}
                className="group bg-deep-light/30 border border-white/5 rounded-xl p-5 open:border-accent/20"
              >
                <summary className="flex justify-between items-start cursor-pointer list-none">
                  <h3 className="text-base font-semibold pr-4">
                    {t(`faq.q${n}`)}
                  </h3>
                  <span className="shrink-0 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                  {t(`faq.a${n}`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Final CTA ──────────────────────────────────────────── */}
      <section className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCalendlyOpened("results")}
              className="inline-flex items-center justify-center bg-accent text-deep px-8 py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)]"
            >
              {t("cta.primary")}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center text-surface/70 px-6 py-4 rounded-lg text-base font-medium hover:text-accent transition-colors"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
