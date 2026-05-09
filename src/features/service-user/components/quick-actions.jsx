import Link from "next/link";
import { CalendarPlus, MessageSquare, Search, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Find a Provider",
    description: "Search and book",
    href: "/dashboard/experts",
    icon: Search,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    title: "Find Experts",
    description: "Schedule appointment",
    href: "/dashboard/engagements/new",
    icon: CalendarPlus,
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    title: "Messages",
    description: "View conversations",
    href: "/dashboard/messages",
    icon: MessageSquare,
    color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
  {
    title: "My Profile",
    description: "Edit your info",
    href: "/dashboard/profile",
    icon: User,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks at your fingertips</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex size-9 items-center justify-center rounded-lg ${action.color}`}
              >
                <action.icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{action.title}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
