import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
    // 'error' — errors only (default)
    // 'warn'  — warnings and errors
    // true    — all console output
    // false   — disabled
  },
  // Permanent redirects: the legal pages were renamed to the canonical URLs
  // requested by the client (May 5, 2026 directive). Old short URLs still
  // work for backward compatibility — anything linking to /terms etc.
  // continues to land on the right page.
  async redirects() {
    return [
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/cookies", destination: "/cookie-policy", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
