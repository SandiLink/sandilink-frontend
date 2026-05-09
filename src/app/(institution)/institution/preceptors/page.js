import { InstitutionPreceptorSearch } from "@/features/institution/components/institution-preceptor-search";
export const metadata = { title: "Find Preceptors — SandiLink" };
export default function PreceptorsPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Find Preceptors</h2><p className="text-sm text-muted-foreground">Search for preceptors and request bulk placements for your students.</p></div><InstitutionPreceptorSearch /></div>);
}
