import { ProviderBookings } from "@/features/care-provider/components/provider-bookings";
import { Suspense } from "react";

export const metadata = {
  title: "My Work — SandiLink",
  description: "Manage appointments, projects, and requests",
};

export default function ProviderWorkPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            My Work
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage incoming requests, scheduled appointments, and active
            projects.
          </p>
        </div>
        <ProviderBookings />
      </div>
    </Suspense>
  );
}
