"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import CheckIcon from "@/components/ui/CheckIcon";
import { serviceIcons } from "@/components/icons/service-icons";

export default function Services() {
  const t = useTranslations("services");

  const cards = [0, 1, 2, 3, 4].map((i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
    price: t(`cards.${i}.price`),
    badge: t(`cards.${i}.badge`),
    features: [0, 1, 2, 3].map((j) => t(`cards.${i}.features.${j}`)),
  }));

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader
            tag={t("sectionTag")}
            headline={t("headline")}
            subheadline={t("subheadline")}
          />
        </AnimateOnScroll>

        {/* Top row: 3 cards */}
        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {cards.slice(0, 3).map((card, i) => (
            <ServiceCard key={i} card={card} />
          ))}
        </StaggerChildren>

        {/* Bottom row: 2 cards centered */}
        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {cards.slice(3).map((card, i) => (
            <ServiceCard key={i + 3} card={card} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function ServiceCard({
  card,
}: {
  card: {
    icon: string;
    title: string;
    description: string;
    price: string;
    badge: string;
    features: string[];
  };
}) {
  const isRecommended = card.badge !== "";

  return (
    <div
      className={`group relative p-8 rounded-2xl border bg-white hover:shadow-xl hover:shadow-orange/5 transition-all duration-300 hover:translate-y-[-4px] flex flex-col ${
        isRecommended
          ? "border-orange/40 ring-1 ring-orange/20"
          : "border-gray-200 hover:border-orange/30"
      }`}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-orange text-white text-xs font-semibold px-4 py-1 rounded-full shadow-[var(--shadow-orange-sm)]">
            {card.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="w-14 h-14 bg-orange/10 text-orange rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
        {serviceIcons[card.icon]}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
        {card.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {card.features.map((feature, j) => (
          <li
            key={j}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <CheckIcon className="w-4 h-4 text-orange mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="pt-4 border-t border-gray-100">
        <span className="text-lg font-bold text-navy font-heading">
          {card.price}
        </span>
      </div>
    </div>
  );
}
