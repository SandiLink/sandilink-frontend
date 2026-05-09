import { getTranslations } from "next-intl/server";
import { StudentProfileForm } from "@/features/student/components/student-profile-form";

export const metadata = { title: "Profile — SandiLink", description: "Student profile setup" };

export default async function StudentProfilePage() {
  const t = await getTranslations("profilePages.student");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <StudentProfileForm />
    </div>
  );
}
