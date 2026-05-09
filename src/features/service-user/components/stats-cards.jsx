import {
  CalendarDays,
  CalendarCheck2,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Upcoming Engagements",
    value: "3",
    description: "Next: Tomorrow, 10:00 AM",
    icon: CalendarDays,
    trend: null,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    title: "Completed",
    value: "12",
    description: "+3 this month",
    icon: CalendarCheck2,
    trend: "+25%",
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    title: "Pending",
    value: "1",
    description: "Awaiting confirmation",
    icon: Clock,
    trend: null,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    title: "Avg. Rating Given",
    value: "4.8",
    description: "Across 10 reviews",
    icon: Star,
    trend: null,
    color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} size="sm" className="relative overflow-hidden">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <div
                className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-semibold font-heading tracking-tight">
                {stat.value}
              </span>
              {stat.trend && (
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="size-3" />
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
