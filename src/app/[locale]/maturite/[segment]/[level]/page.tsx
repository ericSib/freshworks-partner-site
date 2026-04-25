import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME } from "@/config/site";
import Breadcrumb from "@/components/ui/Breadcrumb";
import MaturityPage from "@/components/sections/MaturityPage";
import JsonLd from "@/components/seo/JsonLd";

/** Valid segments and levels for static generation. */
const VALID_SEGMENTS = ["itsm", "cx"] as const;
const VALID_LEVELS = ["level-1"] as const; // Expand as more levels are created

type Props = {
  params: Promise<{ locale: string; segment: string; level: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ segment: string; level: string }> = [];
  for (const segment of VALID_SEGMENTS) {
    for (const level of VALID_LEVELS) {
      params.push({ segment, level });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segment, level } = await params;

  if (!isValid(segment, level)) return {};

  const t = await getTranslations({ locale, namespace: `maturity.${segment}.${level}` });
  const url = `${SITE_URL}/${locale}/maturite/${segment}/${level}`;

  return {
    title: `${t("meta.title")} — ${SITE_NAME}`,
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/maturite/${segment}/${level}`,
        en: `${SITE_URL}/en/maturite/${segment}/${level}`,
      },
    },
  };
}

function isValid(segment: string, level: string): boolean {
  return (
    (VALID_SEGMENTS as readonly string[]).includes(segment) &&
    (VALID_LEVELS as readonly string[]).includes(level)
  );
}

export default async function MaturityLevelPage({ params }: Props) {
  const { locale, segment, level } = await params;

  if (!isValid(segment, level)) notFound();

  const t = await getTranslations({ locale, namespace: `maturity.${segment}.${level}` });

  // JSON-LD Service schema specific to this maturity level
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#maturity-${segment}-${level}`,
    name: t("meta.title"),
    description: t("meta.description"),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: segment === "itsm" ? "ITSM Consulting" : "Customer Experience Consulting",
  };

  return (
    <>
      <Breadcrumb locale={locale} slug={`maturite/${segment}/${level}`} label={t("sectionTag")} />
      <JsonLd data={serviceSchema} />
      <MaturityPage
        content={{
          sectionTag: t("sectionTag"),
          headline: t("headline"),
          intro: t("intro"),
        }}
        diagnosis={{
          problemsTitle: t("problemsTitle"),
          problems: t.raw("problems") as string[],
          recommendationsTitle: t("recommendationsTitle"),
          recommendations: t.raw("recommendations") as string[],
        }}
        context={{
          cta: t("cta"),
          timeframe: t("timeframe"),
          segment,
          locale,
        }}
      />
    </>
  );
}
