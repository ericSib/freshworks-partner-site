"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import CheckIcon from "@/components/ui/CheckIcon";
import { serviceIcons } from "@/components/icons/service-icons";
import { OFFERS, PREMIUM_OFFERS, IMPLEMENT_OFFERS, RECURRING_OFFERS } from "@/config/offers";
import { SECTION_IMAGES } from "@/config/images";

export default function Services() {
  const t = useTranslations("services");

  const cards = OFFERS.map((_offer, i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
    price: t(`cards.${i}.price`),
    badge: t(`cards.${i}.badge`),
    features: [0, 1, 2, 3].map((j) => t(`cards.${i}.features.${j}`)),
  }));

  const premiumCards = cards.slice(0, PREMIUM_OFFERS.length);
  const implementCards = cards.slice(
    PREMIUM_OFFERS.length,
    PREMIUM_OFFERS.length + IMPLEMENT_OFFERS.length
  );
  const recurringCards = cards.slice(
    PREMIUM_OFFERS.length + IMPLEMENT_OFFERS.length
  );

  return (
    <section id="services" className="bg-surface">
      {/* Panoramic header image — full-bleed */}
      <AnimateOnScroll variant="fade">
        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
          <Image
            src={SECTION_IMAGES.services.src}
            alt={t("imageAlt")}
            width={SECTION_IMAGES.services.width}
            height={SECTION_IMAGES.services.height}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-transparent to-surface" />
          <div className="absolute inset-0 bg-surface/20" />
        </div>
      </AnimateOnScroll>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-24 lg:pb-32">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader
            tag={t("sectionTag")}
            headline={t("headline")}
            subheadline={t("subheadline")}
          />
        </AnimateOnScroll>

        {/* ── Premium tier (dark cards, complexity-first) ──────────── */}
        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep/5 rounded-xl overflow-hidden mb-6"
        >
          {premiumCards.map((card, i) => (
            <ServiceCard key={i} card={card} variant="premium" />
          ))}
        </StaggerChildren>

        {/* ── Implement tier (light cards) ─────────────────────────── */}
        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-deep/5 rounded-xl overflow-hidden mb-6"
        >
          {implementCards.map((card, i) => (
            <ServiceCard key={i + PREMIUM_OFFERS.length} card={card} variant="implement" />
          ))}
        </StaggerChildren>

        {/* ── Recurring tier (accent band) ─────────────────────────── */}
        {recurringCards.map((card, i) => (
          <AnimateOnScroll key={i + PREMIUM_OFFERS.length + IMPLEMENT_OFFERS.length} variant="fade-up">
            <div className="bg-deep rounded-xl p-8 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 text-accent">
                    {serviceIcons[card.icon]}
                  </div>
                  <h3 className="text-xl font-semibold text-surface font-heading">
                    {card.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xl">
                  {card.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {card.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckIcon className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <span className="text-2xl font-bold text-surface font-heading">
                  {card.price}
                </span>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  card,
  variant,
}: {
  card: {
    icon: string;
    title: string;
    description: string;
    price: string;
    badge: string;
    features: string[];
  };
  variant: "premium" | "implement";
}) {
  const hasBadge = card.badge !== "";
  const isPremium = variant === "premium";

  return (
    <div
      className={`relative p-8 lg:p-10 group transition-colors duration-500 flex flex-col ${
        isPremium
          ? "bg-deep text-surface hover:bg-deep/90"
          : "bg-surface hover:bg-surface-dim"
      }`}
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      {hasBadge && (
        <div className="absolute top-6 right-6">
          <span
            className={`text-[11px] font-medium uppercase tracking-wider ${
              isPremium ? "text-accent" : "text-accent"
            }`}
          >
            {card.badge}
          </span>
        </div>
      )}

      <div
        className={`w-10 h-10 mb-6 transition-colors duration-500 ${
          isPremium
            ? "text-accent/80 group-hover:text-accent"
            : "text-accent/60 group-hover:text-accent"
        }`}
      >
        {serviceIcons[card.icon]}
      </div>

      <h3
        className={`text-lg font-semibold mb-3 tracking-tight ${
          isPremium ? "text-surface" : "text-deep"
        }`}
      >
        {card.title}
      </h3>

      <p
        className={`text-sm leading-relaxed mb-6 flex-1 ${
          isPremium ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {card.description}
      </p>

      <ul className="space-y-2 mb-6">
        {card.features.map((feature, j) => (
          <li
            key={j}
            className={`flex items-start gap-2.5 text-sm ${
              isPremium ? "text-slate-300" : "text-slate-600"
            }`}
          >
            <CheckIcon className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div
        className={`pt-5 border-t ${
          isPremium ? "border-white/10" : "border-deep/5"
        }`}
      >
        <span
          className={`text-base font-semibold font-heading ${
            isPremium ? "text-surface" : "text-deep"
          }`}
        >
          {card.price}
        </span>
      </div>
    </div>
  );
}
