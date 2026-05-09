import { PublicationsList } from "@/features/researcher/components/publications-list";
import { Suspense } from "react";

export const metadata = {
  title: "Publications — SandiLink",
  description: "Manage your research publications",
};

export default function PublicationsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <PublicationsList />
    </Suspense>
  );
}
