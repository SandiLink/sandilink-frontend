import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { logos } from "@/config/theme";
import { GoogleTranslateSwitcher } from "@/components/shared/google-translate-switcher";

// Inline brand-icon SVGs. lucide-react dropped social/brand icons in v1.x
// for licensing reasons, so we ship them as small components here. Paths
// are from Simple Icons (CC0).
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SandiLink1",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sandilink1/",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sandilink1",
    Icon: LinkedinIcon,
  },
];

const FOOTER_COLUMNS = [
  {
    headingKey: "marketplacesHeading",
    links: [
      { key: "healthcare", href: "/experts" },
      { key: "preceptor", href: "/preceptors" },
      { key: "research", href: "/grants" },
      { key: "grantWriters", href: "/grant-writers" },
      { key: "journals", href: "/journals" },
    ],
  },
  {
    headingKey: "platformHeading",
    links: [
      { key: "howItWorks", href: "/how-it-works" },
      { key: "pricing", href: "/pricing" },
      { key: "trust", href: "/trust-and-safety" },
      { key: "faq", href: "/faq" },
      { key: "support", href: "/support" },
    ],
  },
  {
    headingKey: "getStartedHeading",
    links: [
      { key: "signIn", href: "/login" },
      { key: "createAccount", href: "/register" },
      { key: "forgotPassword", href: "/forgot-password" },
    ],
  },
  {
    headingKey: "legalHeading",
    links: [
      { key: "terms", href: "/terms-of-service" },
      { key: "privacy", href: "/privacy-policy" },
      { key: "cookies", href: "/cookie-policy" },
      { key: "providerAgreement", href: "/provider-agreement" },
    ],
  },
];

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Image
              src={logos.light}
              alt="SandiLink"
              width={120}
              height={34}
              className="object-contain dark:hidden"
            />
            <Image
              src={logos.dark}
              alt="One Sandi"
              width={120}
              height={34}
              className="hidden object-contain dark:block"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <GoogleTranslateSwitcher />
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.headingKey}>
              <h4 className="text-sm font-semibold">{t(col.headingKey)}</h4>
              <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <p
            className="rounded-lg border border-muted bg-muted/30 px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground"
            // The disclaimer contains <strong> markup; render as HTML so the
            // translation file owns the bold span.
            dangerouslySetInnerHTML={{ __html: t.raw("disclaimer") }}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="https://onesandiplatform.com/landing-page"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Part of the One Sandi Platform
            <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">{t("rights", { year })}</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link
              href="/terms-of-service"
              className="transition-colors hover:text-foreground"
            >
              {t("links.termsShort")}
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              {t("links.privacyShort")}
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors hover:text-foreground"
            >
              {t("links.cookiesShort")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
