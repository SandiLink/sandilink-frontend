import { getTranslations } from "next-intl/server";
import { ProviderProfileForm } from "@/features/care-provider/components/provider-profile-form";

export const metadata = {
  title: "Provider Profile — SandiLink",
  description: "Manage your provider profile",
};

export default async function ProviderProfilePage() {
  const t = await getTranslations("profilePages.provider");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <ProviderProfileForm />
    </div>
  );
}
