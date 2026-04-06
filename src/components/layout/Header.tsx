"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#case-studies", label: t("caseStudies") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-was.png"
              alt="What A Service"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
            <span
              className={`font-[family-name:var(--font-heading)] font-bold text-lg transition-colors ${
                isScrolled ? "text-navy" : "text-white"
              }`}
            >
              What A Service
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange ${
                  isScrolled ? "text-navy/80" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={switchLocale}
              className={`text-sm font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                isScrolled
                  ? "border-navy/20 text-navy hover:bg-navy/5"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label={
                locale === "fr" ? "Switch to English" : "Passer en français"
              }
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              className="bg-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-dark transition-colors shadow-lg shadow-orange/25"
            >
              {t("bookCall")}
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all ${
                isMobileOpen
                  ? "rotate-45 translate-y-2 bg-navy"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all ${
                isMobileOpen
                  ? "opacity-0"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all ${
                isMobileOpen
                  ? "-rotate-45 -translate-y-2 bg-navy"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white rounded-xl shadow-xl mx-(-4) px-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-navy font-medium py-2 hover:text-orange transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  switchLocale();
                  setIsMobileOpen(false);
                }}
                className="text-left text-navy font-medium py-2 hover:text-orange"
              >
                {locale === "fr" ? "🇬🇧 English" : "🇫🇷 Français"}
              </button>
              <a
                href="#contact"
                className="bg-orange text-white px-5 py-3 rounded-lg text-center font-semibold hover:bg-orange-dark transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {t("bookCall")}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
