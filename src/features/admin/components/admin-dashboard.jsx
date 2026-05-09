import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BarChart3, CalendarCheck2, CreditCard, DollarSign, Flag, Gavel, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statTotalUsers", trendKey: "statTotalUsersTrend", value: "12,847", icon: Users, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statActiveBookings", trendKey: "statActiveBookingsTrend", value: "1,234", icon: CalendarCheck2, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statRevenueMtd", trendKey: "statRevenueMtdTrend", value: "$48,290", icon: DollarSign, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { titleKey: "statActivePlacements", trendKey: "statActivePlacementsTrend", value: "342", icon: TrendingUp, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const REGISTRATIONS = [
  { roleKey: "roleServiceUsers", count: 8420, pct: 100, color: "bg-blue-500" },
  { roleKey: "roleCareProviders", count: 2150, pct: 26, color: "bg-emerald-500" },
  { roleKey: "roleStudents", count: 1480, pct: 18, color: "bg-violet-500" },
  { roleKey: "roleInstitutions", count: 45, pct: 1, color: "bg-amber-500" },
  { roleKey: "rolePreceptors", count: 752, pct: 9, color: "bg-rose-500" },
];

const ALERTS = [
  { type: "dispute", labelKey: "alertOpenDisputes", labelParams: { count: 2 }, descKey: "alertOpenDisputesDesc", href: "/admin/disputes", severity: "warning" },
  { type: "flagged", labelKey: "alertFlaggedReviews", labelParams: { count: 3 }, descKey: "alertFlaggedReviewsDesc", href: "/admin/flagged", severity: "warning" },
  { type: "approval", labelKey: "alertPendingApprovals", labelParams: { count: 5 }, descKey: "alertPendingApprovalsDesc", href: "/admin/users", severity: "info" },
];

const QUICK_ACTIONS = [
  { titleKey: "actionViewUsers", icon: Users, href: "/admin/users", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "actionAnalytics", icon: BarChart3, href: "/admin/analytics", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "actionDisputes", icon: Gavel, href: "/admin/disputes", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  { titleKey: "actionRevenue", icon: CreditCard, href: "/admin/config/commission", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { titleKey: "actionFlagged", icon: Flag, href: "/admin/flagged", color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950" },
  { titleKey: "actionAuditLogs", icon: BarChart3, href: "/admin/audit", color: "text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-950" },
];

export async function AdminDashboard() {
  const t = await getTranslations("dashboards.admin");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("pageTitle")}</h2>
        <p className="text-sm text-muted-foreground">{t("welcomeSubhead")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.titleKey} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{t(s.titleKey)}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">{s.value}</p>
              <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">{t(s.trendKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      {ALERTS.length > 0 && (
        <div className="grid gap-2">
          {ALERTS.map((a) => (
            <Link
              key={a.type}
              href={a.href}
              className={`flex items-center justify-between rounded-lg border p-3.5 transition-colors hover:bg-muted/50 ${a.severity === "warning" ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30" : ""}`}
            >
              <div className="flex items-center gap-3">
                {a.severity === "warning"
                  ? <Flag className="size-4 text-amber-600 dark:text-amber-400" />
                  : <Users className="size-4 text-blue-600 dark:text-blue-400" />}
                <div>
                  <p className="text-sm font-medium">{t(a.labelKey, a.labelParams)}</p>
                  <p className="text-xs text-muted-foreground">{t(a.descKey)}</p>
                </div>
              </div>
              <Badge variant={a.severity === "warning" ? "secondary" : "outline"}>
                {t("reviewBadge")}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("registrationHeading")}</CardTitle>
              <CardDescription>{t("registrationSub")}</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/analytics">{t("fullAnalytics")}</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {REGISTRATIONS.map((r) => (
                  <div key={r.roleKey} className="flex items-center gap-3">
                    <span className="w-28 text-sm text-muted-foreground">{t(r.roleKey)}</span>
                    <div className="flex-1">
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                    <span className="w-14 text-right text-sm font-medium">{r.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>{t("quickActions")}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {QUICK_ACTIONS.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className={`flex size-9 items-center justify-center rounded-lg ${a.color}`}>
                      <a.icon className="size-4" />
                    </div>
                    <span className="text-sm font-medium">{t(a.titleKey)}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
