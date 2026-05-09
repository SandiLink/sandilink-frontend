import { StudentSettings } from "@/features/student/components/student-settings";

export const metadata = { title: "Settings — SandiLink", description: "Student account settings" };

export default function StudentSettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Account Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account security and notifications.</p>
      </div>
      <StudentSettings />
    </div>
  );
}
