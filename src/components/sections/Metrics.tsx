import { useTranslations } from "next-intl";
import SectionTag from "@/components/ui/SectionTag";

export default function Metrics() {
  const t = useTranslations("metrics");

  const items = [0, 1, 2, 3].map((i) => ({
    value: t(`items.${i}.value`),
    label: t(`items.${i}.label`),
  }));

  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionTag>{t("sectionTag")}</SectionTag>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-orange mb-2 font-heading">
                {item.value}
              </div>
              <p className="text-white/70 text-sm sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
