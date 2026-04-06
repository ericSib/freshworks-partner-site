import Image from "next/image";
import { useTranslations } from "next-intl";
import { SITE_NAME } from "@/config/site";
import { NAV_LINKS } from "@/config/navigation";
import { CERT_KEYS } from "@/config/certifications";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const certs = useTranslations("certifications");

  const navLinks = NAV_LINKS.map((link) => ({
    href: link.href,
    label: nav(link.labelKey),
  }));

  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-was.png"
                alt={SITE_NAME}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-heading font-bold text-xl">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
              {t("description")}
            </p>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {CERT_KEYS.map((cert) => (
                <span
                  key={cert}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/70"
                >
                  {certs(cert)}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              {t("navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-orange transition-colors text-sm"
                >
                  {t("legal")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              {t("contact")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-white/60 hover:text-orange transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t("email")}
                </a>
              </li>
              <li className="text-white/40 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {t("location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">{t("rights")}</p>
          <p className="text-white/30 text-xs">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
