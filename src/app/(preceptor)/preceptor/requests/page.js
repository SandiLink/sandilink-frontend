import { PlacementRequests } from "@/features/preceptor/components/placement-requests";
import { Suspense } from "react";
export const metadata = { title: "Placement Requests — SandiLink" };
export default function RequestsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Placement Requests
          </h2>
          <p className="text-sm text-muted-foreground">
            Review and respond to incoming student placement requests.
          </p>
        </div>
        <PlacementRequests />
      </div>
    </Suspense>
  );
}
