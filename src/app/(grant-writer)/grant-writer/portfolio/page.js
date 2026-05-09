import { Suspense } from "react";
import { CompletedPortfolio } from "@/features/grant-writer/components/completed-portfolio";

export const metadata = { title: "Portfolio — SandiLink", description: "Completed projects and outcomes" };

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <CompletedPortfolio />
    </Suspense>
  );
}