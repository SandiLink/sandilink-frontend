import { EarningsDashboard } from "@/features/care-provider/components/earnings-dashboard";

export const metadata = { title: "Earnings — SandiLink", description: "View your earnings and payout history" };

export default function EarningsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Earnings</h2>
        <p className="text-sm text-muted-foreground">Track your revenue, payouts, and financial performance.</p>
      </div>
      <EarningsDashboard />
    </div>
  );
}
