import { BarChart3, Eye, MousePointerClick, TrendingUp, Users, CalendarCheck2, Star, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATS = [
  { title: "Profile Views", value: "1,248", change: "+14%", up: true, description: "Last 30 days", icon: Eye, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { title: "Booking Rate", value: "32%", change: "+5%", up: true, description: "Views → bookings", icon: MousePointerClick, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { title: "Repeat Patients", value: "68%", change: "+3%", up: true, description: "Return rate", icon: Users, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { title: "Avg. Rating", value: "4.9", change: "0", up: true, description: "Last 30 days", icon: Star, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const MONTHLY = [
  { month: "Oct", views: 820, bookings: 22 },
  { month: "Nov", views: 950, bookings: 28 },
  { month: "Dec", views: 780, bookings: 20 },
  { month: "Jan", views: 1020, bookings: 30 },
  { month: "Feb", views: 1100, bookings: 34 },
  { month: "Mar", views: 1248, bookings: 38 },
];

const TOP_SOURCES = [
  { source: "Search", pct: 45, count: 562 },
  { source: "Direct link", pct: 25, count: 312 },
  { source: "Referrals", pct: 18, count: 225 },
  { source: "Social media", pct: 12, count: 149 },
];

const POPULAR_TIMES = [
  { day: "Mon", slots: 12 },
  { day: "Tue", slots: 15 },
  { day: "Wed", slots: 10 },
  { day: "Thu", slots: 18 },
  { day: "Fri", slots: 14 },
  { day: "Sat", slots: 5 },
];

export function ProfileAnalytics() {
  const maxSlots = Math.max(...POPULAR_TIMES.map((t) => t.slots));
  const maxViews = Math.max(...MONTHLY.map((m) => m.views));

  return (
    <div className="grid gap-6">
      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.title} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className={`flex size-9 items-center justify-center rounded-lg ${stat.color}`}><stat.icon className="size-4" /></div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-heading tracking-tight">{stat.value}</span>
                {stat.change !== "0" && (
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {stat.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}{stat.change}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly views chart (bar chart placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Profile Views</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {MONTHLY.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-medium">{m.views}</span>
                  <div className="w-full rounded-t-md bg-primary/80 transition-all" style={{ height: `${(m.views / maxViews) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>How patients find your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {TOP_SOURCES.map((src) => (
                <div key={src.source} className="grid gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{src.source}</span>
                    <span className="text-muted-foreground">{src.count} ({src.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${src.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular booking times */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Booking Days</CardTitle>
          <CardDescription>When patients book the most</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-32">
            {POPULAR_TIMES.map((t) => (
              <div key={t.day} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium">{t.slots}</span>
                <div className="w-full rounded-t-md bg-primary/60 transition-all" style={{ height: `${(t.slots / maxSlots) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{t.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
