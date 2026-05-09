import { getTranslations } from "next-intl/server";
import { GrantDirectory } from "@/features/grant-writer/components/grant-directory";
import { PublicDirectoryHero } from "@/components/shared/public-directory-hero";

export const metadata = {
  title: "Browse open grants — SandiLink",
  description:
    "Explore upcoming grants across NIH, NSF, WHO, RWJF, PCORI, and more. Filter by funder, deadline, and amount. Sign up free to track grants and connect with writers.",
};

export default async function PublicGrantsPage() {
  const t = await getTranslations("publicDirectories.grants");
  return (
    <div>
      <PublicDirectoryHero title={t("title")} description={t("description")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <GrantDirectory />
      </div>
    </div>
  );
}
