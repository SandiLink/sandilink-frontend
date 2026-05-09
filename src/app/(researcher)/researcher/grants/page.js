import { Suspense } from "react";
import { GrantApplications } from "@/features/researcher/components/grant-applications";

export const metadata = { title: "Grant Applications — SandiLink", description: "Track your grant application status" };

export default function GrantApplicationsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <GrantApplications />
    </Suspense>
  );
}
