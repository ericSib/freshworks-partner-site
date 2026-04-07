"use client";

import { useTranslations } from "next-intl";
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
    <div ref={ref} className="text-center py-8 lg:py-12">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-light text-deep mb-3 font-heading tracking-tight">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="w-6 h-[1px] bg-accent mx-auto mb-3" />
      <p className="text-slate-500 text-sm">{label}</p>
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
    <section className="bg-surface py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-deep/10">
            {items.map((item, i) => (
              <AnimatedMetric
                key={i}
                value={item.value}
                label={item.label}
                delay={i * 150}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
