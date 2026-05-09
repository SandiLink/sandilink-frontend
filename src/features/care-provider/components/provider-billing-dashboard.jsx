"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormatter } from "next-intl";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  Download,
  Loader2,
  Pencil,
  Sparkles,
  Wallet,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/DataTable";
import { PROVIDER_PLANS } from "@/config/subscription-plans";

const CURRENT_SUBSCRIPTION = {
  planSlug: "professional",
  status: "active",
  billing: "monthly",
  startedOn: "2026-01-12",
  renewsOn: "2026-05-12",
  amount: 59,
  currency: "USD",
};

const INITIAL_PAYMENT_METHOD = {
  brand: "Visa",
  last4: "4242",
  expiry: "12/2028",
  holder: "Dr. Sarah Johnson",
};

/**
 * Card brand detection from the first few digits of the card number.
 * Demo-grade — production should use Stripe Elements which validates and
 * brands cards properly client-side without exposing the full PAN.
 */
function detectBrand(number) {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^6/.test(n)) return "Discover";
  return "Card";
}

const INVOICES = [
  {
    id: "INV-2026-04",
    date: "2026-04-12",
    plan: "Professional (Monthly)",
    amount: 59,
    status: "Paid",
  },
  {
    id: "INV-2026-03",
    date: "2026-03-12",
    plan: "Professional (Monthly)",
    amount: 59,
    status: "Paid",
  },
  {
    id: "INV-2026-02",
    date: "2026-02-12",
    plan: "Professional (Monthly)",
    amount: 59,
    status: "Paid",
  },
  {
    id: "INV-2026-01",
    date: "2026-01-12",
    plan: "Professional (Monthly)",
    amount: 59,
    status: "Paid",
  },
];

function buildInvoiceColumns(format) {
  return [
    { key: "id", header: "Invoice", sortable: true },
    {
      key: "date",
      header: "Date",
      sortable: true,
      render: (row) =>
        format.dateTime(new Date(row.date), { dateStyle: "medium" }),
    },
    { key: "plan", header: "Plan" },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (row) =>
        format.number(row.amount, { style: "currency", currency: "USD" }),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge
          variant="secondary"
          className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "download",
      header: "",
      render: () => (
        <Button variant="ghost" size="sm">
          <Download className="size-3.5" />
          PDF
        </Button>
      ),
    },
  ];
}

function findPlan(slug) {
  return PROVIDER_PLANS.find((p) => p.slug === slug) ?? PROVIDER_PLANS[0];
}

const EMPTY_CARD_FORM = {
  number: "",
  expiry: "",
  cvc: "",
  holder: "",
};

export function ProviderBillingDashboard() {
  const [showCancel, setShowCancel] = useState(false);
  const [billingPreview, setBillingPreview] = useState(
    CURRENT_SUBSCRIPTION.billing,
  );
  const [paymentMethod, setPaymentMethod] = useState(INITIAL_PAYMENT_METHOD);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [cardForm, setCardForm] = useState(EMPTY_CARD_FORM);
  const [updating, setUpdating] = useState(false);
  const format = useFormatter();
  const formatPrice = (value, fractions = 0) =>
    format.number(value, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: fractions,
    });
  const formatDate = (iso) =>
    format.dateTime(new Date(iso), { dateStyle: "long" });
  const invoiceColumns = buildInvoiceColumns(format);

  const current = findPlan(CURRENT_SUBSCRIPTION.planSlug);
  const isAnnual = billingPreview === "annual";
  const previewPrice = isAnnual ? current.annual : current.monthly;

  function openUpdate() {
    setCardForm(EMPTY_CARD_FORM);
    setUpdateOpen(true);
  }

  function updateCardField(field, value) {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleUpdateMethod(e) {
    e.preventDefault();
    const number = cardForm.number.replace(/\s/g, "");
    const holder = cardForm.holder.trim();
    if (number.length < 13 || number.length > 19) {
      toast.error("Card number must be 13–19 digits.");
      return;
    }
    if (!/^\d{2}\/\d{2,4}$/.test(cardForm.expiry.trim())) {
      toast.error("Expiry must be MM/YY or MM/YYYY.");
      return;
    }
    if (!/^\d{3,4}$/.test(cardForm.cvc.trim())) {
      toast.error("CVC must be 3–4 digits.");
      return;
    }
    if (!holder) {
      toast.error("Cardholder name is required.");
      return;
    }
    setUpdating(true);
    // Simulate the SetupIntent / token call — production swaps this for a
    // Stripe Elements payload + a fetch to the backend, never the raw PAN.
    setTimeout(() => {
      setPaymentMethod({
        brand: detectBrand(number),
        last4: number.slice(-4),
        expiry: cardForm.expiry.trim(),
        holder,
      });
      setUpdating(false);
      setUpdateOpen(false);
      toast.success("Payment method updated", {
        description: `${detectBrand(number)} ending ${number.slice(-4)} · charged on next renewal.`,
      });
    }, 700);
  }

  return (
    <div className="grid gap-6">
      {/* Subscription summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Current plan</CardDescription>
            <CardTitle className="font-heading text-2xl wrap-break-word">
              {current.name}
            </CardTitle>
            <CardAction>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
              >
                Active
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{current.tagline}</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold">
                {formatPrice(CURRENT_SUBSCRIPTION.amount)}
              </span>
              <span className="text-sm text-muted-foreground">
                /{CURRENT_SUBSCRIPTION.billing === "annual" ? "year" : "month"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Renews on</CardDescription>
            <CardTitle className="font-heading text-lg">
              {formatDate(CURRENT_SUBSCRIPTION.renewsOn)}
            </CardTitle>
            <CardAction>
              <CalendarClock className="size-4 text-primary" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We'll auto-renew with your saved payment method. You can cancel
              before this date with no further charges.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Earnings policy</CardDescription>
            <CardTitle className="font-heading text-lg">
              100% kept on bookings
            </CardTitle>
            <CardAction>
              <Wallet className="size-4 text-primary" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Subscription-only model — no commission deducted from any
              booking on this plan.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment method</CardTitle>
          <CardDescription>
            Charged automatically each renewal cycle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 rounded-lg border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {paymentMethod.brand} ending {paymentMethod.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {paymentMethod.expiry} · {paymentMethod.holder}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={openUpdate}>
              <Pencil className="size-3.5" />
              Update method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change plan</CardTitle>
          <CardDescription>
            Upgrades take effect immediately. Downgrades apply at your next
            renewal.
          </CardDescription>
          <CardAction>
            <Tabs value={billingPreview} onValueChange={setBillingPreview}>
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    Save 17%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {PROVIDER_PLANS.map((plan) => {
              const isCurrent =
                plan.slug === CURRENT_SUBSCRIPTION.planSlug &&
                billingPreview === CURRENT_SUBSCRIPTION.billing;
              const price = isAnnual ? plan.annual : plan.monthly;
              return (
                <div
                  key={plan.slug}
                  className={`flex flex-col gap-3 rounded-2xl border p-5 ${
                    isCurrent ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-base font-semibold">
                      {plan.name}
                    </p>
                    {plan.highlight && !isCurrent && (
                      <Badge variant="secondary" className="text-[10px]">
                        Most popular
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge className="text-[10px]">Current plan</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {plan.tagline}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-2xl font-bold">
                      {formatPrice(price)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{isAnnual ? "year" : "month"}
                    </span>
                  </div>
                  <ul className="grid gap-1.5 text-xs text-muted-foreground">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={isCurrent ? "outline" : "default"}
                    size="sm"
                    disabled={isCurrent}
                    asChild={!isCurrent}
                  >
                    {isCurrent ? (
                      <span>Current plan</span>
                    ) : (
                      <Link
                        href={`/subscribe/${plan.slug}?billing=${billingPreview}`}
                      >
                        Switch to {plan.name}
                        <ArrowRight
                          className="size-3.5"
                          data-icon="inline-end"
                        />
                      </Link>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Preview at <strong>{formatPrice(previewPrice)}</strong> for the {current.name}{" "}
            plan on {isAnnual ? "annual" : "monthly"} billing. You will be
            charged in your local currency, converted to USD at checkout.
          </p>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing history</CardTitle>
          <CardDescription>
            Download invoices for your accountant or expense system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={invoiceColumns} data={INVOICES} />
        </CardContent>
      </Card>

      {/* Cancel */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-base">Cancel subscription</CardTitle>
          <CardDescription>
            Your listing will be paused at the end of your current period.
            Profile and history are preserved.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={showCancel} onOpenChange={setShowCancel}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <XCircle className="size-4" />
                Cancel subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel your subscription?</DialogTitle>
                <DialogDescription>
                  You'll keep access until {formatDate(CURRENT_SUBSCRIPTION.renewsOn)}.
                  After that your public profile will be hidden, but your
                  account and data are preserved if you decide to come back.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                  <span>
                    You will lose Founding Member benefits if you cancel and
                    re-subscribe later.
                  </span>
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  onClick={() => setShowCancel(false)}
                >
                  Keep my plan
                </Button>
                <Button variant="destructive">
                  Confirm cancellation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="border-primary/30 bg-primary/3">
        <CardHeader>
          <Sparkles className="size-5 text-primary" />
          <CardTitle className="text-base">Need a different gateway?</CardTitle>
          <CardDescription>
            We support Stripe, PayPal, Apple Pay, Google Pay, and regional
            providers including Flutterwave, Paystack, M-Pesa, Razorpay, and
            MercadoPago. Available gateways depend on your region.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/support">
              Contact support
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
        <DialogContent className="sm:max-w-md!">
          <form onSubmit={handleUpdateMethod}>
            <DialogHeader>
              <DialogTitle>Update payment method</DialogTitle>
              <DialogDescription>
                Replaces the card on file. Charged on your next renewal —
                you won't be charged today.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card number</Label>
                <Input
                  id="card-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={cardForm.number}
                  onChange={(e) => updateCardField("number", e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  maxLength={23}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="card-expiry">Expiry</Label>
                  <Input
                    id="card-expiry"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={cardForm.expiry}
                    onChange={(e) => updateCardField("expiry", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={7}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input
                    id="card-cvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    value={cardForm.cvc}
                    onChange={(e) => updateCardField("cvc", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-holder">Cardholder name</Label>
                <Input
                  id="card-holder"
                  autoComplete="cc-name"
                  value={cardForm.holder}
                  onChange={(e) => updateCardField("holder", e.target.value)}
                  placeholder="As shown on card"
                />
              </div>
              <p className="rounded-md border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-[11px] leading-relaxed text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
                <em>
                  Demo mode — card details are not stored or sent anywhere.
                  When the backend is live this dialog will use Stripe Elements
                  so the raw card number never touches our servers.
                </em>
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setUpdateOpen(false)}
                disabled={updating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updating}>
                {updating && <Loader2 className="size-4 animate-spin" data-icon="inline-start" />}
                {updating ? "Saving…" : "Update method"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
