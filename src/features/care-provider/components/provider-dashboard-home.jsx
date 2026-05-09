import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  CalendarCheck2,
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Video,
  Building,
  Check,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STATS = [
  { titleKey: "statTodaysEngagements", descKey: "statTodaysEngagementsDesc", descParams: { virtual: 2, inPerson: 3 }, value: "5", icon: CalendarDays, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statPendingRequests", descKey: "statPendingRequestsDesc", value: "4", icon: Clock, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  { titleKey: "statMonthlyEarnings", descKey: "statMonthlyEarningsDesc", descParams: { trend: "+12%" }, value: "$4,280", trend: "+12%", icon: DollarSign, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statOverallRating", descKey: "statOverallRatingDesc", descParams: { count: 124 }, value: "4.9", icon: Star, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
];

const TODAYS_SCHEDULE = [
  { id: "1", patient: "John Doe", initials: "JD", time: "9:00 AM", type: "Virtual", status: "completed", specialty: "Check-up" },
  { id: "2", patient: "Alice Martin", initials: "AM", time: "10:00 AM", type: "In-person", status: "in-progress", specialty: "Follow-up" },
  { id: "3", patient: "Bob Williams", initials: "BW", time: "11:30 AM", type: "Virtual", status: "upcoming", specialty: "New patient" },
  { id: "4", patient: "Carol Taylor", initials: "CT", time: "2:00 PM", type: "In-person", status: "upcoming", specialty: "Consultation" },
  { id: "5", patient: "David Lee", initials: "DL", time: "3:30 PM", type: "Virtual", status: "upcoming", specialty: "Follow-up" },
];

const PENDING_REQUESTS = [
  { id: "r1", patient: "Emma Garcia", initials: "EG", date: "Apr 3, 2026", time: "10:00 AM", type: "Virtual", reason: "Annual check-up" },
  { id: "r2", patient: "Frank Brown", initials: "FB", date: "Apr 4, 2026", time: "2:30 PM", type: "In-person", reason: "New health issue" },
  { id: "r3", patient: "Grace Kim", initials: "GK", date: "Apr 5, 2026", time: "9:00 AM", type: "Virtual", reason: "Follow-up visit" },
];

const scheduleStatusConfig = {
  completed: { labelKey: "completed", class: "text-emerald-600 dark:text-emerald-400" },
  "in-progress": { labelKey: "inProgress", class: "text-blue-600 dark:text-blue-400" },
  upcoming: { labelKey: "upcoming", class: "text-muted-foreground" },
};

export async function ProviderDashboardHome() {
  const t = await getTranslations("dashboards.provider");
  const tCard = await getTranslations("dashboardCard.provider");
  const tShared = await getTranslations("dashboardCard.shared");
  const tStatus = await getTranslations("dashboardCard.status");
  return (
    <div className="grid gap-6">
      {/* Welcome */}
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("greetingMorning")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("welcomeSubhead", { engagements: 5, requests: 4 })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.titleKey} size="sm" className="relative overflow-hidden">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{tCard(stat.titleKey)}</p>
                <div className={`flex size-8 max-w-8 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-heading tracking-tight">{stat.value}</span>
                {stat.trend && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-3" />{stat.trend}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{tCard(stat.descKey, stat.descParams ?? {})}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Today's Schedule */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionTodaysSchedule")}</CardTitle>
              <CardDescription>Wednesday, April 1, 2026</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/provider/schedule">{tShared("fullSchedule")}</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {TODAYS_SCHEDULE.map((appt) => {
                  const statusCfg = scheduleStatusConfig[appt.status];
                  const isVirtual = appt.type === "Virtual";
                  return (
                    <div key={appt.id} className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50">
                      <div className="w-16 shrink-0 text-center">
                        <p className="text-sm font-medium">{appt.time}</p>
                      </div>
                      <div className="h-10 w-px bg-border" />
                      <Avatar size="sm">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{appt.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{appt.patient}</p>
                        <p className="text-xs text-muted-foreground">{appt.specialty}</p>
                      </div>
                      <Badge variant="outline" className="gap-1 text-xs">
                        {isVirtual ? <Video className="size-3" /> : <Building className="size-3" />}
                        {isVirtual ? tStatus("virtual") : tStatus("inPerson")}
                      </Badge>
                      <span className={`text-xs font-medium ${statusCfg.class}`}>{tStatus(statusCfg.labelKey)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionPendingRequests")}</CardTitle>
              <CardDescription>{tCard("sectionPendingRequestsDesc")}</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/provider/work">{tShared("viewAll")}</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {PENDING_REQUESTS.map((req) => (
                  <div key={req.id} className="rounded-xl border p-3.5 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{req.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{req.patient}</p>
                        <p className="text-xs text-muted-foreground">{req.reason}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="size-3" />{req.date}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" />{req.time}</span>
                      <span className="flex items-center gap-1">
                        {req.type === "Virtual" ? <Video className="size-3" /> : <Building className="size-3" />}
                        {req.type === "Virtual" ? tStatus("virtual") : tStatus("inPerson")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 flex-1 text-xs">
                        <Check className="size-3" data-icon="inline-start" />{tShared("accept")}
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 flex-1 text-xs">
                        <X className="size-3" data-icon="inline-start" />{tShared("decline")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { titleKey: "actionManageSchedule", icon: CalendarDays, href: "/provider/schedule", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
          { titleKey: "actionViewMessages", icon: MessageSquare, href: "/provider/messages", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
          { titleKey: "actionEarnings", icon: CreditCard, href: "/provider/earnings", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
          { titleKey: "actionClientReviews", icon: Star, href: "/provider/reviews", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="flex items-center gap-3 rounded-xl border p-3.5 transition-colors hover:bg-muted/50">
            <div className={`flex size-9 items-center justify-center rounded-lg ${action.color}`}>
              <action.icon className="size-4" />
            </div>
            <span className="text-sm font-medium">{tCard(action.titleKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
