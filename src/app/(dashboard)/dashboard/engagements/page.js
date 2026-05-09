import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { BookingsDashboard } from "@/features/service-user/components/bookings-dashboard";

export const metadata = {
  title: "My Engagements — SandiLink",
  description: "View and manage your appointments and projects",
};

export default async function EngagementsPage() {
  const t = await getTranslations("serviceUserPages.engagements");
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>

        <BookingsDashboard />
      </div>
    </Suspense>
  );
}

