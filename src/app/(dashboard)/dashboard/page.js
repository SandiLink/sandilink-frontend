import { getTranslations } from "next-intl/server";
import { StatsCards } from "@/features/service-user/components/stats-cards";
import { UpcomingBookings } from "@/features/service-user/components/upcoming-bookings";
import { RecentActivity } from "@/features/service-user/components/recent-activity";
import { QuickActions } from "@/features/service-user/components/quick-actions";

export const metadata = {
  title: "Dashboard — SandiLink",
  description: "Your SandiLink dashboard overview",
};

export default async function DashboardPage() {
  const t = await getTranslations("dashboards.serviceUser");
  return (
    <div className="grid gap-6">
      {/* Welcome */}
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("welcomeBack")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("welcomeSubhead")}</p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingBookings />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Activity */}
      <RecentActivity />
    </div>
  );
}
