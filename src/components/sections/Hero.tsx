import { useTranslations } from "next-intl";
import SectionTag from "@/components/ui/SectionTag";

export default function Hero() {
  const t = useTranslations("hero");
  const certs = useTranslations("certifications");

  const certList = ["itil", "prince2", "psm", "pspo", "freshworks"] as const;

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p className="text-orange font-semibold text-lg mb-4 font-[family-name:var(--font-heading)]">
            {t("tagline")}
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-[family-name:var(--font-heading)]">
            {t("headline")}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-lg shadow-orange/30 hover:shadow-orange/50 hover:translate-y-[-2px]"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          {/* Trust bar */}
          <div>
            <p className="text-white/50 text-sm uppercase tracking-wider mb-4">
              {t("trustedBy")}
            </p>
            <div className="flex flex-wrap gap-3">
              {certList.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-white/90 text-sm font-medium"
                >
                  {certs(cert)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
