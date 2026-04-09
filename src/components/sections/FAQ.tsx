"use client";

import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionTag from "@/components/ui/SectionTag";
import JsonLd from "@/components/seo/JsonLd";

interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ section — visible on homepage + FAQPage JSON-LD for SEO/GEO.
 *
 * - Expandable <details>/<summary> for accessible, semantic markup
 * - Co-located FAQPage schema for Google Rich Results
 * - Data driven from i18n namespace "faq"
 *
 * US-22.10
 */
export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const faqItems: FaqItem[] = Array.isArray(items) ? items : [];

  // JSON-LD FAQPage schema — generated from the same data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding bg-deep">
      <div className="max-w-3xl mx-auto">
        <JsonLd data={faqSchema} />

        <AnimateOnScroll variant="fade-up">
          <div className="mb-16">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight leading-[1.1]">
              {t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <AnimateOnScroll key={idx} variant="fade-up" delay={idx * 60}>
              <details
                className="group border border-white/10 rounded-lg overflow-hidden transition-colors hover:border-accent/30"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-surface font-medium text-[15px] leading-snug select-none">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 text-accent shrink-0 ml-4 transition-transform duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                  {item.a}
                </div>
              </details>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
