"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign } from "lucide-react";

const STATUS_CONFIG = {
  "In Progress": { badge: "default" },
  Review: { badge: "secondary" },
  Completed: { badge: "secondary" },
};

export function ProjectCard({ project }) {
  const cfg = STATUS_CONFIG[project.status];

  return (
    <Link key={project.id} href={`/grant-writer/projects/${project.id}`}>
      <Card className="transition-colors hover:bg-muted/50">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Avatar className="shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {project.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold leading-snug">
                  {project.grantTitle}
                </p>
                <Badge variant={cfg.badge} className="text-[10px]">
                  {project.status}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {project.client} · {project.institution}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-[10px]">
                  {project.type}
                </Badge>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3" />
                  {project.amount}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {project.deadline}
                  {project.daysLeft > 0 && (
                    <span
                      className={
                        project.daysLeft <= 10
                          ? "text-destructive font-medium"
                          : ""
                      }
                    >
                      ({project.daysLeft}d)
                    </span>
                  )}
                </span>
              </div>
              {project.progress < 100 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {project.outcome && (
                <p className="mt-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {project.outcome}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}