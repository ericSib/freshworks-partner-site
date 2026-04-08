"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { SITE_NAME } from "@/config/site";
import { NAV_LINKS } from "@/config/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-deep/95 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      }`}
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-was.png"
              alt={SITE_NAME}
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            <span className="font-heading font-semibold text-sm tracking-wide text-surface">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.sectionId
                    ? "text-accent"
                    : "text-slate-400 hover:text-surface"
                }`}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={switchLocale}
              className="text-[13px] font-medium text-slate-500 hover:text-surface transition-colors duration-300"
              aria-label={t("switchLang")}
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="text-[13px] font-semibold text-deep bg-accent px-5 py-2.5 rounded-lg hover:bg-accent-light transition-all duration-300"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
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
              className={`block w-5 h-[1.5px] transition-all duration-300 bg-surface ${
                isMobileOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 bg-surface ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] transition-all duration-300 bg-surface ${
                isMobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileOpen ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        >
          <nav className="pb-6 pt-6 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-surface/80 font-medium py-3 hover:text-accent transition-all duration-300 ${
                    activeSection === link.sectionId ? "text-accent" : ""
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
                onClick={() => { switchLocale(); setIsMobileOpen(false); }}
                className="text-left text-slate-400 font-medium py-3 hover:text-surface transition-colors"
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <a
                href="#contact"
                className="bg-accent text-deep px-5 py-3 rounded-lg text-center font-semibold hover:bg-accent-light transition-colors mt-3"
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
