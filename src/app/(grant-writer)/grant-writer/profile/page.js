import { getTranslations } from "next-intl/server";
import { GrantWriterProfileForm } from "@/features/grant-writer/components/grant-writer-profile-form";

export const metadata = { title: "Profile — SandiLink", description: "Grant writer profile setup" };

export default async function GrantWriterProfilePage() {
  const t = await getTranslations("profilePages.grantWriter");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <GrantWriterProfileForm />
    </div>
  );
}
