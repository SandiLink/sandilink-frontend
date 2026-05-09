import { getTranslations } from "next-intl/server";
import { ProfileForm } from "@/features/service-user/components/profile-form";

export const metadata = {
  title: "Profile — SandiLink",
  description: "Manage your profile information",
};

export default async function ProfilePage() {
  const t = await getTranslations("serviceUserPages.profile");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>

      <ProfileForm />
    </div>
  );
}
