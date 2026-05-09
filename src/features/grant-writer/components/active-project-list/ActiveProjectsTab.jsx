"use client";

import { Briefcase } from "lucide-react";
import { ProjectCard } from "./ProjectCard";

export function ActiveProjectsTab({ projects }) {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <Briefcase className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No projects in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}