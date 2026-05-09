"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormatter, useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Globe,
  Lock,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROVIDER_PLANS, PAYMENT_METHODS } from "@/config/subscription-plans";

const VALUE_PROPS = [
  { icon: Wallet, key: "earnings" },
  { icon: Globe, key: "currency" },
  { icon: Star, key: "cancel" },
];

const FAQS = [
  { qKey: "q1", aKey: "a1" },
  { qKey: "q2", aKey: "a2" },
  { qKey: "q3", aKey: "a3" },
  { qKey: "q4", aKey: "a4" },
];

export function PricingContent() {
  const [billing, setBilling] = useState("monthly");
  const format = useFormatter();
  const t = useTranslations("pricing");
  const params = useSearchParams();
  const from = params.get("from");

  const formatPrice = (value) =>
    format.number(value, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const contextNotice = from === "register"
    ? { title: t("contextRegisterTitle"), body: t("contextRegisterBody") }
    : from === "gate"
      ? { title: t("contextGateTitle"), body: t("contextGateBody") }
      : null;

  return (
    <div>
      {contextNotice && (
        <section className="border-b bg-amber-50 dark:bg-amber-950/30">
          <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <Lock className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100">
                {contextNotice.title}
              </p>
              <p className="text-amber-800 dark:text-amber-200">
                {contextNotice.body}
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("intro")}
          </p>

          <div className="mt-8 inline-flex items-center justify-center">
            <Tabs value={billing} onValueChange={setBilling}>
              <TabsList>
                <TabsTrigger value="monthly">{t("tabMonthly")}</TabsTrigger>
                <TabsTrigger value="annual">
                  {t("tabAnnual")}
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    {t("save17")}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PROVIDER_PLANS.map((plan) => {
            const price = billing === "annual" ? plan.annual : plan.monthly;
            const period = billing === "annual" ? "/year" : "/month";
            return (
              <Card
                key={plan.slug}
                className={
                  plan.highlight
                    ? "flex h-full flex-col border-primary py-0 shadow-lg ring-2 ring-primary/40"
                    : "flex h-full flex-col py-0"
                }
              >
                {plan.highlight ? (
                  <div className="flex items-center justify-center gap-1.5 rounded-t-xl bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                    <Star className="size-3.5 fill-current" />
                    Most popular
                  </div>
                ) : (
                  <div className="h-2" aria-hidden />
                )}
                <CardHeader className="pt-4">
                  <CardTitle className="font-heading text-xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.tagline}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold tracking-tight">
                      {formatPrice(price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {period}
                    </span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {plan.annualSavings} vs monthly
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col pb-6">
                  <ul className="grid flex-1 gap-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <Link href={`/subscribe/${plan.slug}?billing=${billing}`}>
                      Subscribe Now
                      <ArrowRight className="size-4" data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t("usdNote")}
        </p>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("why.heading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("why.subheading")}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {VALUE_PROPS.map((v) => (
              <div key={v.key} className="rounded-2xl border bg-background p-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </div>
                <p className="mt-4 text-sm font-semibold">{t(`why.${v.key}Title`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`why.${v.key}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("payments.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("payments.subheading")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("payments.phase1Label")}
              </p>
            </div>
            <ul className="mt-4 grid gap-2.5">
              {PAYMENT_METHODS.phase1.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.note}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {m.provider}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-background p-6">
            <div className="flex items-center gap-2">
              <Globe className="size-4 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("payments.phase2Label")}
              </p>
            </div>
            <ul className="mt-4 grid gap-2.5">
              {PAYMENT_METHODS.phase2.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.note}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {m.region}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("faq.heading")}
          </h2>
          <div className="mt-10 grid gap-4">
            {FAQS.map((f) => (
              <Card key={f.qKey}>
                <CardHeader>
                  <CardTitle className="text-base">{t(`faq.${f.qKey}`)}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t(`faq.${f.aKey}`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary/3 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            {t("finalCta.body")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register?role=provider">
                {t("finalCta.primary")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/how-it-works">{t("finalCta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
