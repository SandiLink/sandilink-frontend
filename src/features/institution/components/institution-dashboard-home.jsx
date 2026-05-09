import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BarChart3, BookOpen, CalendarDays, CheckCircle2, Clock, ClipboardList, FileText, GraduationCap, MapPin, MessageSquare, Search, TrendingUp, Upload, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statTotalStudents", descKey: "statTotalStudentsDesc", descParams: { active: 12 }, value: "48", icon: Users, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statActivePlacements", descKey: "statActivePlacementsDesc", descParams: { count: 8 }, value: "12", icon: ClipboardList, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statPendingRequests", descKey: "statPendingRequestsDesc", value: "3", icon: Clock, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  { titleKey: "statPlacementRate", descKey: "statPlacementRateDesc", descParams: { trend: "+5%" }, value: "92%", trend: "+5%", icon: TrendingUp, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
];

const RECENT_PLACEMENTS = [
  { student: "Jane Smith", initials: "JS", preceptor: "Dr. Williams", specialty: "Family Medicine", status: "active", hours: "320/640" },
  { student: "Tom Lee", initials: "TL", preceptor: "Dr. Garcia", specialty: "Pediatrics", status: "pending", hours: null },
  { student: "Sara Kim", initials: "SK", preceptor: "Dr. Park", specialty: "Emergency Medicine", status: "active", hours: "180/480" },
  { student: "Mike Brown", initials: "MB", preceptor: "Dr. Chen", specialty: "Internal Medicine", status: "pending", hours: null },
];

const statusConfig = { active: { labelKey: "active", variant: "default" }, pending: { labelKey: "pending", variant: "secondary" } };

export async function InstitutionDashboardHome() {
  const t = await getTranslations("dashboards.institution");
  const tCard = await getTranslations("dashboardCard.institution");
  const tShared = await getTranslations("dashboardCard.shared");
  const tStatus = await getTranslations("dashboardCard.status");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("pageTitle")}</h2>
        <p className="text-sm text-muted-foreground">{t("welcomeSubhead")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.titleKey} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{tCard(stat.titleKey)}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${stat.color}`}><stat.icon className="size-4" /></div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-heading tracking-tight">{stat.value}</span>
                {stat.trend && <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"><TrendingUp className="size-3" />{stat.trend}</span>}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{tCard(stat.descKey, stat.descParams ?? {})}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionRecentPlacements")}</CardTitle>
              <CardDescription>{tCard("sectionRecentPlacementsDesc")}</CardDescription>
              <CardAction><Button variant="outline" size="sm" asChild><Link href="/institution/placements">{tShared("viewAll")}</Link></Button></CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {RECENT_PLACEMENTS.map((p) => {
                  const s = statusConfig[p.status];
                  return (
                    <div key={p.student} className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50">
                      <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{p.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.student}</p>
                        <p className="text-xs text-muted-foreground">{p.preceptor} — {p.specialty}</p>
                      </div>
                      {p.hours && <span className="text-xs text-muted-foreground">{p.hours} hrs</span>}
                      <Badge variant={s.variant}>{tStatus(s.labelKey)}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <CardHeader><CardTitle>{tShared("quickActions")}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {[
                  { titleKey: "actionManageStudents", icon: Users, href: "/institution/students", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
                  { titleKey: "actionFindPreceptors", icon: Search, href: "/institution/preceptors", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
                  { titleKey: "actionAssignPlacements", icon: ClipboardList, href: "/institution/placements/assign", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
                  { titleKey: "actionImportStudents", icon: Upload, href: "/institution/students/import", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
                  { titleKey: "actionViewReports", icon: BarChart3, href: "/institution/reports", color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950" },
                  { titleKey: "actionAgreements", icon: FileText, href: "/institution/agreements", color: "text-cyan-600 bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-950" },
                ].map((a) => (
                  <Link key={a.href} href={a.href} className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50">
                    <div className={`flex size-9 items-center justify-center rounded-lg ${a.color}`}><a.icon className="size-4" /></div>
                    <span className="text-sm font-medium">{tCard(a.titleKey)}</span>
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
