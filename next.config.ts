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
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://assets.calendly.com https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://assets.calendly.com",
      "connect-src 'self' https://calendly.com https://www.google-analytics.com https://analytics.google.com",
      "frame-src https://calendly.com",
      "frame-ancestors 'none'",
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
