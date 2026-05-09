"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Section 6.2 dashboard gate. Wraps every page under (provider)/.
 *
 * Default seed of the auth store is `subscription.status === "active"`, so
 * demo navigation keeps working. The register flow flips status to "pending"
 * for a freshly-signed-up care-provider; checkout success flips it back to
 * "active". Any non-active status renders the gate screen instead of the
 * dashboard chrome.
 *
 * The gate is intentionally soft (renders inline, doesn't hard-redirect)
 * so the user keeps URL context and can navigate back. Sidebar isn't
 * rendered while gated — `<ProviderSubscriptionGate>` short-circuits before
 * the SidebarProvider mounts in the layout.
 */
export function ProviderSubscriptionGate({ children }) {
  const status = useAuthStore((s) => s.subscription?.status);
  if (status === "active") return children;

  const message = status === "past_due"
    ? "Your last payment didn't go through. Update your payment method to restore dashboard access."
    : status === "cancelled"
      ? "Your subscription is cancelled. Pick a plan to reactivate your provider dashboard."
      : "Care providers need an active subscription to access the dashboard. Pick a plan to get started.";

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-6 py-10 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="size-7" />
          </div>
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Subscription required
            </h1>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              {message}
            </p>
          </div>

          <div className="grid gap-3 rounded-lg border bg-background p-4 text-left">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="text-sm">
                <p className="font-medium">What you'll unlock</p>
                <p className="text-muted-foreground">
                  Public profile, bookings, messaging, schedule, earnings, and
                  analytics — everything the provider role needs.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-1.5">
              <Link href="/pricing?from=gate">
                Choose a plan <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Switch account</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Status: <span className="font-mono">{status ?? "none"}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
