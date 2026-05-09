import { Award, BookOpen, DollarSign, FlaskConical, PenTool, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { title: "Researchers", value: "284", trend: "+42 this month", icon: FlaskConical, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { title: "Grant Writers", value: "67", trend: "+8 this month", icon: PenTool, color: "text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-950" },
  { title: "Active Matches", value: "156", trend: "+23 this month", icon: Users, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { title: "Grants in Directory", value: "1,247", trend: "+89 this month", icon: Award, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const GRANT_METRICS = [
  { label: "Total Applications", value: "423" },
  { label: "Funded", value: "168 (40%)" },
  { label: "Under Review", value: "87" },
  { label: "Total Funding Secured", value: "$42.8M" },
  { label: "Avg Grant Size", value: "$254K" },
  { label: "Avg Time to Award", value: "5.2 months" },
];

const WRITER_METRICS = [
  { label: "Avg Success Rate", value: "74%" },
  { label: "Avg Client Rating", value: "4.7/5" },
  { label: "Total Revenue (Writers)", value: "$892K" },
  { label: "Avg Revenue Per Writer", value: "$13.3K" },
  { label: "Repeat Client Rate", value: "62%" },
  { label: "Avg Project Duration", value: "4.1 weeks" },
];

const PUBLICATION_METRICS = [
  { label: "Total Submissions", value: "312" },
  { label: "Published", value: "198 (63%)" },
  { label: "Under Review", value: "78" },
  { label: "Avg Review Time", value: "7.2 weeks" },
  { label: "Unique Journals Used", value: "45" },
  { label: "Total Citations", value: "8,420" },
];

const TOP_FUNDERS = [
  { name: "NIH", grants: 89, funded: 38, rate: "43%" },
  { name: "NSF", grants: 45, funded: 22, rate: "49%" },
  { name: "Gates Foundation", grants: 18, funded: 5, rate: "28%" },
  { name: "PCORI", grants: 32, funded: 15, rate: "47%" },
  { name: "WHO", grants: 12, funded: 4, rate: "33%" },
];

const MONTHLY_GROWTH = [
  { month: "Oct", researchers: 18, writers: 3 },
  { month: "Nov", researchers: 22, writers: 5 },
  { month: "Dec", researchers: 15, writers: 4 },
  { month: "Jan", researchers: 28, writers: 6 },
  { month: "Feb", researchers: 35, writers: 7 },
  { month: "Mar", researchers: 38, writers: 6 },
  { month: "Apr", researchers: 42, writers: 8 },
];

export function ResearchAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Research Analytics</h1>
        <p className="text-muted-foreground">User growth, match rates, and grant success metrics for the research vertical.</p>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.title} size="sm"><CardContent className="pt-4">
            <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{s.title}</p><div className={`flex size-9 items-center justify-center rounded-lg ${s.color}`}><s.icon className="size-4" /></div></div>
            <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">{s.value}</p>
            <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">{s.trend}</p>
          </CardContent></Card>
        ))}
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader><CardTitle>Monthly User Growth</CardTitle><CardDescription>New researcher and grant writer signups</CardDescription></CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-36">
            {MONTHLY_GROWTH.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="text-[9px] text-center text-muted-foreground">{m.researchers + m.writers}</span>
                  <div className="w-full rounded-t-md bg-blue-400/80 dark:bg-blue-600/80" style={{ height: `${(m.researchers / 45) * 100}%` }} />
                  <div className="w-full rounded-t-md bg-indigo-400/80 dark:bg-indigo-600/80" style={{ height: `${(m.writers / 45) * 40}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><div className="size-2.5 rounded-sm bg-blue-400 dark:bg-blue-600" />Researchers</span>
            <span className="flex items-center gap-1"><div className="size-2.5 rounded-sm bg-indigo-400 dark:bg-indigo-600" />Grant Writers</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Grant Metrics */}
        <Card>
          <CardHeader><CardTitle>Grant Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {GRANT_METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Writer Metrics */}
        <Card>
          <CardHeader><CardTitle>Grant Writer Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {WRITER_METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Publication Metrics */}
        <Card>
          <CardHeader><CardTitle>Publication Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {PUBLICATION_METRICS.map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Funders */}
      <Card>
        <CardHeader><CardTitle>Top Funders</CardTitle><CardDescription>Grant success rates by funding agency</CardDescription></CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {TOP_FUNDERS.map((f) => (
              <div key={f.name} className="flex items-center gap-4 rounded-lg border p-3.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"><Award className="size-4" /></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.grants} applications · {f.funded} funded</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{f.rate}</p>
                  <p className="text-[10px] text-muted-foreground">success rate</p>
                </div>
                <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: f.rate }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
