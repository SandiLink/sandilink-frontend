import { getTranslations } from "next-intl/server";
import { ResearcherProfileForm } from "@/features/researcher/components/researcher-profile-form";

export const metadata = { title: "Profile — SandiLink", description: "Researcher profile setup" };

export default async function ResearcherProfilePage() {
  const t = await getTranslations("profilePages.researcher");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <ResearcherProfileForm />
    </div>
  );
}
