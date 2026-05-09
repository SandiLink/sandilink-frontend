import { InstitutionPlacements } from "@/features/institution/components/institution-placements";
import { Suspense } from "react";
export const metadata = { title: "Placements — SandiLink" };
export default function PlacementsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Student Placements
          </h2>
          <p className="text-sm text-muted-foreground">
            Overview of all student placements and their status.
          </p>
        </div>
        <InstitutionPlacements />
      </div>
    </Suspense>
  );
}
