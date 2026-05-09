import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  FlaskConical,
  MessageSquare,
  Search,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statActiveProjects", descKey: "statActiveProjectsDesc", descParams: { funded: 2, inProgress: 1 }, value: "3", icon: FlaskConical, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statGrantApplications", descKey: "statGrantApplicationsDesc", descParams: { awarded: 2, pending: 1 }, value: "5", trend: "40%", icon: Award, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statPublications", descKey: "statPublicationsDesc", descParams: { review: 3 }, value: "12", icon: FileText, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { titleKey: "statHIndex", descKey: "statHIndexDesc", descParams: { trend: "+2" }, value: "18", trend: "+2", icon: TrendingUp, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const ACTIVE_GRANTS = [
  { id: "gr-001", name: "NIH R01 — Community Health Disparities", funder: "National Institutes of Health", amount: "$425,000", status: "Awarded", statusColor: "default", startDate: "Jan 2026", endDate: "Dec 2028", progress: 35 },
  { id: "gr-002", name: "NSF CAREER — AI in Clinical Diagnostics", funder: "National Science Foundation", amount: "$550,000", status: "Awarded", statusColor: "default", startDate: "Mar 2025", endDate: "Feb 2030", progress: 20 },
  { id: "gr-003", name: "WHO Research Grant — Global Vaccine Access", funder: "World Health Organization", amount: "$120,000", status: "Pending Review", statusColor: "secondary", startDate: "—", endDate: "—", progress: 0 },
];

const UPCOMING_DEADLINES = [
  { title: "NIH R21 — Mental Health Interventions", deadline: "Apr 15, 2026", daysLeft: 9, type: "Grant Application" },
  { title: "Journal of Clinical Research — Manuscript Revision", deadline: "Apr 20, 2026", daysLeft: 14, type: "Manuscript Revision" },
  { title: "Gates Foundation — Global Health Innovation", deadline: "May 1, 2026", daysLeft: 25, type: "Grant Application" },
  { title: "Annual Progress Report — NIH R01", deadline: "May 10, 2026", daysLeft: 34, type: "Report" },
];

const RECENT_PUBLICATIONS = [
  { id: "pub-001", title: "Machine Learning Approaches to Early Disease Detection in Underserved Communities", journal: "The Lancet Digital Health", date: "Feb 2026", status: "Published", citations: 14 },
  { id: "pub-002", title: "Community-Based Participatory Research in Rural Healthcare Settings", journal: "American Journal of Public Health", date: "Mar 2026", status: "Under Review", citations: 0 },
];

export async function ResearcherDashboardHome() {
  const t = await getTranslations("dashboards.researcher");
  const tCard = await getTranslations("dashboardCard.researcher");
  const tShared = await getTranslations("dashboardCard.shared");
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
              <p className="mt-0.5 text-xs text-muted-foreground">{tCard(stat.descKey, stat.descParams ?? {})}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Active Grants */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionActiveGrants")}</CardTitle>
              <CardDescription>{tCard("sectionActiveGrantsDesc")}</CardDescription>
              <CardAction><Button variant="outline" size="sm" asChild><Link href="/researcher/grants">{tShared("viewAll")}</Link></Button></CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {ACTIVE_GRANTS.map((grant) => (
                  <div key={grant.id} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{grant.name}</p>
                        <p className="text-xs text-muted-foreground">{grant.funder}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Award className="size-3" />{grant.amount}</span>
                          <span className="flex items-center gap-1"><Calendar className="size-3" />{grant.startDate} — {grant.endDate}</span>
                        </div>
                      </div>
                      <Badge variant={grant.statusColor}>{grant.status}</Badge>
                    </div>
                    {grant.progress > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{tShared("projectProgress")}</span>
                          <span className="font-medium">{grant.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${grant.progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionUpcomingDeadlines")}</CardTitle>
              <CardDescription>{tCard("sectionUpcomingDeadlinesDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {UPCOMING_DEADLINES.map((item) => (
                  <div key={item.title} className="rounded-xl border p-3.5 space-y-1.5">
                    <p className="text-sm font-medium leading-snug">{item.title}</p>
                    <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="size-3" />{item.deadline}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span className={item.daysLeft <= 10 ? "text-destructive font-medium" : ""}>{item.daysLeft} days left</span>
                      </span>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{item.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Publications */}
      <Card>
        <CardHeader>
          <CardTitle>{tCard("sectionRecentPublications")}</CardTitle>
          <CardDescription>{tCard("sectionRecentPublicationsDesc")}</CardDescription>
          <CardAction><Button variant="outline" size="sm" asChild><Link href="/researcher/publications">{tShared("viewAll")}</Link></Button></CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {RECENT_PUBLICATIONS.map((pub) => (
              <div key={pub.id} className="flex items-start gap-3 rounded-xl border p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                  <FileText className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug">{pub.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{pub.journal} · {pub.date}</p>
                  {pub.citations > 0 && <p className="mt-0.5 text-xs text-muted-foreground">{pub.citations} citations</p>}
                </div>
                <Badge variant={pub.status === "Published" ? "default" : "secondary"}>{pub.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { titleKey: "actionFindGrants", icon: Search, href: "/researcher/grants/search", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
          { titleKey: "actionSubmitManuscript", icon: Send, href: "/researcher/submissions", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
          { titleKey: "actionFindGrantWriters", icon: Users, href: "/researcher/grant-writers", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
          { titleKey: "actionBrowseJournals", icon: BookOpen, href: "/researcher/journals", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
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
