import { Suspense } from "react";
import DisputesDashboard from "@/features/admin/components/disputes-dashboard";

export const metadata = {
  title: "Disputes — SandiLink",
};

export default function DisputesPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <DisputesDashboard />
    </Suspense>
  );
}
