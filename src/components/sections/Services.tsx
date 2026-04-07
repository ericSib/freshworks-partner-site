import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import CheckIcon from "@/components/ui/CheckIcon";
import { serviceIcons } from "@/components/icons/service-icons";

export default async function Services() {
  const t = await getTranslations("services");

  const cards = [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
    price: t(`cards.${i}.price`),
    badge: t(`cards.${i}.badge`),
    features: [0, 1, 2, 3].map((j) => t(`cards.${i}.features.${j}`)),
  }));

  return (
    <section id="services" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader
            tag={t("sectionTag")}
            headline={t("headline")}
            subheadline={t("subheadline")}
          />
        </AnimateOnScroll>

        {/* 3x2 bento grid */}
        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep/5 rounded-xl overflow-hidden mb-px"
        >
          {cards.slice(0, 3).map((card, i) => (
            <ServiceCard key={i} card={card} />
          ))}
        </StaggerChildren>

        <StaggerChildren
          staggerDelay={80}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep/5 rounded-xl overflow-hidden"
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
      className="relative bg-surface p-8 lg:p-10 group hover:bg-surface-dim transition-colors duration-500 flex flex-col"
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      {isRecommended && (
        <div className="absolute top-6 right-6">
          <span className="text-[11px] font-medium uppercase tracking-wider text-accent">
            {card.badge}
          </span>
        </div>
      )}

      <div className="w-10 h-10 text-accent/60 mb-6 group-hover:text-accent transition-colors duration-500">
        {serviceIcons[card.icon]}
      </div>

      <h3 className="text-lg font-semibold text-deep mb-3 tracking-tight">
        {card.title}
      </h3>

      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
        {card.description}
      </p>

      <ul className="space-y-2 mb-6">
        {card.features.map((feature, j) => (
          <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
            <CheckIcon className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="pt-5 border-t border-deep/5">
        <span className="text-base font-semibold text-deep font-heading">
          {card.price}
        </span>
      </div>
    </div>
  );
}
