import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  BookOpen, CalendarDays, Check, Clock, FileText, GraduationCap,
  MapPin, MessageSquare, Search, TrendingUp, Upload, X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statActivePlacements", value: "1", description: "Family Medicine — Dr. Williams", icon: BookOpen, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statPendingRequests", descKey: "statPendingRequestsDesc", value: "2", icon: Clock, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  { titleKey: "statHoursCompleted", descKey: "statHoursCompletedDesc", descParams: { total: 640 }, value: "320", trend: "50%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statCredentials", descKey: "statCredentialsDesc", descParams: { pending: 1 }, value: "4/5", icon: FileText, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
];

const ACTIVE_PLACEMENTS = [
  { id: "pl-001", preceptor: "Dr. Robert Williams", initials: "RW", specialty: "Family Medicine", location: "City Health Clinic", startDate: "Jan 15, 2026", endDate: "May 15, 2026", hours: "320/640", status: "active" },
];

const PENDING_REQUESTS = [
  { id: "pr-001", preceptor: "Dr. Maria Garcia", initials: "MG", specialty: "Pediatrics", location: "Children's Hospital", requestDate: "Mar 28, 2026" },
  { id: "pr-002", preceptor: "Dr. Kevin Park", initials: "KP", specialty: "Emergency Medicine", location: "Metro General ER", requestDate: "Mar 30, 2026" },
];

export async function StudentDashboardHome() {
  const t = await getTranslations("dashboards.student");
  const tCard = await getTranslations("dashboardCard.student");
  const tShared = await getTranslations("dashboardCard.shared");
  const tStatus = await getTranslations("dashboardCard.status");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("welcomeBack")}</h2>
        <p className="text-sm text-muted-foreground">{t("welcomeSubhead")}</p>
      </div>

      {/* Stats */}
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
                {stat.trend && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{stat.trend}</span>}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {stat.descKey ? tCard(stat.descKey, stat.descParams ?? {}) : stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Active placements */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionActivePlacements")}</CardTitle>
              <CardDescription>{tCard("sectionActivePlacementsDesc")}</CardDescription>
              <CardAction><Button variant="outline" size="sm" asChild><Link href="/student/placements">{tShared("viewAll")}</Link></Button></CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {ACTIVE_PLACEMENTS.map((p) => (
                  <div key={p.id} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar><AvatarFallback className="bg-primary/10 text-primary text-xs">{p.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.preceptor}</p>
                        <p className="text-xs text-muted-foreground">{p.specialty}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="size-3" />{p.location}</span>
                          <span className="flex items-center gap-1"><CalendarDays className="size-3" />{p.startDate} — {p.endDate}</span>
                        </div>
                      </div>
                      <Badge>{tStatus("active")}</Badge>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{tCard("clinicalHoursLabel")}</span>
                        <span className="font-medium">{p.hours} hrs</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionPendingRequests")}</CardTitle>
              <CardDescription>{tCard("sectionPendingRequestsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {PENDING_REQUESTS.map((req) => (
                  <div key={req.id} className="rounded-xl border p-3.5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{req.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{req.preceptor}</p>
                        <p className="text-xs text-muted-foreground">{req.specialty}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="size-3" />{req.location}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{tCard("sentLabel", { date: req.requestDate })}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{tStatus("pending")}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { titleKey: "actionFindPreceptors", icon: Search, href: "/student/preceptors", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
          { titleKey: "actionUploadCredentials", icon: Upload, href: "/student/credentials", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
          { titleKey: "actionMessages", icon: MessageSquare, href: "/student/messages", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
          { titleKey: "actionMyProfile", icon: GraduationCap, href: "/student/profile", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="flex items-center gap-3 rounded-xl border p-3.5 transition-colors hover:bg-muted/50">
            <div className={`flex size-9 items-center justify-center rounded-lg ${a.color}`}><a.icon className="size-4" /></div>
            <span className="text-sm font-medium">{tCard(a.titleKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
