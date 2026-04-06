"use client";

import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  Freshservice: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.204-.107-.397.165-.71.505-.78.929l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Freshdesk: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
  "Freddy AI": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

export default function FreshworksProducts() {
  const t = useTranslations("freshworksProducts");

  const cards = [0, 1, 2].map((i) => ({
    title: t(`cards.${i}.title`),
    subtitle: t(`cards.${i}.subtitle`),
    description: t(`cards.${i}.description`),
  }));

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">
              {t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={120}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="w-14 h-14 bg-orange/10 text-orange rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                {PRODUCT_ICONS[card.title]}
              </div>
              <h3 className="text-xl font-bold text-navy mb-1">
                {card.title}
              </h3>
              <p className="text-orange text-sm font-semibold mb-3">
                {card.subtitle}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </StaggerChildren>

        <AnimateOnScroll variant="fade-up" delay={300}>
          <div className="text-center mt-10">
            <a
              href="#services"
              className="text-orange font-semibold hover:text-orange-dark transition-colors"
            >
              {t("cta")}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
