"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const SAVED_CARDS = [
  { id: "visa-4242", brand: "Visa", last4: "4242", expiry: "12/27" },
  { id: "mc-8888", brand: "Mastercard", last4: "8888", expiry: "06/28" },
];

export function PaymentForm({ bookingId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(
    SAVED_CARDS.length > 0 ? SAVED_CARDS[0].id : "new"
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: process payment
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    window.location.href = `/dashboard/engagements/${bookingId}/success`;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6 grid gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step 3 of 3 — Payment</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>

      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/dashboard/engagements/${bookingId}/confirm`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to confirmation
        </Link>
      </Button>

      {/* Security notice */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <span className="text-muted-foreground">
          Your payment is processed securely. We never store your full card
          details.
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Payment method selection */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Select a saved card or add a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid gap-2"
            >
              {SAVED_CARDS.map((card) => (
                <label
                  key={card.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                    paymentMethod === card.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={card.id} />
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <CreditCard className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {card.brand} ending in {card.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires {card.expiry}
                    </p>
                  </div>
                </label>
              ))}

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors ${
                  paymentMethod === "new"
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="new" />
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="size-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Add new card</p>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* New card form */}
        {paymentMethod === "new" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-primary" />
                <div>
                  <CardTitle>Card Details</CardTitle>
                  <CardDescription>
                    Enter your card information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    required
                    className="h-10"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM / YY"
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      required
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Dr. Sarah Johnson — General Practice
                </span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>$5.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>$125.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/dashboard/engagements/${bookingId}/confirm`}>Back</Link>
          </Button>
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing payment...
              </>
            ) : (
              <>
                <Lock className="size-4" data-icon="inline-start" />
                Pay $125.00
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
