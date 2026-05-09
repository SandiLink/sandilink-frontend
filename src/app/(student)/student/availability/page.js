import { AvailabilityConfig } from "@/features/student/components/availability-config";

export const metadata = { title: "Availability — SandiLink", description: "Configure your availability" };

export default function AvailabilityPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Availability</h2>
        <p className="text-sm text-muted-foreground">Set when you're available for clinical rotations.</p>
      </div>
      <AvailabilityConfig />
    </div>
  );
}
