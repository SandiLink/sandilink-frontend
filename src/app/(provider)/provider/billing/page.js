import { ProviderBillingDashboard } from "@/features/care-provider/components/provider-billing-dashboard";

export const metadata = {
  title: "Billing — SandiLink",
  description:
    "Manage your subscription, payment method, billing history, and plan changes.",
};

export default function ProviderBillingPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Billing
        </h2>
        <p className="text-sm text-muted-foreground">
          View your current plan, manage payment methods, and download
          invoices.
        </p>
      </div>
      <ProviderBillingDashboard />
    </div>
  );
}
