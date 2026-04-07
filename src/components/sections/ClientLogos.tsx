"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const LOGOS = [
  { src: "/images/logos/Bonduelle.png", alt: "Groupe Bonduelle" },
  { src: "/images/logos/logo_Assurance_Maladie.jpg", alt: "Assurance Maladie" },
  { src: "/images/logos/Otipass-3couleurs.webp", alt: "OTIpass" },
  { src: "/images/logos/Theremia.webp", alt: "Theremia" },
  { src: "/images/logos/Logo-Bartle.png", alt: "Bartle" },
  { src: "/images/logos/Logo_Cyclevia.png.webp", alt: "Cyclevia" },
  { src: "/images/logos/C-MonEtiquette-Mascotte.png", alt: "C-Mon Etiquette" },
];

export default function ClientLogos() {
  const t = useTranslations("clientLogos");

  return (
    <section className="py-16 bg-deep border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll variant="fade">
          <p className="text-center text-slate-600 text-xs uppercase tracking-[0.2em] mb-10">
            {t("title")}
          </p>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-center gap-16 flex-wrap">
            {LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="w-24 h-10 flex items-center justify-center grayscale opacity-25 hover:opacity-50 transition-all duration-500"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  height={36}
                  width={96}
                  className="max-h-8 max-w-full object-contain invert"
                />
              </div>
            ))}
          </div>

          {/* Mobile marquee */}
          <div className="md:hidden overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="w-20 h-8 flex items-center justify-center grayscale opacity-25 shrink-0"
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
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
