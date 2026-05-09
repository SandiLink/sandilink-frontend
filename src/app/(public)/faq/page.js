import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { FaqPage } from "@/components/shared/support";

export const metadata = {
  title: "FAQ — SandiLink",
  description:
    "Answers to the most common questions about accounts, billing, placements, privacy, and troubleshooting on SandiLink.",
};

export default async function FaqRoute() {
  const t = await getTranslations("faq");
  return (
    <div>
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <HelpCircle className="size-3" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <FaqPage />
      </section>

      <section className="border-t bg-primary/[0.03] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {t("didntFindHeading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            {t("didntFindBody")}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/support">
                {t("contactSupport")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/how-it-works">{t("howItWorks")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
