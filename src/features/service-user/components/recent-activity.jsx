import {
  CalendarCheck2,
  CreditCard,
  MessageSquare,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: "1",
    icon: CalendarCheck2,
    title: "Appointment completed",
    description: "Session with Dr. Sarah Johnson",
    time: "2 hours ago",
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    id: "2",
    icon: Star,
    title: "Review submitted",
    description: "You rated Dr. Sarah Johnson 5 stars",
    time: "1 hour ago",
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    id: "3",
    icon: CreditCard,
    title: "Payment processed",
    description: "$120.00 for General Practice visit",
    time: "1 hour ago",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    id: "4",
    icon: MessageSquare,
    title: "New message",
    description: "Dr. Michael Chen sent you a message",
    time: "3 hours ago",
    color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
  {
    id: "5",
    icon: CalendarCheck2,
    title: "Booking confirmed",
    description: "Apr 5 appointment with Dr. Michael Chen",
    time: "Yesterday",
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative grid gap-0">
          {activities.map((activity, i) => (
            <div key={activity.id} className="relative flex gap-3 pb-5 last:pb-0">
              {/* Timeline line */}
              {i < activities.length - 1 && (
                <div className="absolute left-3.75 top-9 h-[calc(100%-20px)] w-px bg-border" />
              )}
              {/* Icon */}
              <div
                className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ${activity.color}`}
              >
                <activity.icon className="size-3.5" />
              </div>
              {/* Content */}
              <div className="flex flex-1 items-start justify-between gap-2 pt-0.5">
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground/60">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
