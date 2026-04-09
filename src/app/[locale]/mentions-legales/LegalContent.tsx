"use client";

import { useTranslations } from "next-intl";

/** Client component — needs useTranslations for interactive i18n. */
export default function LegalContent() {
  const t = useTranslations("legal");

  return (
    <section className="section-padding bg-deep min-h-[100dvh] pt-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-surface tracking-tight mb-12">
          {t("title")}
        </h1>

        <div className="space-y-10 text-slate-400 text-[15px] leading-relaxed">
          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("editor.heading")}</h2>
            <p>{t("editor.content")}</p>
          </div>

          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("hosting.heading")}</h2>
            <p>{t("hosting.content")}</p>
          </div>

          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("ip.heading")}</h2>
            <p>{t("ip.content")}</p>
          </div>

          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("data.heading")}</h2>
            <p>{t("data.content")}</p>
          </div>

          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("cookies.heading")}</h2>
            <p>{t("cookies.content")}</p>
          </div>

          <div>
            <h2 className="text-surface font-semibold text-lg mb-3">{t("contact.heading")}</h2>
            <p>{t("contact.content")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
