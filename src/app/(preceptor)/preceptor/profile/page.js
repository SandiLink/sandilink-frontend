import { getTranslations } from "next-intl/server";
import { PreceptorProfileForm } from "@/features/preceptor/components/preceptor-profile-form";

export const metadata = { title: "Profile — SandiLink" };

export default async function ProfilePage() {
  const t = await getTranslations("profilePages.preceptor");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <PreceptorProfileForm />
    </div>
  );
}
