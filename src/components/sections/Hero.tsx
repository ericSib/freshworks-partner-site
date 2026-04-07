"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CERT_KEYS } from "@/config/certifications";
import TextReveal from "@/components/ui/TextReveal";

const CLIENT_LOGOS = [
  { src: "/images/logos/Bonduelle.png", alt: "Groupe Bonduelle" },
  { src: "/images/logos/logo_Assurance_Maladie.jpg", alt: "Assurance Maladie" },
  { src: "/images/logos/Otipass-3couleurs.webp", alt: "OTIpass" },
  { src: "/images/logos/Theremia.webp", alt: "Theremia" },
  { src: "/images/logos/Logo-Bartle.png", alt: "Bartle" },
  { src: "/images/logos/Logo_Cyclevia.png.webp", alt: "Cyclevia" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const certs = useTranslations("certifications");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-navy via-navy-light to-navy overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-orange/15 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-orange/8 rounded-full blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute -bottom-32 right-1/4 w-[450px] h-[450px] bg-navy-light/40 rounded-full blur-[100px] animate-blob animation-delay-8000" />
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-orange/5 rounded-full blur-[80px] animate-blob animation-delay-12000" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <p
            className={`text-orange font-semibold text-lg mb-4 font-heading transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t("tagline")}
          </p>

          {/* Headline — animated word-by-word */}
          <TextReveal
            text={t("headline")}
            as="h1"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            initialDelay={400}
            delayPerWord={70}
          />

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isLoaded ? "900ms" : "0ms" }}
          >
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isLoaded ? "1100ms" : "0ms" }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center bg-orange text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-dark transition-all duration-300 shadow-[var(--shadow-orange-md)] hover:shadow-[var(--shadow-orange-lg)] hover:translate-y-[-2px]"
            >
              {t("ctaPrimary")}
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {t("ctaSecondary")}
            </a>
          </div>

          {/* Trust bar — Client logos + certifications */}
          <div
            className={`transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isLoaded ? "1300ms" : "0ms" }}
          >
            {/* Client logos */}
            <p className="text-white/60 text-xs uppercase tracking-widest mb-4">
              {t("clientsTrust")}
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-8">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.alt}
                  className="relative h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    height={32}
                    width={100}
                    className="h-8 w-auto object-contain invert"
                  />
                </div>
              ))}
            </div>

            {/* Certification badges */}
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
              {t("trustedBy")}
            </p>
            <div className="flex flex-wrap gap-2">
              {CERT_KEYS.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors"
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
