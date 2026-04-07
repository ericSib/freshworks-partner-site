"use client";

import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionTag from "@/components/ui/SectionTag";
import StaggerChildren from "@/components/ui/StaggerChildren";

export default function TechStack() {
  const t = useTranslations("techStack");

  const categories = [0, 1, 2, 3].map((i) => ({
    label: t(`categories.${i}.label`),
    items: [0, 1, 2, 3].map((j) => t(`categories.${i}.items.${j}`)),
  }));

  return (
    <section className="section-padding bg-deep-light">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-20">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface tracking-tight leading-[1.1] mb-5">
              {t("headline")}
            </h2>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              {t("subheadline")}
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={100}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden"
        >
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-deep-light p-8 group hover:bg-deep-lighter transition-colors duration-500"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-6">
                {cat.label}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-slate-300 text-sm font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
