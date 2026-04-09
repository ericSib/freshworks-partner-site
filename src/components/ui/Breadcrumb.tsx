import { getTranslations } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/config/site";
import { BREADCRUMB_PAGES } from "@/config/navigation";

type Props = {
  locale: string;
  /** Current page slug (e.g. "quiz", "mentions-legales") */
  slug: string;
};

/**
 * Breadcrumb — visual trail + BreadcrumbList JSON-LD.
 *
 * Server component. Renders:
 * - Accessible <nav aria-label="breadcrumb"> with <ol> list
 * - JSON-LD BreadcrumbList schema for Google Rich Results
 *
 * Only rendered on secondary pages (not homepage).
 * US-22.7
 */
export default async function Breadcrumb({ locale, slug }: Props) {
  const t = await getTranslations({ locale, namespace: "breadcrumb" });

  const page = BREADCRUMB_PAGES.find((p) => p.slug === slug);
  if (!page) return null;

  const homeUrl = `${SITE_URL}/${locale}`;
  const currentUrl = `${SITE_URL}/${locale}/${slug}`;
  const homeLabel = t("home");
  const currentLabel = t(page.labelKey);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: currentLabel,
        item: currentUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav
        aria-label="breadcrumb"
        className="max-w-7xl mx-auto px-6 pt-24 pb-2"
      >
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <a
              href={`/${locale}`}
              className="hover:text-accent transition-colors"
            >
              {homeLabel}
            </a>
          </li>
          <li aria-hidden="true" className="text-slate-600">
            /
          </li>
          <li>
            <span aria-current="page" className="text-surface font-medium">
              {currentLabel}
            </span>
          </li>
        </ol>
      </nav>
    </>
  );
}
