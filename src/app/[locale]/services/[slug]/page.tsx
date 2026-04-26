import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/config/site";
import { ORGANIZATION } from "@/config/schema";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ServicePageContent from "@/components/sections/ServicePageContent";
import JsonLd from "@/components/seo/JsonLd";

/**
 * Dedicated service pages (US-S20-2, D29).
 *
 * Two services prioritized for S20 — selected by SEO keyword volume on
 * the FR market (audit 26/04) :
 *   - freshservice  → "consultant Freshservice France"  (~50-150 vol/mo)
 *   - freshdesk     → "consultant Freshdesk France"     (~30-80 vol/mo)
 *
 * Other 6 offers (cx-esm-transformation, migration, freddy-ai,
 * esm-sprints, audit-optimisation, managed-excellence) are backlog
 * S21+ — high marketing value but lower direct-search intent.
 */
const VALID_SLUGS = ["freshservice", "freshdesk"] as const;
type ServiceSlug = (typeof VALID_SLUGS)[number];

const SERVICE_PRICE_FROM: Record<ServiceSlug, number> = {
  freshservice: 5_000,
  freshdesk: 4_000,
};

const SERVICE_TYPE: Record<ServiceSlug, string> = {
  freshservice: "ITSM Consulting",
  freshdesk: "Customer Service Consulting",
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

function isValidSlug(slug: string): slug is ServiceSlug {
  return (VALID_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) return {};

  const t = await getTranslations({
    locale,
    namespace: `services.detail.${slug}`,
  });
  const url = `${SITE_URL}/${locale}/services/${slug}`;

  return {
    title: `${t("meta.title")} — ${SITE_NAME}`,
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/services/${slug}`,
        en: `${SITE_URL}/en/services/${slug}`,
        "x-default": `${SITE_URL}/fr/services/${slug}`,
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();

  const t = await getTranslations({
    locale,
    namespace: `services.detail.${slug}`,
  });
  const url = `${SITE_URL}/${locale}/services/${slug}`;

  // Service schema — provider Organization + areaServed FR/UK/BE/CH (US-S20-4)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${slug}-detail`,
    name: t("meta.title"),
    description: t("meta.description"),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ORGANIZATION.areaServed,
    serviceType: SERVICE_TYPE[slug],
    url,
    offers: {
      "@type": "Offer",
      price: String(SERVICE_PRICE_FROM[slug]),
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: String(SERVICE_PRICE_FROM[slug]),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
    },
  };

  // FAQPage schema — 6 Q/A specific to this service
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq-${slug}`,
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      "@type": "Question",
      name: t(`faq.q${n}`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.a${n}`),
      },
    })),
  };

  return (
    <>
      <Breadcrumb locale={locale} slug={`services/${slug}`} label={t("breadcrumbLabel")} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <ServicePageContent slug={slug} priceFrom={SERVICE_PRICE_FROM[slug]} locale={locale} />
    </>
  );
}
