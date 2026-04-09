import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import { problemIcons } from "@/components/icons/problem-icons";

export default function Problems() {
  const t = useTranslations("problems");

  const cards = [0, 1, 2, 3].map((i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
  }));

  return (
    <section data-testid="problems" className="section-padding bg-deep-light">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader tag={t("sectionTag")} headline={t("headline")} light />
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={100}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-deep-light p-8 lg:p-10 group hover:bg-deep-lighter transition-colors duration-500"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              <div className="mb-5 text-accent/60 group-hover:text-accent transition-colors duration-500">
                {problemIcons[card.icon]}
              </div>
              <h3 className="text-lg font-semibold text-surface mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
