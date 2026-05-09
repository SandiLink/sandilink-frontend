import { PlacementsDashboard } from "@/features/student/components/placements-dashboard";
import { Suspense } from "react";

export const metadata = {
  title: "My Placements — SandiLink",
  description: "View and manage your clinical placements",
};

export default function PlacementsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            My Placements
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your active placements, pending requests, and placement
            history.
          </p>
        </div>
        <PlacementsDashboard />
      </div>
    </Suspense>
  );
}
