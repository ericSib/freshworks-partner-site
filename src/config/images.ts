/**
 * Centralized image configuration for section visuals.
 *
 * Strategy: Unsplash remote for development, swap to local `/public/images/sections/`
 * for production by changing `src` values to local paths (e.g. "/images/sections/hero.webp").
 *
 * All images use `next/image` for automatic optimization (WebP/AVIF, responsive sizing).
 */

export const SECTION_IMAGES = {
  hero: {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    width: 800,
    height: 900,
  },
  process: [
    {
      // Diagnostic — Data analysis, audit, assessment
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 400,
    },
    {
      // Deploy — Implementation, configuration, development
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 400,
    },
    {
      // Steer — Dashboards, KPIs, monitoring
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 400,
    },
  ],
  caseStudies: [
    {
      // Industrial mid-market — ITSM
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 340,
    },
    {
      // E-commerce SMB — Customer support CX
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 340,
    },
  ],
  freshworksProducts: [
    {
      // Freshservice — ITSM/ESM dashboard, service management
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 340,
    },
    {
      // Freshdesk — Customer support, omnichannel, chat
      src: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 340,
    },
    {
      // Freddy AI — Artificial intelligence, automation
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 340,
    },
  ],
  services: {
    // Section header — team delivering IT & CX consulting
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    width: 1200,
    height: 400,
  },
} as const;
