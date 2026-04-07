"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { SITE_NAME } from "@/config/site";
import { NAV_LINKS } from "@/config/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTION_IDS = ["services", "case-studies", "about", "contact"];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 120);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Close mobile menu on Escape key + focus trap
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && mobileMenuRef.current) {
        const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = NAV_LINKS.map((link) => ({
    href: link.href,
    label: t(link.labelKey),
    sectionId: link.href.replace("#", ""),
  }));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-md)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-was.png"
              alt={SITE_NAME}
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
            <span
              className={`font-heading font-bold text-lg transition-colors ${
                isScrolled ? "text-navy" : "text-white"
              }`}
            >
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav data-testid="desktop-nav" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors hover:text-orange ${
                  isScrolled ? "text-navy/80" : "text-white/90"
                }`}
              >
                {link.label}
                {/* Active indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-orange rounded-full transition-all duration-300 ${
                    activeSection === link.sectionId ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}

            {/* Language toggle — no flags (GTM directive) */}
            <button
              onClick={switchLocale}
              className={`text-sm font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                isScrolled
                  ? "border-navy/20 text-navy hover:bg-navy/5"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              aria-label={t("switchLang")}
            >
              {locale === "fr" ? "English" : "Français"}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="bg-orange-cta text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-dark transition-all shadow-[var(--shadow-orange-sm)] hover:shadow-[var(--shadow-orange-md)] hover:translate-y-[-1px]"
            >
              {t("bookCall")}
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileOpen
                  ? "rotate-45 translate-y-2 bg-navy"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileOpen
                  ? "opacity-0"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                isMobileOpen
                  ? "-rotate-45 -translate-y-2 bg-navy"
                  : isScrolled
                    ? "bg-navy"
                    : "bg-white"
              }`}
            />
          </button>
        </div>

        {/* Mobile menu — animated */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!isMobileOpen}
        >
          <nav data-testid="mobile-nav" className="pb-4 border-t border-gray-200 pt-4 bg-white rounded-xl shadow-xl -mx-4 px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-navy font-medium py-3 hover:text-orange transition-all duration-300 border-b border-gray-100 last:border-0 ${
                    activeSection === link.sectionId ? "text-orange" : ""
                  }`}
                  style={{
                    transitionDelay: isMobileOpen ? `${i * 50}ms` : "0ms",
                    opacity: isMobileOpen ? 1 : 0,
                    transform: isMobileOpen ? "translateX(0)" : "translateX(-10px)",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  switchLocale();
                  setIsMobileOpen(false);
                }}
                className="text-left text-navy font-medium py-3 hover:text-orange border-b border-gray-100 transition-colors"
                aria-label={t("switchLang")}
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <a
                href="#contact"
                className="bg-orange text-white px-5 py-3 rounded-xl text-center font-semibold hover:bg-orange-dark transition-colors mt-2"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                {t("bookCall")}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
