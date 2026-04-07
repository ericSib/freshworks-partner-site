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
    <footer className="bg-deep border-t border-white/5 text-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo-was.png"
                alt={SITE_NAME}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-heading font-semibold text-sm tracking-wide">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-2">
              {CERT_KEYS.map((cert) => (
                <span
                  key={cert}
                  className="text-[11px] px-2.5 py-1 border border-white/5 rounded text-slate-600"
                >
                  {certs(cert)}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] mb-6 text-slate-500">
              {t("navigation")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-accent transition-colors duration-300 text-sm"
                >
                  {t("legal")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.15em] mb-6 text-slate-500">
              {t("contact")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="text-slate-500 hover:text-accent transition-colors duration-300 text-sm"
                >
                  {t("email")}
                </a>
              </li>
              <li className="text-slate-600 text-sm">
                {t("location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">{t("rights")}</p>
          <p className="text-slate-700 text-xs">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
