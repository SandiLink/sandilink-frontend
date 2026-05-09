import { Suspense } from "react";
import { IncomingRequests } from "@/features/grant-writer/components/incoming-requests";

export const metadata = { title: "Requests — SandiLink", description: "Incoming collaboration requests" };

export default function RequestsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <IncomingRequests />
    </Suspense>
  );
}
