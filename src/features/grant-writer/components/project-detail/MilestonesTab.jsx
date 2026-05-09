"use client";

import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MilestonesTab({ milestones }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Milestones</CardTitle>
        <CardDescription>Track deliverables and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="flex items-start gap-3 rounded-lg border p-3.5"
            >
              {m.status === "completed" ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
              ) : m.status === "in-progress" ? (
                <Clock className="mt-0.5 size-5 shrink-0 text-blue-500 animate-pulse" />
              ) : (
                <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground/40" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    m.status === "completed"
                      ? "line-through text-muted-foreground"
                      : ""
                  }`}
                >
                  {m.title}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    Due: {m.dueDate}
                  </span>
                  {m.completedDate && (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" />
                      {m.completedDate}
                    </span>
                  )}
                </div>
              </div>
              <Badge
                variant={
                  m.status === "completed"
                    ? "secondary"
                    : m.status === "in-progress"
                      ? "default"
                      : "outline"
                }
                className="text-[10px] shrink-0"
              >
                {m.status === "in-progress"
                  ? "In Progress"
                  : m.status === "completed"
                    ? "Done"
                    : "Upcoming"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
