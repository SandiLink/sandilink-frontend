import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Payment successful — SandiLink",
  description:
    "Your SandiLink Pro subscription is active. Welcome to the platform.",
};

export default async function SubscribeSuccessPage() {
  const t = await getTranslations("subscribe.success");
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
        <CheckCircle2 className="size-8" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
        {t("body")}
      </p>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Sparkles className="size-5 text-primary" />
            <CardTitle className="text-base">{t("dashboardCardTitle")}</CardTitle>
            <CardDescription>{t("dashboardCardDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/provider">
                {t("goToDashboard")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Mail className="size-5 text-primary" />
            <CardTitle className="text-base">{t("receiptCardTitle")}</CardTitle>
            <CardDescription>{t("receiptCardDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/provider/billing">{t("openBilling")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        {t("needAnything")}{" "}
        <Link href="/support" className="underline">
          /support
        </Link>
        .
      </p>
    </div>
  );
}
