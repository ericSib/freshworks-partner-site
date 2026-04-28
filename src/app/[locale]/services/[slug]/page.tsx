import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/config/site";
import { ORGANIZATION } from "@/config/schema";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ServicePageContent from "@/components/sections/ServicePageContent";
import JsonLd from "@/components/seo/JsonLd";

/**
 * Dedicated service pages.
 *
 * Tier 1 (US-S20-2, D29) — selected by SEO keyword volume on the FR
 * market (audit 26/04) :
 *   - freshservice  → "consultant Freshservice France"  (~50-150 vol/mo)
 *   - freshdesk     → "consultant Freshdesk France"     (~30-80 vol/mo)
 *
 * Tier 2 (US-S21-1/2/3, decomposition T37) — extension SEO Sprint 21 :
 *   - migration            → "migration ServiceNow Freshworks"  (~30-100 vol/mo)
 *   - freddy-ai            → "Freddy AI Freshworks consultant"  (~20-50 vol/mo)
 *   - audit-optimisation   → "audit Freshservice / optimisation Freshdesk" (~50-150 vol/mo)
 *
 * Other 3 offers (cx-esm-transformation, esm-sprints, managed-excellence)
 * remain backlog S22+ — lower direct-search intent.
 */
const VALID_SLUGS = [
  "freshservice",
  "freshdesk",
  "migration",
  "freddy-ai",
  "audit-optimisation",
] as const;
type ServiceSlug = (typeof VALID_SLUGS)[number];

const SERVICE_PRICE_FROM: Record<ServiceSlug, number> = {
  freshservice: 5_000,
  freshdesk: 4_000,
  migration: 12_000,
  "freddy-ai": 8_000,
  "audit-optimisation": 6_000,
};

const SERVICE_TYPE: Record<ServiceSlug, string> = {
  freshservice: "ITSM Consulting",
  freshdesk: "Customer Service Consulting",
  migration: "Migration Consulting",
  "freddy-ai": "AI Consulting",
  "audit-optimisation": "Audit & Optimization Consulting",
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
