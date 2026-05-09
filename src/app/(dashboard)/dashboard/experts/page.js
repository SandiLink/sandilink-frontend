import { getTranslations } from "next-intl/server";
import { ProviderSearch } from "@/features/service-user/components/provider-search";

export const metadata = {
  title: "Find Experts — SandiLink",
  description: "Search for professionals across healthcare, research, and mentorship",
};

export default async function ExpertsPage() {
  const t = await getTranslations("serviceUserPages.experts");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </div>

      <ProviderSearch />
    </div>
  );
}
