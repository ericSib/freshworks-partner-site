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

const COMPANY_SIZE_OPTIONS = [
  "1-10",
  "11-50",
  "51-200",
  "201-1000",
  "1001-5000",
  "5000+",
] as const;

const INDUSTRY_OPTIONS = [
  "technology",
  "finance",
  "healthcare",
  "retail",
  "manufacturing",
  "education",
  "services",
  "other",
] as const;

const ROLE_OPTIONS = [
  "executive",
  "director",
  "manager",
  "analyst",
  "specialist",
  "consultant",
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
    "w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all appearance-none font-body";

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-surface tracking-tight mb-8">
        {t("quiz.demographics.title")}
      </h2>

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
              {t("quiz.demographics.companySizePlaceholder")}
            </option>
            {COMPANY_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size} className="text-slate-900">
                {t(`quiz.demographics.companySizeOptions.${size}`)}
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
              {t("quiz.demographics.industryPlaceholder")}
            </option>
            {INDUSTRY_OPTIONS.map((industry) => (
              <option key={industry} value={industry} className="text-slate-900">
                {t(`quiz.demographics.industryOptions.${industry}`)}
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
              {t("quiz.demographics.rolePlaceholder")}
            </option>
            {ROLE_OPTIONS.map((role) => (
              <option key={role} value={role} className="text-slate-900">
                {t(`quiz.demographics.roleOptions.${role}`)}
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
          {t("quiz.demographics.startButton")}
        </button>
      </div>
    </div>
  );
}
