import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTag from "@/components/ui/SectionTag";

export default function About() {
  const t = useTranslations("about");

  const credentials = [0, 1, 2, 3, 4].map((i) => t(`credentials.${i}`));

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionTag>{t("sectionTag")}</SectionTag>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
            {t("headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange/20 to-navy/10 rounded-2xl blur-xl" />
              <Image
                src="/images/eric-sib.png"
                alt={t("name")}
                width={400}
                height={480}
                className="relative rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-2xl font-bold text-navy mb-1 font-[family-name:var(--font-heading)]">
              {t("name")}
            </h3>
            <p className="text-orange font-semibold mb-6">{t("role")}</p>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {t("bio")}
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-orange/10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{cred}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-lg shadow-orange/25 hover:shadow-orange/40 hover:translate-y-[-2px]"
            >
              {t("cta")}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
