import { ProfileAnalytics } from "@/features/care-provider/components/profile-analytics";

export const metadata = { title: "Analytics — SandiLink", description: "Profile performance analytics" };

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Profile Analytics</h2>
        <p className="text-sm text-muted-foreground">Track how patients find and interact with your profile.</p>
      </div>
      <ProfileAnalytics />
    </div>
  );
}

