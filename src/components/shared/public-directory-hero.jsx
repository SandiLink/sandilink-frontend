import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

/**
 * Shared hero banner for the top of each public directory page.
 * Sets context (this is browse-only, sign up to take action) without
 * blocking visitors from exploring the listings underneath.
 *
 * The eyebrow + sign-in/sign-up CTAs are shared via i18n keys; the
 * page-specific title + description are passed in by the caller (already
 * translated server-side).
 */
export async function PublicDirectoryHero({ eyebrow, title, description, signUpHref = "/register" }) {
  const t = await getTranslations("publicHero");
  return (
    <section className="border-b bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-14">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">
            {eyebrow ?? t("eyebrow")}
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="gap-1.5">
            <Link href={signUpHref}>
              {t("signUpFree")} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">{t("signIn")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
