import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { titleKey: "statActiveProjects", descKey: "statActiveProjectsDesc", descParams: { proposals: 2, revisions: 1, reviews: 1 }, value: "4", icon: Briefcase, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { titleKey: "statEarningsMtd", descKey: "statEarningsMtdDesc", descParams: { trend: "+22%" }, value: "$8,450", trend: "+22%", icon: DollarSign, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { titleKey: "statSuccessRate", descKey: "statSuccessRateDesc", descParams: { won: 42, total: 54 }, value: "78%", icon: TrendingUp, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { titleKey: "statClientRating", descKey: "statClientRatingDesc", descParams: { count: 36 }, value: "4.9", icon: Star, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const ACTIVE_PROJECTS = [
  {
    id: "proj-001",
    client: "Dr. Amira Rashid",
    initials: "AR",
    grantTitle: "NIH R21 — Mental Health Interventions",
    type: "Full Proposal",
    deadline: "Apr 15, 2026",
    daysLeft: 9,
    status: "In Progress",
    progress: 60,
    amount: "$5,000",
  },
  {
    id: "proj-002",
    client: "Dr. Robert Chen",
    initials: "RC",
    grantTitle: "NSF CAREER — Biomedical Imaging",
    type: "Resubmission",
    deadline: "May 1, 2026",
    daysLeft: 25,
    status: "In Progress",
    progress: 35,
    amount: "$4,200",
  },
  {
    id: "proj-003",
    client: "Dr. Karen Lee",
    initials: "KL",
    grantTitle: "PCORI — Patient-Centered Outcomes",
    type: "Proposal Review",
    deadline: "Apr 20, 2026",
    daysLeft: 14,
    status: "Review",
    progress: 80,
    amount: "$1,500",
  },
];

const PENDING_REQUESTS = [
  { id: "req-001", name: "Dr. Amira Rashid", initials: "AR", grant: "NIH R21 — Mental Health Interventions", service: "Full Proposal Writing", date: "Mar 28, 2026" },
  { id: "req-002", name: "Dr. Marco Silva", initials: "MS", grant: "NIH Fogarty — AI Diagnostics in Brazil", service: "Specific Aims + Review", date: "Mar 25, 2026" },
];

const RECENT_WINS = [
  { grant: "NIH R01 — Cardiovascular Disease Prevention", client: "Dr. R. Thompson", amount: "$2.1M", date: "Feb 2026" },
  { grant: "NSF — Health Informatics Infrastructure", client: "Dr. J. Kim", amount: "$890K", date: "Jan 2026" },
];

export async function GrantWriterDashboardHome() {
  const t = await getTranslations("dashboards.grantWriter");
  const tCard = await getTranslations("dashboardCard.grantWriter");
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
              <div className="flex items-center justify-between">
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
        {/* Active Projects */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>{tCard("sectionActiveProjects")}</CardTitle>
              <CardDescription>{tCard("sectionActiveProjectsDesc")}</CardDescription>
              <CardAction><Button variant="outline" size="sm" asChild><Link href="/grant-writer/projects">{tShared("viewAll")}</Link></Button></CardAction>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {ACTIVE_PROJECTS.map((p) => (
                  <div key={p.id} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{p.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.grantTitle}</p>
                        <p className="text-xs text-muted-foreground">{p.client} · {p.type}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />{p.deadline}
                            <span className={p.daysLeft <= 10 ? "text-destructive font-medium" : ""}>({p.daysLeft}d)</span>
                          </span>
                          <span className="flex items-center gap-1"><DollarSign className="size-3" />{p.amount}</span>
                        </div>
                      </div>
                      <Badge variant={p.status === "Review" ? "secondary" : "default"} className="text-[10px]">{p.status}</Badge>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{p.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 grid gap-6 content-start">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>New collaboration requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {PENDING_REQUESTS.map((req) => (
                  <div key={req.id} className="rounded-xl border p-3.5 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{req.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{req.name}</p>
                        <p className="text-xs text-muted-foreground">{req.service}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{req.grant}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-7 text-xs">Accept</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">Decline</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Wins */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Wins</CardTitle>
              <CardDescription>Grants you helped fund</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {RECENT_WINS.map((win) => (
                  <div key={win.grant} className="flex items-start gap-3 rounded-xl border p-3.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"><Award className="size-3.5" /></div>
                    <div>
                      <p className="text-sm font-medium leading-snug">{win.grant}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{win.client} · {win.amount} · {win.date}</p>
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
          { title: "View Requests", icon: Users, href: "/grant-writer/requests", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
          { title: "Earnings", icon: DollarSign, href: "/grant-writer/earnings", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
          { title: "Messages", icon: MessageSquare, href: "/grant-writer/messages", color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
          { title: "My Profile", icon: Users, href: "/grant-writer/profile", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="flex items-center gap-3 rounded-xl border p-3.5 transition-colors hover:bg-muted/50">
            <div className={`flex size-9 items-center justify-center rounded-lg ${a.color}`}><a.icon className="size-4" /></div>
            <span className="text-sm font-medium">{a.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
