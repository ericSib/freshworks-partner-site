"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CERT_KEYS } from "@/config/certifications";
import { CLIENT_LOGOS } from "@/config/clients";
import { SECTION_IMAGES } from "@/config/images";
import TextReveal from "@/components/ui/TextReveal";

export default function Hero() {
  const t = useTranslations("hero");
  const certs = useTranslations("certifications");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsLoaded(true));
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-deep overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-accent/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-deep-lighter/50 rounded-full blur-[100px]" />
      </div>

      {/* Fine grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,146,106,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(184,146,106,.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
          {/* Left column — Content (60%) */}
          <div className="lg:col-span-3">
            {/* Tagline */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              <div className="w-8 h-[1px] bg-accent" />
              <p className="text-accent text-sm font-medium tracking-widest uppercase font-heading">
                {t("tagline")}
              </p>
            </div>

            {/* Headline */}
            <TextReveal
              text={t("headline")}
              as="h1"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-surface leading-[1.08] tracking-tight mb-8"
              initialDelay={400}
              delayPerWord={70}
            />

            {/* Subheadline */}
            <p
              className={`text-lg text-slate-400 leading-relaxed mb-12 max-w-xl transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isLoaded ? "900ms" : "0ms",
                transitionTimingFunction: "var(--ease-spring)",
              }}
            >
              {t("subheadline")}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-20 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isLoaded ? "1100ms" : "0ms",
                transitionTimingFunction: "var(--ease-spring)",
              }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center bg-accent text-deep px-8 py-4 rounded-lg text-base font-semibold hover:bg-accent-light transition-all duration-300 shadow-[var(--shadow-accent-md)] hover:shadow-[var(--shadow-accent-lg)]"
                style={{ transitionTimingFunction: "var(--ease-spring)" }}
              >
                {t("ctaPrimary")}
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center border border-white/10 text-surface/80 px-8 py-4 rounded-lg text-base font-medium hover:border-accent/30 hover:text-accent transition-all duration-300"
              >
                {t("ctaSecondary")}
              </Link>
            </div>

            {/* Trust bar */}
            <div
              className={`transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: isLoaded ? "1300ms" : "0ms",
                transitionTimingFunction: "var(--ease-spring)",
              }}
            >
              <p className="text-slate-600 text-xs uppercase tracking-[0.2em] mb-5">
                {t("clientsTrust")}
              </p>
              <div className="flex flex-wrap items-center gap-10 mb-10">
                {CLIENT_LOGOS.map((logo) => (
                  <div
                    key={logo.alt}
                    className="relative w-20 h-8 flex items-center justify-center grayscale opacity-30 hover:opacity-60 transition-all duration-500"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      height={32}
                      width={80}
                      className="max-h-7 max-w-full object-contain invert"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
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

          {/* Right column — Hero image (40%), hidden on mobile */}
          <div
            className={`hidden lg:block lg:col-span-2 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{
              transitionDelay: isLoaded ? "600ms" : "0ms",
              transitionTimingFunction: "var(--ease-spring)",
            }}
          >
            <div className="relative">
              {/* Accent glow behind image */}
              <div className="absolute -inset-4 bg-accent/[0.06] rounded-2xl blur-2xl" />

              {/* Image container with gradient blend */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.06]">
                <Image
                  src={SECTION_IMAGES.hero.src}
                  alt={t("imageAlt")}
                  width={SECTION_IMAGES.hero.width}
                  height={SECTION_IMAGES.hero.height}
                  className="object-cover w-full h-full"
                  sizes="(min-width: 1024px) 33vw, 0px"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjkwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMUEyMzQwIi8+PC9zdmc+"
                />
                {/* Gradient overlay — blends into bg-deep on edges */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-deep/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/40 via-transparent to-transparent" />
                {/* Subtle accent tint for cohesion */}
                <div className="absolute inset-0 bg-accent/[0.04] mix-blend-overlay" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
