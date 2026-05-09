import { PricingContent } from "./pricing-content";

export const metadata = {
  title: "Pricing — SandiLink",
  description:
    "Subscription pricing for SandiLink providers. Flat monthly or annual fee, no commission on bookings, supports global payment gateways.",
};

export default function PricingPage() {
  return <PricingContent />;
}
