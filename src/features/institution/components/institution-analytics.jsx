import { BarChart3, GraduationCap, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  { title: "Placement Rate", value: "92%", trend: "+5%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
  { title: "Avg. Completion Time", value: "16 wks", trend: "-1 wk", icon: BarChart3, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
  { title: "Active Preceptors", value: "8", trend: "+2", icon: Users, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
  { title: "Graduates Placed", value: "42", trend: null, icon: GraduationCap, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
];

const SPECIALTY_DATA = [
  { name: "Family Medicine", students: 12, pct: 100 },
  { name: "Pediatrics", students: 8, pct: 67 },
  { name: "Emergency Medicine", students: 6, pct: 50 },
  { name: "Internal Medicine", students: 5, pct: 42 },
  { name: "OB/GYN", students: 4, pct: 33 },
  { name: "Surgery", students: 3, pct: 25 },
];

const SEMESTER_DATA = [
  { semester: "Fall 2024", placed: 18, total: 20 },
  { semester: "Spring 2025", placed: 22, total: 24 },
  { semester: "Fall 2025", placed: 20, total: 22 },
  { semester: "Spring 2026", placed: 12, total: 14 },
];

export function InstitutionAnalytics() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.title} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.title}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}><s.icon className="size-4" /></div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-heading">{s.value}</span>
                {s.trend && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{s.trend}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Placements by Specialty</CardTitle><CardDescription>Number of students placed in each specialty</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {SPECIALTY_DATA.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-36 text-sm text-muted-foreground">{s.name}</span>
                  <div className="flex-1"><div className="h-2.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${s.pct}%` }} /></div></div>
                  <span className="w-8 text-right text-sm font-medium">{s.students}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Placement Rate by Semester</CardTitle><CardDescription>Students placed vs total enrolled</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {SEMESTER_DATA.map((s) => {
                const pct = Math.round((s.placed / s.total) * 100);
                return (
                  <div key={s.semester} className="flex items-center gap-3">
                    <span className="w-28 text-sm text-muted-foreground">{s.semester}</span>
                    <div className="flex-1"><div className="h-2.5 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div></div>
                    <span className="w-16 text-right text-sm"><span className="font-medium">{s.placed}</span><span className="text-muted-foreground">/{s.total}</span></span>
                    <span className="w-10 text-right text-xs text-muted-foreground">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
