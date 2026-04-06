import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import CheckIcon from "@/components/ui/CheckIcon";
import { serviceIcons } from "@/components/icons/service-icons";

export default function Services() {
  const t = useTranslations("services");

  const cards = [0, 1, 2, 3, 4, 5].map((i) => ({
    icon: t(`cards.${i}.icon`),
    title: t(`cards.${i}.title`),
    description: t(`cards.${i}.description`),
    price: t(`cards.${i}.price`),
    features: [0, 1, 2, 3].map((j) => t(`cards.${i}.features.${j}`)),
  }));

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag={t("sectionTag")}
          headline={t("headline")}
          subheadline={t("subheadline")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl border border-gray-200 bg-white hover:border-orange/30 hover:shadow-xl hover:shadow-orange/5 transition-all duration-300 hover:translate-y-[-4px] flex flex-col"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-orange/10 text-orange rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors">
                {serviceIcons[card.icon]}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-navy mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                {card.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {card.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
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
          ))}
        </div>
      </div>
    </section>
  );
}
