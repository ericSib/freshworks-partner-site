/**
 * Shared navigation link definitions.
 * Used by Header and Footer to avoid duplication.
 *
 * `labelKey` references a key inside the "nav" translation namespace.
 */

export type NavLink = {
  href: string;
  labelKey: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "#services", labelKey: "services" },
  { href: "#case-studies", labelKey: "caseStudies" },
  { href: "#about", labelKey: "about" },
  { href: "#contact", labelKey: "contact" },
];
