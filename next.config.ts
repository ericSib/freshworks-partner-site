import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
