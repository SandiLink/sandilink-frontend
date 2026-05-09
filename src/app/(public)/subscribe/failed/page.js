import Link from "next/link";
import { AlertTriangle, ArrowRight, CreditCard, LifeBuoy } from "lucide-react";
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
  title: "Payment failed — SandiLink",
  description:
    "Your subscription payment could not be completed. Update your card or try a different method.",
};

export default async function SubscribeFailedPage() {
  const t = await getTranslations("subscribe.failed");
  const reasons = [
    t("reasonCardDeclined"),
    t("reasonInsufficientFunds"),
    t("reasonBankFlagged"),
    t("reasonAddressMismatch"),
    t("reasonNetworkTimeout"),
  ];
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
        <AlertTriangle className="size-8" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground">
        {t("body")}
      </p>

      <Card className="mt-10 text-left">
        <CardHeader>
          <CardTitle className="text-base">{t("commonReasonsTitle")}</CardTitle>
          <CardDescription>{t("commonReasonsBody")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-500" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CreditCard className="size-5 text-primary" />
            <CardTitle className="text-base">{t("tryAgainTitle")}</CardTitle>
            <CardDescription>{t("tryAgainDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/pricing">
                {t("backToPricing")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <LifeBuoy className="size-5 text-primary" />
            <CardTitle className="text-base">{t("needHelpTitle")}</CardTitle>
            <CardDescription>{t("needHelpDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/support">{t("contactSupport")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
