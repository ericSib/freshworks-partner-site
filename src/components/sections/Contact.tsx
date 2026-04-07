"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionTag from "@/components/ui/SectionTag";
import { CERT_KEYS } from "@/config/certifications";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const certs = useTranslations("certifications");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = t("form.required");
    const email = form.get("email") as string;
    if (!email) errs.email = t("form.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = t("form.invalidEmail");
    if (!form.get("company")) errs.company = t("form.required");
    if (!form.get("challenge") || form.get("challenge") === "")
      errs.challenge = t("form.required");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          challenge: form.get("challenge"),
        }),
      });
      if (!res.ok) throw new Error("API error");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const challengeKeys = ["adoption", "cx", "tool", "migration", "scale", "itam", "other"] as const;

  return (
    <section id="contact" className="section-padding bg-deep relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-16">
            <SectionTag>{t("sectionTag")}</SectionTag>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface tracking-tight leading-[1.1] mb-4">
              {t("headline")}
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              {t("subheadline")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Form */}
          <AnimateOnScroll variant="fade-up" className="lg:col-span-3">
            {formState === "success" ? (
              <div className="border border-white/5 rounded-xl p-12 text-center">
                <div className="w-12 h-12 border border-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-surface text-lg font-semibold mb-4">
                  {t("form.success")}
                </p>
                <a
                  href="https://calendly.com/whataservice/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-accent text-deep px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-light transition-all duration-300"
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                >
                  {t("form.successCta")}
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">
                    {t("form.company")}
                  </label>
                  <input
                    name="company"
                    type="text"
                    placeholder={t("form.companyPlaceholder")}
                    className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all"
                  />
                  {errors.company && <p className="text-red-400 text-xs mt-1.5">{errors.company}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">
                    {t("form.challenge")}
                  </label>
                  <select
                    name="challenge"
                    defaultValue=""
                    className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all appearance-none"
                  >
                    <option value="" disabled className="text-slate-900">
                      {t("form.challengeOptions.default")}
                    </option>
                    {challengeKeys.map((key) => (
                      <option key={key} value={key} className="text-slate-900">
                        {t(`form.challengeOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                  {errors.challenge && <p className="text-red-400 text-xs mt-1.5">{errors.challenge}</p>}
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-accent text-deep py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ transitionTimingFunction: "var(--ease-spring)" }}
                >
                  {formState === "sending" ? t("form.sending") : t("form.submit")}
                </button>

                {formState === "error" && (
                  <p className="text-red-400 text-sm text-center">{t("form.error")}</p>
                )}
              </form>
            )}
          </AnimateOnScroll>

          {/* Info */}
          <AnimateOnScroll variant="fade-up" delay={150} className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-surface font-semibold mb-6">
                  {t("info.title")}
                </h3>
                <div className="space-y-5">
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="flex items-center gap-3 text-slate-400 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {t("info.email")}
                  </a>
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {t("info.location")}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t("info.response")}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {CERT_KEYS.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 border border-white/8 rounded text-slate-500 text-xs font-medium"
                    >
                      {certs(cert)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
