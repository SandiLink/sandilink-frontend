import { PreceptorSearch } from "@/features/student/components/preceptor-search";

export const metadata = { title: "Find Preceptors — SandiLink", description: "Search for clinical preceptors" };

export default function PreceptorsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Find Preceptors</h2>
        <p className="text-sm text-muted-foreground">Search for preceptors and request clinical placements.</p>
      </div>
      <PreceptorSearch />
    </div>
  );
}
