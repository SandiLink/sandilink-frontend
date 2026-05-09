import { ProviderSettings } from "@/features/care-provider/components/provider-settings";

export const metadata = {
  title: "Settings — SandiLink",
  description: "Manage your provider account settings",
};

export default function ProviderSettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Account Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your account security, notifications, and data.
        </p>
      </div>
      <ProviderSettings />
    </div>
  );
}
