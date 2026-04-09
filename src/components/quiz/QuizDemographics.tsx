"use client";

type Demographics = {
  companySize: string;
  industry: string;
  role: string;
};

type QuizDemographicsProps = {
  demographics: Demographics;
  onChangeDemographic: (field: keyof Demographics, value: string) => void;
  onStart: () => void;
  t: (key: string) => string;
};

/** Keys matching quiz.demographics.size.* in the i18n JSON. */
const SIZE_KEYS = [
  "50_199",
  "200_499",
  "500_999",
  "1000_2000",
  "2000_plus",
] as const;

/** Keys matching quiz.demographics.industries.* in the i18n JSON. */
const INDUSTRY_KEYS = [
  "tech",
  "finance",
  "healthcare",
  "manufacturing",
  "retail",
  "education",
  "government",
  "services",
  "telecom",
  "other",
] as const;

/** Keys matching quiz.demographics.roles.* in the i18n JSON. */
const ROLE_KEYS = [
  "itDirector",
  "supportDirector",
  "operations",
  "other",
] as const;

export default function QuizDemographics({
  demographics,
  onChangeDemographic,
  onStart,
  t,
}: QuizDemographicsProps) {
  const isComplete =
    demographics.companySize !== "" &&
    demographics.industry !== "" &&
    demographics.role !== "";

  const selectClasses =
    "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all appearance-none";

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-surface tracking-tight mb-3">
        {t("quiz.demographics.title")}
      </h2>
      <p className="text-slate-400 text-sm mb-8">
        {t("quiz.demographics.subtitle")}
      </p>

      <div className="space-y-6">
        {/* Company size */}
        <div>
          <label
            htmlFor="quiz-company-size"
            className="block text-slate-400 text-sm font-medium mb-2"
          >
            {t("quiz.demographics.companySize")}
          </label>
          <select
            id="quiz-company-size"
            value={demographics.companySize}
            onChange={(e) =>
              onChangeDemographic("companySize", e.target.value)
            }
            className={selectClasses}
          >
            <option value="" disabled className="text-slate-900">
              —
            </option>
            {SIZE_KEYS.map((key) => (
              <option key={key} value={key} className="text-slate-900">
                {t(`quiz.demographics.size.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label
            htmlFor="quiz-industry"
            className="block text-slate-400 text-sm font-medium mb-2"
          >
            {t("quiz.demographics.industry")}
          </label>
          <select
            id="quiz-industry"
            value={demographics.industry}
            onChange={(e) =>
              onChangeDemographic("industry", e.target.value)
            }
            className={selectClasses}
          >
            <option value="" disabled className="text-slate-900">
              —
            </option>
            {INDUSTRY_KEYS.map((key) => (
              <option key={key} value={key} className="text-slate-900">
                {t(`quiz.demographics.industries.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="quiz-role"
            className="block text-slate-400 text-sm font-medium mb-2"
          >
            {t("quiz.demographics.role")}
          </label>
          <select
            id="quiz-role"
            value={demographics.role}
            onChange={(e) => onChangeDemographic("role", e.target.value)}
            className={selectClasses}
          >
            <option value="" disabled className="text-slate-900">
              —
            </option>
            {ROLE_KEYS.map((key) => (
              <option key={key} value={key} className="text-slate-900">
                {t(`quiz.demographics.roles.${key}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Start button */}
        <button
          type="button"
          onClick={onStart}
          disabled={!isComplete}
          className="w-full bg-accent text-deep py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          {t("quiz.demographics.start")}
        </button>
      </div>
    </div>
  );
}
