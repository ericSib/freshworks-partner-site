import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";
import { problemIcons } from "@/components/icons/problem-icons";

const colorClasses = [
  "bg-red-50 text-red-600 border-red-100",
  "bg-amber-50 text-amber-600 border-amber-100",
  "bg-blue-50 text-blue-600 border-blue-100",
  "bg-purple-50 text-purple-600 border-purple-100",
];

export default function Problems() {
  const t = useTranslations("problems");

  const cards = [0, 1, 2, 3].map((i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
  }));

  return (
    <section data-testid="problems" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <SectionHeader tag={t("sectionTag")} headline={t("headline")} />
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={100}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg ${colorClasses[i]}`}
            >
              <div className="mb-4">{problemIcons[card.icon]}</div>
              <h3 className="text-lg font-bold mb-2 text-navy">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
