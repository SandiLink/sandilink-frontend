import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewResearchProjectForm } from "@/features/researcher/components/new-research-project-form";

export const metadata = { title: "New Research Project — SandiLink" };

export default function NewResearchProjectPage() {
  return (
    <div className="grid w-full gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/researcher/projects" aria-label="Back to projects">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            New Research Project
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a project to track collaborators, funding, milestones, and
            publications.
          </p>
        </div>
      </div>

      <NewResearchProjectForm />
    </div>
  );
}
