import { Suspense } from "react";
import { MySubmissions } from "@/features/researcher/components/my-submissions";

export const metadata = { title: "My Submissions — SandiLink", description: "Track your manuscript submissions" };

export default function SubmissionsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <MySubmissions />
    </Suspense>
  );
}
