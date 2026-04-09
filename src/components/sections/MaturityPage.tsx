import SectionTag from "@/components/ui/SectionTag";

type Props = {
  sectionTag: string;
  headline: string;
  intro: string;
  problemsTitle: string;
  problems: string[];
  recommendationsTitle: string;
  recommendations: string[];
  cta: string;
  timeframe: string;
  segment: string;
  locale: string;
};

/**
 * Maturity level landing page template.
 *
 * Reusable for all 10 pages (5 ITSM + 5 CX levels).
 * Content is fully driven by i18n props — zero hardcoded text.
 *
 * US-18.7a
 */
export default function MaturityPage({
  sectionTag,
  headline,
  intro,
  problemsTitle,
  problems,
  recommendationsTitle,
  recommendations,
  cta,
  timeframe,
  segment,
  locale,
}: Props) {
  const accentColor = segment === "itsm" ? "text-accent" : "text-blue-400";

  return (
    <article className="bg-deep min-h-[100dvh] pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <SectionTag>{sectionTag}</SectionTag>
          <h1 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight leading-[1.1] mb-6">
            {headline}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Problems */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-surface mb-5">
            {problemsTitle}
          </h2>
          <ul className="space-y-3">
            {problems.map((problem, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                {problem}
              </li>
            ))}
          </ul>
        </div>

        <div className="premium-rule mb-12" />

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-surface mb-5">
            {recommendationsTitle}
          </h2>
          <ol className="space-y-3">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                <span className={`font-bold ${accentColor} mt-0.5 shrink-0`}>
                  {i + 1}.
                </span>
                {rec}
              </li>
            ))}
          </ol>
        </div>

        {/* Timeframe + CTA */}
        <div className="bg-deep-light border border-white/10 rounded-xl p-8 text-center">
          <p className={`text-sm font-medium ${accentColor} mb-4`}>
            {timeframe}
          </p>
          <a
            href={`/${locale}#contact`}
            className="inline-flex items-center bg-accent text-deep px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-accent-light transition-all duration-300"
          >
            {cta}
          </a>
        </div>
      </div>
    </article>
  );
}
