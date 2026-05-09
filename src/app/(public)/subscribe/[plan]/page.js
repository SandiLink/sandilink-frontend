import { notFound } from "next/navigation";
import { getPlan } from "@/config/subscription-plans";
import { CheckoutForm } from "./checkout-form";

export async function generateMetadata({ params }) {
  const { plan: slug } = await params;
  const plan = getPlan(slug);
  if (!plan) {
    return { title: "Plan not found — SandiLink" };
  }
  return {
    title: `Subscribe to ${plan.name} — SandiLink`,
    description: `Complete your SandiLink ${plan.name} subscription. Pay in your local currency via Stripe, PayPal, or a regional gateway.`,
  };
}

export default async function SubscribeCheckoutPage({ params, searchParams }) {
  const { plan: slug } = await params;
  const search = await searchParams;

  const plan = getPlan(slug);
  if (!plan) notFound();

  const initialBilling = search?.billing === "annual" ? "annual" : "monthly";

  return <CheckoutForm plan={plan} initialBilling={initialBilling} />;
}
