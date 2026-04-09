"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import SectionTag from "@/components/ui/SectionTag";
import { productIcons } from "@/components/icons/product-icons";
import { SECTION_IMAGES } from "@/config/images";

export default function FreshworksProducts() {
  const t = useTranslations("freshworksProducts");

  const cards = [0, 1, 2].map((i) => ({
    title: t(`cards.${i}.title`),
    subtitle: t(`cards.${i}.subtitle`),
    description: t(`cards.${i}.description`),
    imageAlt: t(`cards.${i}.imageAlt`),
    image: SECTION_IMAGES.freshworksProducts[i],
  }));

  return (
    <section data-testid="freshworks-products" className="section-padding bg-deep-light">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-20">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight leading-[1.1]">
              {t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={120}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="group bg-deep-light hover:bg-deep-lighter transition-colors duration-500 overflow-hidden"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              {/* Product image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.imageAlt}
                  width={card.image.width}
                  height={card.image.height}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-light via-deep-light/20 to-transparent" />
              </div>

              <div className="p-8 lg:p-10">
                <div className="w-10 h-10 text-accent/50 mb-6 group-hover:text-accent transition-colors duration-500">
                  {productIcons[card.title]}
                </div>
                <h3 className="text-lg font-semibold text-surface mb-1 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-accent text-sm font-medium mb-4">
                  {card.subtitle}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </StaggerChildren>

        <AnimateOnScroll variant="fade-up" delay={300}>
          <div className="mt-10">
            <a
              href="#services"
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
