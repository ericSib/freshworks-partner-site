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

// ---------------------------------------------------------------------------
// Breadcrumb page map — used by Breadcrumb component (US-22.7)
// ---------------------------------------------------------------------------

export type BreadcrumbPage = {
  /** Route path segment (e.g. "quiz", "mentions-legales") */
  slug: string;
  /** i18n key inside "breadcrumb" namespace */
  labelKey: string;
};

/** Pages that display a breadcrumb (not the homepage). */
export const BREADCRUMB_PAGES: BreadcrumbPage[] = [
  { slug: "quiz", labelKey: "quiz" },
  { slug: "mentions-legales", labelKey: "legal" },
];
