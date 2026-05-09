import { getTranslations } from "next-intl/server";
import { PublicJournalsDirectory } from "@/features/public/components/journals-directory";
import { PublicDirectoryHero } from "@/components/shared/public-directory-hero";

export const metadata = {
  title: "Browse journals — SandiLink",
  description:
    "Browse peer-reviewed journals across digital health, biomedical, public health, and informatics. Compare impact factor, access type, and scope.",
};

export default async function PublicJournalsPage() {
  const t = await getTranslations("publicDirectories.journals");
  return (
    <div>
      <PublicDirectoryHero title={t("title")} description={t("description")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PublicJournalsDirectory />
      </div>
    </div>
  );
}
