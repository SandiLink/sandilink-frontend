import { ResearcherSettings } from "@/features/researcher/components/researcher-settings";

export const metadata = { title: "Settings — SandiLink", description: "Researcher account settings" };

export default function ResearcherSettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Account Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account security, notifications, and preferences.</p>
      </div>
      <ResearcherSettings />
    </div>
  );
}
