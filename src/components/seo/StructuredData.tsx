/**
 * Site-wide structured data — injected in the locale layout <head>.
 *
 * Renders JSON-LD for:
 * - Organization (US-22.1)
 * - Person / Founder (US-22.2)
 * - Service × N, dynamically from i18n (US-22.3)
 *
 * Server component — no client JS.
 */

import { getTranslations } from "next-intl/server";
import JsonLd from "./JsonLd";
import {
  ORGANIZATION,
  FOUNDER,
  SERVICE_SLUGS,
} from "@/config/schema";
import { SITE_URL } from "@/config/site";

type Props = {
  locale: string;
};

export default async function StructuredData({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "services" });

  // Build Organization + Person graph
  const orgPersonGraph = {
    "@context": "https://schema.org",
    "@graph": [
      { ...ORGANIZATION },
      { ...FOUNDER },
    ],
  };

  // Build Service schemas from i18n cards.
  // areaServed reuses ORGANIZATION.areaServed (FR + UK + BE + CH) so the
  // entity-level geo signal stays coherent with the per-service signal —
  // US-S20-4 follow-up after audit revealed the 8 dynamic services were
  // still France-only despite the Organization being extended.
  const services = SERVICE_SLUGS.map((slug, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${slug}`,
    name: t(`cards.${index}.title`),
    description: t(`cards.${index}.description`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ORGANIZATION.areaServed,
    serviceType: "IT Consulting",
  }));

  return (
    <>
      <JsonLd data={orgPersonGraph} />
      {services.map((service) => (
        <JsonLd key={service["@id"]} data={service} />
      ))}
    </>
  );
}
