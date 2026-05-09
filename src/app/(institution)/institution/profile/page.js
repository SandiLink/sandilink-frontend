import { getTranslations } from "next-intl/server";
import { InstitutionProfileForm } from "@/features/institution/components/institution-profile-form";

export const metadata = { title: "Organization Profile — SandiLink" };

export default async function InstitutionProfilePage() {
  const t = await getTranslations("profilePages.institution");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <InstitutionProfileForm />
    </div>
  );
}
