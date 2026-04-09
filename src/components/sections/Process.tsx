"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import SectionTag from "@/components/ui/SectionTag";
import { SECTION_IMAGES } from "@/config/images";

export default function Process() {
  const t = useTranslations("process");

  const steps = [0, 1, 2].map((i) => ({
    number: t(`steps.${i}.number`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    details: [0, 1, 2].map((j) => t(`steps.${i}.details.${j}`)),
    imageAlt: t(`steps.${i}.imageAlt`),
    image: SECTION_IMAGES.process[i],
  }));

  return (
    <section data-testid="process" className="section-padding bg-deep">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-20">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface tracking-tight leading-[1.1]">
              {t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={150}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {steps.map((step, i) => (
            <div key={i}>
              {/* Step image */}
              <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6 group">
                <Image
                  src={step.image.src}
                  alt={step.imageAlt}
                  width={step.image.width}
                  height={step.image.height}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                />
                {/* Dark overlay for cohesion with dark theme */}
                <div className="absolute inset-0 bg-deep/30 group-hover:bg-deep/10 transition-colors duration-500" />
                {/* Accent bottom border glow */}
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              </div>

              <div className="text-[5rem] font-bold text-accent/10 leading-none mb-4 font-heading">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-surface mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
                {step.description}
              </p>
              <ul className="space-y-3">
                {step.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="w-1 h-1 bg-accent rounded-full mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerChildren>

        <AnimateOnScroll variant="fade-up" delay={400}>
          <div className="mt-16 pt-16 border-t border-white/5">
            <a
              href="#contact"
              className="group inline-flex items-center text-accent font-medium hover:text-accent-light transition-colors duration-300"
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
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
