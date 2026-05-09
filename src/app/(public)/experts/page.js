import { getTranslations } from "next-intl/server";
import { ProviderSearch } from "@/features/service-user/components/provider-search";
import { PublicDirectoryHero } from "@/components/shared/public-directory-hero";

export const metadata = {
  title: "Find a healthcare expert — SandiLink",
  description:
    "Browse verified clinicians, therapists, nurses, researchers, grant writers, preceptors, and mentors on SandiLink. Filter by specialty, delivery mode, language, and credential.",
};

export default async function PublicExpertsPage() {
  const t = await getTranslations("publicDirectories.experts");
  return (
    <div>
      <PublicDirectoryHero title={t("title")} description={t("description")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProviderSearch />
      </div>
    </div>
  );
}
