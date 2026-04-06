"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const CERT_BADGES = [
  { key: 0, color: "bg-blue-50 text-blue-700 border-blue-200" },
  { key: 1, color: "bg-purple-50 text-purple-700 border-purple-200" },
  { key: 2, color: "bg-green-50 text-green-700 border-green-200" },
  { key: 3, color: "bg-amber-50 text-amber-700 border-amber-200" },
  { key: 4, color: "bg-orange/10 text-orange border-orange/20" },
];

export default function About() {
  const t = useTranslations("about");

  const credentials = [0, 1, 2, 3, 4].map((i) => t(`credentials.${i}`));

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader tag={t("sectionTag")} headline={t("headline")} />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <AnimateOnScroll variant="fade-right" className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange/20 to-navy/10 rounded-2xl blur-xl" />
              <Image
                src="/images/eric-sib.png"
                alt={t("name")}
                width={400}
                height={480}
                className="relative rounded-2xl shadow-2xl object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
                priority
              />
            </div>
          </AnimateOnScroll>

          {/* Bio */}
          <AnimateOnScroll variant="fade-left" delay={150}>
            <h3 className="text-2xl font-bold text-navy mb-1">
              {t("name")}
            </h3>
            <p className="text-orange font-semibold mb-6">{t("role")}</p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {t("bio")}
            </p>

            {/* Credential badges — visual style */}
            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((cred, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium ${CERT_BADGES[i].color}`}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  {cred}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-[var(--shadow-orange-md)] hover:shadow-[var(--shadow-orange-lg)] hover:translate-y-[-2px]"
            >
              {t("cta")}
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
