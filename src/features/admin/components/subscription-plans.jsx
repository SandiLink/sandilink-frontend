"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check, Plus, Pencil } from "lucide-react";

const initialPlans = [
  {
    id: 1,
    name: "Basic",
    price: 0,
    interval: "month",
    description: "Get started with essential features",
    features: [
      "Up to 5 provider listings",
      "Basic search visibility",
      "Email support",
      "Standard matching algorithm",
      "Monthly analytics report",
    ],
    active: true,
    subscribers: 1240,
  },
  {
    id: 2,
    name: "Pro",
    price: 29.99,
    interval: "month",
    description: "For growing practices and providers",
    features: [
      "Unlimited provider listings",
      "Priority search placement",
      "Priority email & chat support",
      "Advanced matching algorithm",
      "Weekly analytics reports",
      "Custom branding",
      "API access",
    ],
    active: true,
    popular: true,
    subscribers: 856,
  },
  {
    id: 3,
    name: "Enterprise",
    price: 99.99,
    interval: "month",
    description: "For institutions and large organizations",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Bulk user management",
      "White-label options",
      "Advanced reporting & exports",
      "Phone support",
    ],
    active: true,
    subscribers: 134,
  },
];

export default function SubscriptionPlans() {
  const [plans] = useState(initialPlans);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <CreditCard className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Subscription Plans
            </h1>
            <p className="text-muted-foreground">
              Manage pricing tiers and plan features
            </p>
          </div>
        </div>
        <div className="ms-auto">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Plan
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
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
                <div className="text-center">
                  <div className="text-xl font-heading leading-snug font-medium">
                    {plan.name}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">
                        /{plan.interval}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.subscribers.toLocaleString()} active subscribers
                  </p>
                </div>
                <div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-4">
                <Button variant="outline" className="w-full gap-2">
                  <Pencil className="h-4 w-4" />
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
