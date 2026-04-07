import Image from "next/image";
import { getTranslations } from "next-intl/server";
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

export default async function ClientLogos() {
  const t = await getTranslations("clientLogos");

  return (
    <section data-testid="client-logos" className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll variant="fade">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-8">
            {t("title")}
          </p>

          {/* Desktop: static row */}
          <div className="hidden md:flex items-center justify-center gap-12 flex-wrap">
            {LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  height={36}
                  width={120}
                  className="h-9 w-auto object-contain"
                />
              </div>
            ))}
          </div>

          {/* Mobile: scrolling marquee */}
          <div className="md:hidden overflow-hidden">
            <div className="flex items-center gap-12 animate-marquee">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <div
                  key={`${logo.alt}-${i}`}
                  className="grayscale opacity-40 shrink-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    height={32}
                    width={100}
                    className="h-8 w-auto object-contain"
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
