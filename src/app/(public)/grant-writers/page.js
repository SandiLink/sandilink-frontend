import { getTranslations } from "next-intl/server";
import { PublicGrantWriterDirectory } from "@/features/public/components/grant-writer-directory";
import { PublicDirectoryHero } from "@/components/shared/public-directory-hero";

export const metadata = {
  title: "Find a grant writer — SandiLink",
  description:
    "Browse verified grant writers with proven success rates across NIH, NSF, Gates Foundation, WHO, and more. Sign up free to message and contract a writer.",
};

export default async function PublicGrantWritersPage() {
  const t = await getTranslations("publicDirectories.grantWriters");
  return (
    <div>
      <PublicDirectoryHero title={t("title")} description={t("description")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PublicGrantWriterDirectory />
      </div>
    </div>
  );
}
