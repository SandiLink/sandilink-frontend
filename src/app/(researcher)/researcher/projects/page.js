import { Suspense } from "react";
import { ResearchProjectsDashboard } from "@/features/researcher/components/research-projects-dashboard";

export const metadata = { title: "Research Projects — SandiLink", description: "Manage your research projects" };

export default function ResearchProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResearchProjectsDashboard />
    </Suspense>
  );
}