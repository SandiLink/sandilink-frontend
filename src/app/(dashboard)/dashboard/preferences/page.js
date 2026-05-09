import { getTranslations } from "next-intl/server";
import { PreferencesForm } from "@/features/service-user/components/preferences-form";

export const metadata = {
  title: "Preferences — SandiLink",
  description: "Configure your preferences",
};

export default async function PreferencesPage() {
  const t = await getTranslations("serviceUserPages.preferences");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>

      <PreferencesForm />
    </div>
  );
}
