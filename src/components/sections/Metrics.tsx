"use client";

import { useTranslations } from "next-intl";
import SectionTag from "@/components/ui/SectionTag";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedMetric({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  // Parse numeric value, prefix and suffix
  const match = value.match(/^([<>+]?)(\d+)(.*)/);
  const prefix = match?.[1] ?? "";
  const numericValue = parseInt(match?.[2] ?? "0", 10);
  const suffix = match?.[3] ?? "";

  const { ref, count } = useCountUp<HTMLDivElement>({
    end: numericValue,
    duration: 2000,
    delay,
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-orange mb-2 font-heading">
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-white/70 text-sm sm:text-base">{label}</p>
    </div>
  );
}

export default function Metrics() {
  const t = useTranslations("metrics");

  const items = [0, 1, 2, 3].map((i) => ({
    value: t(`items.${i}.value`),
    label: t(`items.${i}.label`),
  }));

  return (
    <section data-testid="metrics" className="bg-navy py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade">
          <div className="text-center mb-12">
            <SectionTag>{t("sectionTag")}</SectionTag>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <AnimatedMetric
              key={i}
              value={item.value}
              label={item.label}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
