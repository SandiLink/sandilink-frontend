import { CollaborationRequests } from "@/features/researcher/components/collaboration-requests";
import { Suspense } from "react";

export const metadata = {
  title: "Collaboration Requests — SandiLink",
  description: "Manage collaboration requests",
};

export default function CollaborationsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <CollaborationRequests />
    </Suspense>
  );
}
