import { InstitutionAnalytics } from "@/features/institution/components/institution-analytics";
export const metadata = { title: "Analytics — SandiLink" };
export default function AnalyticsPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Placement Analytics</h2><p className="text-sm text-muted-foreground">Insights into your institution's placement performance.</p></div><InstitutionAnalytics /></div>);
}
