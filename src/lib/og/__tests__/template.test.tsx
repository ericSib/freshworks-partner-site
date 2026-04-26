/**
 * OG image template tests — guards the JSX composition used by all
 * `opengraph-image.tsx` routes (US-S20-3).
 *
 * The actual ImageResponse rendering happens at the Edge runtime and
 * is verified by E2E curl post-deploy. Here we test the pure JSX so
 * that any layout regression surfaces in unit tests.
 */

import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { OgTemplate, OG_SIZE } from "../template";

describe("OgTemplate (US-S20-3)", () => {
  it("renders OG_SIZE = 1200×630 (LinkedIn / X / WhatsApp standard)", () => {
    expect(OG_SIZE.width).toBe(1200);
    expect(OG_SIZE.height).toBe(630);
  });

  it("renders the title prop in the output", () => {
    const html = renderToString(
      <OgTemplate title="Conseil Freshworks France" subtitle="What A Service" locale="fr" />
    );
    expect(html).toContain("Conseil Freshworks France");
  });

  it("renders the subtitle prop in the output", () => {
    const html = renderToString(
      <OgTemplate title="Quiz" subtitle="Service Maturity Index" locale="fr" />
    );
    expect(html).toContain("Service Maturity Index");
  });

  it("supports an optional badge for variant pages (quiz, services, etc.)", () => {
    const html = renderToString(
      <OgTemplate
        title="Service Maturity Index"
        subtitle="Évaluez votre maturité IT"
        badge="Quiz gratuit"
        locale="fr"
      />
    );
    expect(html).toContain("Quiz gratuit");
    expect(html).toContain("Service Maturity Index");
  });

  it("uses the WaS brand colors (deep background + accent)", () => {
    const html = renderToString(
      <OgTemplate title="t" subtitle="s" locale="fr" />
    );
    // Deep navy background + accent amber — defined in src/config/brand.ts
    // (or as inline tokens here). We assert by hex presence.
    expect(html).toMatch(/#0C1220|#0c1220/i); // deep
    expect(html).toMatch(/#B8926A|#b8926a/i); // accent
  });

  it("emits lang attribute matching the locale prop", () => {
    const fr = renderToString(<OgTemplate title="t" subtitle="s" locale="fr" />);
    const en = renderToString(<OgTemplate title="t" subtitle="s" locale="en" />);
    expect(fr).toContain('lang="fr"');
    expect(en).toContain('lang="en"');
  });
});
