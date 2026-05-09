import { SpecialtyPreferences } from "@/features/student/components/specialty-preferences";

export const metadata = { title: "Preferences — SandiLink", description: "Specialty preferences" };

export default function PreferencesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Specialty Preferences</h2>
        <p className="text-sm text-muted-foreground">Set your preferred clinical specialties and placement criteria.</p>
      </div>
      <SpecialtyPreferences />
    </div>
  );
}
