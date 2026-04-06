import { useTranslations } from "next-intl";
import SectionTag from "@/components/ui/SectionTag";

export default function CaseStudies() {
  const t = useTranslations("caseStudies");

  const cases = [0, 1].map((i) => ({
    client: t(`cases.${i}.client`),
    challenge: t(`cases.${i}.challenge`),
    solution: t(`cases.${i}.solution`),
    results: [0, 1, 2].map((j) => ({
      metric: t(`cases.${i}.results.${j}.metric`),
      label: t(`cases.${i}.results.${j}.label`),
    })),
  }));

  const testimonials = [0, 1].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    role: t(`testimonials.${i}.role`),
  }));

  return (
    <section id="case-studies" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionTag>{t("sectionTag")}</SectionTag>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
            {t("headline")}
          </h2>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {cases.map((cs, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-sm text-orange font-semibold mb-2 uppercase tracking-wider">
                {cs.client}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Défi
                  </h4>
                  <p className="text-gray-700">{cs.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Solution
                  </h4>
                  <p className="text-gray-700">{cs.solution}</p>
                </div>
              </div>

              {/* Results metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {cs.results.map((result, j) => (
                  <div key={j} className="text-center">
                    <div className="text-2xl font-bold text-orange font-[family-name:var(--font-heading)]">
                      {result.metric}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-6 text-6xl text-orange/15 font-serif leading-none">
                &ldquo;
              </div>

              <blockquote className="text-gray-700 italic mb-6 relative z-10 text-lg leading-relaxed">
                &ldquo;{test.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange to-orange-dark flex items-center justify-center text-white font-bold text-lg">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy">{test.author}</div>
                  <div className="text-sm text-gray-500">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
