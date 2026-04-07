"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionTag from "@/components/ui/SectionTag";

export default function About() {
  const t = useTranslations("about");

  const credentials = [0, 1, 2, 3, 4].map((i) => t(`credentials.${i}`));

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Photo — 2 cols */}
          <AnimateOnScroll variant="fade" className="lg:col-span-2">
            <div className="relative">
              <Image
                src="/images/eric-sib.png"
                alt={t("name")}
                width={400}
                height={480}
                className="rounded-xl object-cover w-full max-w-sm mx-auto lg:mx-0"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+"
                priority
              />
            </div>
          </AnimateOnScroll>

          {/* Bio — 3 cols */}
          <AnimateOnScroll variant="fade-up" delay={150} className="lg:col-span-3">
            <SectionTag>{t("sectionTag")}</SectionTag>

            <h3 className="text-2xl font-bold text-deep mb-1 tracking-tight">
              {t("name")}
            </h3>
            <p className="text-accent font-medium text-sm mb-8">{t("role")}</p>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
              {t("bio")}
            </p>

            {/* Credentials — minimal inline */}
            <div className="flex flex-wrap gap-3 mb-10">
              {credentials.map((cred, i) => (
                <span
                  key={i}
                  className="text-xs font-medium text-slate-500 px-3 py-2 border border-deep/10 rounded"
                >
                  {cred}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center bg-deep text-surface px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-deep-light transition-all duration-300"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              {t("cta")}
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
