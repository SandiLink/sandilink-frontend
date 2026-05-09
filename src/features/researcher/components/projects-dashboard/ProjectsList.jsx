"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FlaskConical,
  Award,
  Calendar,
  Users,
} from "lucide-react";

export function ProjectsList({ items, type, STATUS_CONFIG }) {
  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <FlaskConical className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No {type} projects found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((project) => (
        <Link key={project.id} href={`/researcher/projects/${project.id}`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg ${
                    STATUS_CONFIG[project.status].color
                  }`}
                >
                  <FlaskConical className="size-4" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title + Status */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold leading-snug">
                      {project.title}
                    </p>
                    <Badge
                      variant={STATUS_CONFIG[project.status].variant}
                      className="text-[10px]"
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="size-3" />
                      {project.funder} · {project.funding}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {project.startDate} — {project.endDate}
                    </span>
                    {project.collaborators.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {project.collaborators.length} collaborators
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  {project.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          Milestones: {project.milestones.completed}/
                          {project.milestones.total}
                        </span>
                        <span className="font-medium">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            project.progress === 100
                              ? "bg-emerald-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Collaborators */}
                  {project.collaborators.length > 0 && (
                    <div className="mt-3 flex items-center gap-1">
                      <div className="flex -space-x-2">
                        {project.collaborators.slice(0, 4).map((c) => (
                          <Avatar
                            key={c.name}
                            className="size-6 ring-2 ring-background"
                          >
                            <AvatarFallback className="bg-primary/10 text-primary text-[9px]">
                              {c.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-[11px] text-muted-foreground ml-1">
                        {project.collaborators
                          .map((c) => c.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}