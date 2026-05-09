import { Suspense } from "react";
import { ActiveProjectsList } from "@/features/grant-writer/components/active-projects-list";

export const metadata = { title: "Projects — SandiLink", description: "Manage grant writing projects" };

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ActiveProjectsList />
    </Suspense>
  );
}