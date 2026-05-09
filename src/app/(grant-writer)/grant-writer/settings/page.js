import { GrantWriterSettings } from "@/features/grant-writer/components/grant-writer-settings";

export const metadata = { title: "Settings — SandiLink", description: "Grant writer account settings" };

export default function GrantWriterSettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Account Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account security, notifications, and preferences.</p>
      </div>
      <GrantWriterSettings />
    </div>
  );
}
