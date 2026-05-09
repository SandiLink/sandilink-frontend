"use client";

import { useState } from "react";
import { CheckCircle2, Edit, Loader2, Plus, Save, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    billing: "Forever",
    subscribers: 180,
    active: true,
    features: [
      "Basic profile",
      "Browse grants directory (limited)",
      "5 grant bookmarks",
      "Community support",
    ],
  },
  {
    id: "basic",
    name: "Basic Researcher",
    price: "$19",
    billing: "/month",
    subscribers: 62,
    active: true,
    features: [
      "Full profile with ORCID",
      "Unlimited grant search",
      "25 grant bookmarks",
      "3 grant applications/month",
      "Journal directory access",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro Researcher",
    price: "$49",
    billing: "/month",
    subscribers: 35,
    active: true,
    popular: true,
    features: [
      "Everything in Basic",
      "Unlimited grant applications",
      "AI-powered grant matching",
      "Grant writer matching",
      "Manuscript submission hub",
      "Priority support",
      "Analytics dashboard",
    ],
  },
  {
    id: "institution",
    name: "Institution",
    price: "$299",
    billing: "/month",
    subscribers: 7,
    active: true,
    features: [
      "Everything in Pro",
      "Up to 50 researcher seats",
      "Bulk researcher onboarding",
      "Institution analytics",
      "Custom matching rules",
      "Dedicated account manager",
      "API access",
    ],
  },
];

export function ResearcherSubscriptionPlans() {
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Researcher Subscription Plans
          </h1>
          <p className="text-muted-foreground">
            Configure subscription tiers for researchers.
          </p>
        </div>
        <div className="flex gap-2 ms-auto">
          <Button variant="outline" size="sm">
            <Plus className="size-4" />
            Add Plan
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`h-full ${plan.popular ? "relative" : ""}`}
          >
            <div
              className={`
              group/card h-full flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10
              ${plan.popular ? "border-primary shadow-md" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="flex flex-col flex-1 gap-4 px-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-heading leading-snug font-medium">
                    {plan.name}
                  </p>
                  <Switch defaultChecked={plan.active} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-heading">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.billing}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-3" />
                  {plan.subscribers} subscribers
                </div>
                <ul className="grid gap-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-4">
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Edit className="size-4" />
                  Edit Plan
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
