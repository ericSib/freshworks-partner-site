/**
 * Generic JSON-LD component.
 * Server component — renders a <script type="application/ld+json"> tag.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", ... }} />
 */

type JsonLdProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
