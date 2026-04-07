"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
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
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setFormState("success");
  };

  const challengeKeys = [
    "adoption",
    "tool",
    "migration",
    "scale",
    "other",
  ] as const;

  return (
    <section id="contact" className="section-padding bg-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-orange/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] bg-orange/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-orange/15 text-orange text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
              {t("sectionTag")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("headline")}
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              {t("subheadline")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <AnimateOnScroll variant="fade-right" className="lg:col-span-3">
            {formState === "success" ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-white text-xl font-semibold mb-2">
                  {t("form.success")}
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:text-orange-light transition-colors font-medium"
                >
                  {t("form.successCta")}
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6"
              >
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-white/70 text-sm font-medium mb-2">
                    {t("form.name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder={t("form.namePlaceholder")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange focus:shadow-[0_0_0_3px_rgba(244,153,98,0.15)] transition-all"
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-white/70 text-sm font-medium mb-2">
                    {t("form.email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange focus:shadow-[0_0_0_3px_rgba(244,153,98,0.15)] transition-all"
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="contact-company" className="block text-white/70 text-sm font-medium mb-2">
                    {t("form.company")}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder={t("form.companyPlaceholder")}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? "contact-company-error" : undefined}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-orange focus:shadow-[0_0_0_3px_rgba(244,153,98,0.15)] transition-all"
                  />
                  {errors.company && (
                    <p id="contact-company-error" role="alert" className="text-red-400 text-xs mt-1">{errors.company}</p>
                  )}
                </div>

                {/* Challenge dropdown */}
                <div>
                  <label htmlFor="contact-challenge" className="block text-white/70 text-sm font-medium mb-2">
                    {t("form.challenge")}
                  </label>
                  <select
                    id="contact-challenge"
                    name="challenge"
                    defaultValue=""
                    aria-invalid={!!errors.challenge}
                    aria-describedby={errors.challenge ? "contact-challenge-error" : undefined}
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange focus:shadow-[0_0_0_3px_rgba(244,153,98,0.15)] transition-all appearance-none"
                  >
                    <option value="" disabled className="text-gray-900">
                      {t("form.challengeOptions.default")}
                    </option>
                    {challengeKeys.map((key) => (
                      <option key={key} value={key} className="text-gray-900">
                        {t(`form.challengeOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                  {errors.challenge && (
                    <p id="contact-challenge-error" role="alert" className="text-red-400 text-xs mt-1">
                      {errors.challenge}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-orange text-white py-4 rounded-xl text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-[var(--shadow-orange-md)] hover:shadow-[var(--shadow-orange-lg)] hover:translate-y-[-1px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "sending"
                    ? t("form.sending")
                    : t("form.submit")}
                </button>

                {formState === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    {t("form.error")}
                  </p>
                )}
              </form>
            )}
          </AnimateOnScroll>

          {/* Info — 2 cols */}
          <AnimateOnScroll variant="fade-left" delay={150} className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  {t("info.title")}
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="flex items-center gap-3 text-white/70 hover:text-orange transition-colors"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    {t("info.email")}
                  </a>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    {t("info.location")}
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {t("info.response")}
                  </div>
                </div>
              </div>

              {/* Trust badges near form (GTM Tier 2) */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {CERT_KEYS.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 bg-white/8 border border-white/10 rounded-full text-white/70 text-xs font-medium"
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
