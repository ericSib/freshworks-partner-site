"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";

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
  }));

  const testimonials = [0, 1].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    role: t(`testimonials.${i}.role`),
  }));

  return (
    <section id="case-studies" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader tag={t("sectionTag")} headline={t("headline")} />
        </AnimateOnScroll>

        {/* Case Study Cards — Editorial layout */}
        <StaggerChildren staggerDelay={150} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {cases.map((caseStudy, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-[var(--shadow-lg)] transition-all duration-300"
            >
              {/* Client header bar */}
              <div className="bg-gradient-to-r from-navy to-navy-light px-8 py-4">
                <span className="text-orange font-semibold text-sm uppercase tracking-wider">
                  {caseStudy.client}
                </span>
              </div>

              <div className="p-8">
                {/* Challenge */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      {t("challengeLabel")}
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-8">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      {t("solutionLabel")}
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-8">{caseStudy.solution}</p>
                </div>

                {/* Results — individual metric cards */}
                <div className="grid grid-cols-3 gap-3">
                  {caseStudy.results.map((result, j) => (
                    <div
                      key={j}
                      className="bg-gray-50 rounded-xl p-3 text-center"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-orange font-heading">
                        {result.metric}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 leading-tight">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </StaggerChildren>

        {/* Testimonials — Carousel */}
        <AnimateOnScroll variant="fade-up">
          <TestimonialCarousel testimonials={testimonials} />
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll variant="fade-up" delay={200}>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center text-orange font-semibold hover:text-orange-dark transition-colors"
            >
              {t("cta")}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next, testimonials.length]);

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          aria-live="polite"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial, i) => (
            <div key={i} className="w-full shrink-0 px-4">
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center relative">
                {/* Large quote mark */}
                <div className="text-7xl text-orange/10 font-serif leading-none mb-4">
                  &ldquo;
                </div>

                <blockquote className="text-gray-700 italic text-lg sm:text-xl leading-relaxed mb-8">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-navy">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-orange w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
