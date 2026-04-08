"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import { SECTION_IMAGES } from "@/config/images";

export default function CaseStudies() {
  const t = useTranslations("caseStudies");

  const cases = [0, 1].map((i) => ({
    client: t(`cases.${i}.client`),
    challenge: t(`cases.${i}.challenge`),
    solution: t(`cases.${i}.solution`),
    results: [0, 1, 2].map((j) => ({
      metric: t(`cases.${i}.results.${j}.metric`),
      label: t(`cases.${i}.results.${j}.label`),
    })),
    imageAlt: t(`cases.${i}.imageAlt`),
    image: SECTION_IMAGES.caseStudies[i],
  }));

  const testimonials = [0, 1].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    role: t(`testimonials.${i}.role`),
  }));

  return (
    <section id="case-studies" className="section-padding bg-deep">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader tag={t("sectionTag")} headline={t("headline")} light />
        </AnimateOnScroll>

        {/* Case Study Cards */}
        <StaggerChildren staggerDelay={150} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {cases.map((caseStudy, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl overflow-hidden hover:border-accent/10 transition-colors duration-500 group"
            >
              {/* Case study image header */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={caseStudy.image.src}
                  alt={caseStudy.imageAlt}
                  width={caseStudy.image.width}
                  height={caseStudy.image.height}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                />
                {/* Gradient overlay — maintains dark theme cohesion */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
                {/* Client label overlaid on image */}
                <div className="absolute bottom-0 inset-x-0 px-8 py-5">
                  <span className="text-accent text-sm font-medium tracking-wider uppercase">
                    {caseStudy.client}
                  </span>
                </div>
              </div>

              <div className="p-8">
                {/* Challenge */}
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    {t("challengeLabel")}
                  </h4>
                  <p className="text-slate-300 text-[15px] leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-8">
                  <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    {t("solutionLabel")}
                  </h4>
                  <p className="text-slate-300 text-[15px] leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4">
                  {caseStudy.results.map((result, j) => (
                    <div key={j} className="text-center">
                      <div className="text-2xl font-semibold text-accent font-heading mb-1">
                        {result.metric}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>

        {/* Testimonials */}
        <AnimateOnScroll variant="fade-up">
          <TestimonialCarousel testimonials={testimonials} />
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={200}>
          <div className="mt-12">
            <a
              href="#contact"
              className="group inline-flex items-center text-accent text-sm font-medium hover:text-accent-light transition-colors duration-300"
            >
              {t("cta")}
              <svg className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

function TestimonialCarousel({
  testimonials,
}: {
  testimonials: { quote: string; author: string; role: string }[];
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next, testimonials.length]);

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transitionTimingFunction: "var(--ease-spring)",
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div key={i} className="w-full shrink-0 px-4">
              <div className="text-center">
                <blockquote className="text-slate-300 italic text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-medium text-surface text-sm">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                i === current
                  ? "bg-accent w-8"
                  : "bg-white/10 w-4 hover:bg-white/20"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
