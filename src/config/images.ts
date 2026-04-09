/**
 * Centralized image configuration for section visuals.
 *
 * Images served locally from /public/images/sections/.
 * Next.js `next/image` handles automatic optimization (WebP/AVIF, responsive sizing).
 */

export const SECTION_IMAGES = {
  hero: {
    src: "/images/sections/hero.jpg",
    width: 800,
    height: 900,
  },
  process: [
    {
      // Diagnostic — Data analysis, audit, assessment
      src: "/images/sections/process-diagnostic.jpg",
      width: 600,
      height: 400,
    },
    {
      // Deploy — Implementation, configuration, development
      src: "/images/sections/process-deploy.jpg",
      width: 600,
      height: 400,
    },
    {
      // Steer — Dashboards, KPIs, monitoring
      src: "/images/sections/process-steer.jpg",
      width: 600,
      height: 400,
    },
  ],
  caseStudies: [
    {
      // Industrial mid-market — ITSM
      src: "/images/sections/case-itsm.jpg",
      width: 600,
      height: 340,
    },
    {
      // E-commerce SMB — Customer support CX
      src: "/images/sections/case-cx.jpg",
      width: 600,
      height: 340,
    },
  ],
  freshworksProducts: [
    {
      // Freshservice — ITSM/ESM dashboard, service management
      src: "/images/sections/product-freshservice.jpg",
      width: 600,
      height: 340,
    },
    {
      // Freshdesk — Customer support, omnichannel, chat
      src: "/images/sections/product-freshdesk.jpg",
      width: 600,
      height: 340,
    },
    {
      // Freddy AI — Artificial intelligence, automation
      src: "/images/sections/product-freddy.jpg",
      width: 600,
      height: 340,
    },
  ],
  services: {
    // Section header — team delivering IT & CX consulting
    src: "/images/sections/services-header.jpg",
    width: 1200,
    height: 400,
  },
} as const;
