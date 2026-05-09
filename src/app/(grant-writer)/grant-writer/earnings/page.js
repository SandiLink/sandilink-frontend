import { Suspense } from "react";
import { EarningsDashboard } from "@/features/grant-writer/components/earnings-dashboard";

export const metadata = { title: "Earnings — SandiLink", description: "Track your grant writing earnings" };

export default function EarningsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <EarningsDashboard />
    </Suspense>
  );
}
