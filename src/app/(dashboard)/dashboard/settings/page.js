import { getTranslations } from "next-intl/server";
import { SettingsForm } from "@/features/service-user/components/settings-form";

export const metadata = {
  title: "Settings — SandiLink",
  description: "Manage your account settings",
};

export default async function SettingsPage() {
  const t = await getTranslations("serviceUserPages.settings");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>

      <SettingsForm />
    </div>
  );
}
