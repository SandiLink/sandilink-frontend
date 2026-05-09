import { getTranslations } from "next-intl/server";
import { PreceptorSearch } from "@/features/student/components/preceptor-search";
import { PublicDirectoryHero } from "@/components/shared/public-directory-hero";

export const metadata = {
  title: "Find a preceptor — SandiLink",
  description:
    "Browse preceptors accepting nursing, PA, and DNP students. Filter by specialty, location, and program. Sign up free to request a placement.",
};

export default async function PublicPreceptorsPage() {
  const t = await getTranslations("publicDirectories.preceptors");
  return (
    <div>
      <PublicDirectoryHero title={t("title")} description={t("description")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PreceptorSearch />
      </div>
    </div>
  );
}
