import { ScheduleManager } from "@/features/care-provider/components/schedule-manager";
import { Suspense } from "react";

export const metadata = {
  title: "Schedule — SandiLink",
  description: "Manage your availability and schedule",
};

export default function SchedulePage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Schedule
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your availability and view upcoming appointments.
          </p>
        </div>
        <ScheduleManager />
      </div>
    </Suspense>
  );
}
