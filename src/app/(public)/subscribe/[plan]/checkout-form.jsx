"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Globe,
  Lock,
  ShieldCheck,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PAYMENT_METHODS } from "@/config/subscription-plans";
import { usePaymentGatewayStore } from "@/store/use-payment-gateway-store";
import { useAuthStore } from "@/store/use-auth-store";

const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "GBP", label: "GBP — British Pound" },
  { code: "CAD", label: "CAD — Canadian Dollar" },
  { code: "AUD", label: "AUD — Australian Dollar" },
  { code: "NGN", label: "NGN — Nigerian Naira" },
  { code: "KES", label: "KES — Kenyan Shilling" },
  { code: "ZAR", label: "ZAR — South African Rand" },
  { code: "INR", label: "INR — Indian Rupee" },
  { code: "BRL", label: "BRL — Brazilian Real" },
  { code: "MXN", label: "MXN — Mexican Peso" },
  { code: "PHP", label: "PHP — Philippine Peso" },
];

const ALL_METHODS = [...PAYMENT_METHODS.phase1, ...PAYMENT_METHODS.phase2];

export function CheckoutForm({ plan, initialBilling }) {
  const router = useRouter();
  const format = useFormatter();
  const t = useTranslations("subscribeCheckout");
  const gateways = usePaymentGatewayStore((s) => s.gateways);
  const setSubscription = useAuthStore((s) => s.setSubscription);

  const enabledMethods = ALL_METHODS.filter(
    (m) => gateways[m.gatewayId]?.enabled,
  );
  const availableMethods = enabledMethods.length > 0 ? enabledMethods : ALL_METHODS;

  const [billing, setBilling] = useState(initialBilling);
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState(availableMethods[0]?.id ?? "stripe-card");
  const [submitting, setSubmitting] = useState(false);

  const price = billing === "annual" ? plan.annual : plan.monthly;
  const period = billing === "annual" ? "year" : "month";

  // Currency symbol/formatting follows the user's locale; the underlying
  // amount is still USD per platform settlement contract.
  const formatPrice = (value, fractions = 0) =>
    format.number(value, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: fractions,
    });

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      // Flip the subscription to active before the redirect so the
      // provider-dashboard gate (Section 6.2) lets the user through.
      setSubscription({
        status: "active",
        plan: plan.slug,
        since: new Date().toISOString(),
      });
      router.push("/subscribe/success");
    }, 1200);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/pricing">
          <ArrowLeft className="size-4" />
          {t("backToPricing")}
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {t("headingPrefix")} {plan.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("stepIndicator")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing cycle</CardTitle>
              <CardDescription>
                Switch any time from your billing dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={billing}
                onValueChange={setBilling}
                className="grid gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="bill-monthly"
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                    billing === "monthly" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem id="bill-monthly" value="monthly" />
                  <div>
                    <p className="text-sm font-medium">Monthly</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(plan.monthly)}/month
                    </p>
                  </div>
                </Label>
                <Label
                  htmlFor="bill-annual"
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                    billing === "annual" ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem id="bill-annual" value="annual" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">Annual</p>
                      <Badge variant="secondary" className="text-[10px]">
                        Save 17%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(plan.annual)}/year
                    </p>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account details</CardTitle>
              <CardDescription>
                We'll attach the subscription to this email.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Dr. Sarah Johnson" required />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="country">Country / region</Label>
                <Input id="country" placeholder="United States" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Currency</CardTitle>
              <CardDescription>
                You'll be charged in your local currency. We convert to USD at
                checkout for platform settlement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <Globe className="mt-0.5 size-3.5 shrink-0" />
                <span>
                  You will be charged in your local currency. Converted to USD
                  at checkout.
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment method</CardTitle>
              <CardDescription>
                Available gateways depend on your region. All payments are
                encrypted and processed by the selected provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={method}
                onValueChange={setMethod}
                className="grid gap-3"
              >
                {availableMethods.map((m) => (
                  <Label
                    key={m.id}
                    htmlFor={`method-${m.id}`}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 ${
                      method === m.id ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem id={`method-${m.id}`} value={m.id} />
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {m.note}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {m.region || m.provider}
                    </Badge>
                  </Label>
                ))}
              </RadioGroup>
              {enabledMethods.length === 0 ? (
                <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                  No gateways are enabled in admin config. Showing all
                  available gateways for demo purposes.
                </p>
              ) : null}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Secure checkout. Your payment details never touch our servers.
            </p>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Processing…" : `Pay ${formatPrice(price)} & subscribe`}
            </Button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <Badge className="w-fit" variant="secondary">
                Order summary
              </Badge>
              <CardTitle className="text-base">{plan.name} plan</CardTitle>
              <CardDescription>{plan.tagline}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-bold tracking-tight">
                  {formatPrice(price)}
                </span>
                <span className="text-sm text-muted-foreground">/{period}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Charged today, then auto-renews every {period}.
              </p>

              <Separator className="my-5" />

              <ul className="grid gap-2.5">
                {plan.features.slice(0, 5).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Separator className="my-5" />

              <div className="grid gap-2 text-xs text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Wallet className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  Keep 100% of your earnings — no commission, ever.
                </p>
                <p className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  Cancel anytime from your billing dashboard.
                </p>
                <p className="flex items-start gap-2">
                  <CreditCard className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  Your subscription unlocks the full provider dashboard.
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            By subscribing you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </aside>
      </div>
    </div>
  );
}
