import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CalendarDays, Check, Clock, ClipboardList, GraduationCap, MapPin, MessageSquare, TrendingUp, Users, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statActiveStudents", descKey: "statActiveStudentsDesc", descParams: { max: 4 }, value: "3", icon: Users, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statPendingRequests", descKey: "statPendingRequestsDesc", value: "3", icon: Clock, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  { titleKey: "statTotalMentored", descKey: "statTotalMentoredDesc", value: "52", icon: GraduationCap, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statAvgRating", descKey: "statAvgRatingDesc", descParams: { count: 42 }, value: "4.9", icon: TrendingUp, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
];

const ACTIVE_STUDENTS = [
  { id: "jane-smith", name: "Jane Smith", initials: "JS", program: "BSN — 3rd Year", institution: "State University", hours: "320/640", startDate: "Jan 15, 2026" },
  { id: "sara-kim", name: "Sara Kim", initials: "SK", program: "MSN — 2nd Year", institution: "State University", hours: "180/480", startDate: "Feb 1, 2026" },
  { id: "tom-lee", name: "Tom Lee", initials: "TL", program: "BSN — 3rd Year", institution: "City College", hours: "90/320", startDate: "Mar 1, 2026" },
];

const PENDING = [
  { id: "r1", student: "Emily Davis", initials: "ED", program: "BSN — 1st Year", institution: "State University", requestDate: "Apr 1, 2026" },
  { id: "r2", student: "Alex Wong", initials: "AW", program: "BSN — 3rd Year", institution: "State University", requestDate: "Apr 2, 2026" },
  { id: "r3", student: "Chris Taylor", initials: "CT", program: "PA — 2nd Year", institution: "Medical College", requestDate: "Apr 3, 2026" },
];

export async function PreceptorDashboardHome() {
  const t = await getTranslations("dashboards.preceptor");
  const tCard = await getTranslations("dashboardCard.preceptor");
  const tShared = await getTranslations("dashboardCard.shared");
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">{t("welcomeBack")}</h2>
        <p className="text-sm text-muted-foreground">{t("welcomeSubhead")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.titleKey} size="sm"><CardContent className="pt-4">
            <div className="flex items-center justify-between gap-1"><p className="text-sm text-muted-foreground">{tCard(s.titleKey)}</p><div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}><s.icon className="size-4" /></div></div>
            <div className="mt-2"><span className="text-2xl font-semibold font-heading tracking-tight">{s.value}</span></div>
            <p className="mt-0.5 text-xs text-muted-foreground">{tCard(s.descKey, s.descParams ?? {})}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader><CardTitle>{tCard("sectionActiveStudents")}</CardTitle><CardDescription>{tCard("sectionActiveStudentsDesc")}</CardDescription><CardAction><Button variant="outline" size="sm" asChild><Link href="/preceptor/students">{tShared("viewAll")}</Link></Button></CardAction></CardHeader>
            <CardContent><div className="grid gap-3">
              {ACTIVE_STUDENTS.map((s) => {
                const pct = Math.round((Number.parseInt(s.hours) / Number.parseInt(s.hours.split("/")[1])) * 100);
                return (
                  <Link key={s.id} href={`/preceptor/students/${s.id}`} className="rounded-xl border p-3.5 space-y-2.5 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{s.initials}</AvatarFallback></Avatar>
                      <div className="flex-1"><p className="text-sm font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.program} — {s.institution}</p></div>
                      <span className="text-xs text-muted-foreground">{tCard("sinceLabel", { date: s.startDate })}</span>
                    </div>
                    <div><div className="flex items-center justify-between text-xs mb-1"><span className="text-muted-foreground">{tCard("hoursLabel")}</span><span className="font-medium">{s.hours} ({pct}%)</span></div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                    </div>
                  </Link>
                );
              })}
            </div></CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>{tCard("sectionPendingRequests")}</CardTitle><CardDescription>{tCard("sectionPendingRequestsDesc")}</CardDescription><CardAction><Button variant="outline" size="sm" asChild><Link href="/preceptor/requests">{tShared("viewAll")}</Link></Button></CardAction></CardHeader>
            <CardContent><div className="grid gap-3">
              {PENDING.map((r) => (
                <div key={r.id} className="rounded-xl border p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{r.initials}</AvatarFallback></Avatar>
                    <div className="flex-1"><p className="text-sm font-medium">{r.student}</p><p className="text-xs text-muted-foreground">{r.program}</p></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.institution} — {tCard("sinceLabel", { date: r.requestDate })}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-7 flex-1 text-xs"><Check className="size-3" data-icon="inline-start" />{tShared("accept")}</Button>
                    <Button size="sm" variant="outline" className="h-7 flex-1 text-xs"><X className="size-3" data-icon="inline-start" />{tShared("decline")}</Button>
                  </div>
                </div>
              ))}
            </div></CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { titleKey: "actionManageSchedule", icon: CalendarDays, href: "/preceptor/schedule", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
          { titleKey: "actionViewRequests", icon: ClipboardList, href: "/preceptor/requests", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
          { titleKey: "actionMessages", icon: MessageSquare, href: "/preceptor/messages", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
          { titleKey: "actionMyProfile", icon: Users, href: "/preceptor/profile", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
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
