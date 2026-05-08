import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// HOTFIX-S22.0a — cache-control public on indexable routes.
//
// Vercel auto-applies `cache-control: private, no-cache, no-store`
// when a Set-Cookie header is present in the response. The next-intl
// middleware sets NEXT_LOCALE on every locale-prefixed response, so
// every `/(fr|en)/*` route was inadvertently being served as private.
// Googlebot reads `private/no-store` as "do not index" — desindexation
// confirmed via GSC export 2026-05-08 (7 → 0 indexed pages in 24h).
//
// We override that behaviour declaratively here, scoped to the locale-
// prefixed routes that are listed in sitemap.xml. The `s-maxage` lets
// the Vercel edge cache hold the response for 1 day; `stale-while-
// revalidate` lets it serve a slightly older copy for 7 days while
// re-fetching in the background. Googlebot re-crawls daily on healthy
// sites, so 86400s is the right ceiling.
const S_MAXAGE_INDEXABLE_SECONDS = 86_400; // 1 day — Googlebot daily re-crawl window
const STALE_WHILE_REVALIDATE_SECONDS = 604_800; // 7 days — CDN tolerance window

const indexableCacheHeaders = [
  {
    key: "Cache-Control",
    value: `public, s-maxage=${S_MAXAGE_INDEXABLE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`,
  },
];

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // unsafe-inline required by Next.js inline scripts + Calendly widget
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://assets.calendly.com https://www.googletagmanager.com`,
      // unsafe-inline required by Tailwind v4 runtime + Calendly CSS
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      // Tightened: only self, data URIs, and specific trusted origins
      "img-src 'self' data: https://assets.calendly.com https://www.googletagmanager.com",
      "font-src 'self' https://assets.calendly.com https://fonts.gstatic.com",
      "connect-src 'self' https://calendly.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      "frame-src https://calendly.com",
      "frame-ancestors 'none'",
      // Hardening: restrict base URI and form targets
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ") + ";",
  },
];

const nextConfig: NextConfig = {
  images: {
    // All images served locally — no remote patterns needed.
  },
  async headers() {
    return [
      // Security headers apply uniformly to every route.
      { source: "/(.*)", headers: securityHeaders },
      // Cache-control opt-in for the locale-prefixed indexable routes
      // declared in sitemap.xml. Order matters : Next.js merges headers
      // when multiple rules match the same path, so this rule augments
      // (not replaces) the security headers above.
      { source: "/:locale(fr|en)", headers: indexableCacheHeaders },
      { source: "/:locale(fr|en)/:path*", headers: indexableCacheHeaders },
    ];
  },
};

export default withNextIntl(nextConfig);
