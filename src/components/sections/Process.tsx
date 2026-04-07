import { getTranslations } from "next-intl/server";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import StaggerChildren from "@/components/ui/StaggerChildren";

export default async function Process() {
  const t = await getTranslations("process");

  const steps = [0, 1, 2].map((i) => ({
    number: t(`steps.${i}.number`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
    details: [0, 1, 2].map((j) => t(`steps.${i}.details.${j}`)),
  }));

  return (
    <section data-testid="process" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              {t("headline")}
            </h2>
          </div>
        </AnimateOnScroll>

        <StaggerChildren
          staggerDelay={150}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop only) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-orange/30 to-orange/10" />
              )}

              <div className="text-center p-8">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange to-orange-dark text-white text-xl font-bold mb-6 shadow-[var(--shadow-orange-md)]">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex items-center justify-center gap-2 text-sm text-gray-500"
                    >
                      <span className="w-1.5 h-1.5 bg-orange rounded-full shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </StaggerChildren>

        <AnimateOnScroll variant="fade-up" delay={400}>
          <div className="text-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-[var(--shadow-orange-md)] hover:shadow-[var(--shadow-orange-lg)] hover:translate-y-[-2px]"
            >
              {t("cta")}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
