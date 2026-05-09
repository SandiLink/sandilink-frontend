import { StudentReports } from "@/features/institution/components/student-reports";
export const metadata = { title: "Reports — SandiLink" };
export default function ReportsPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Student Progress Reports</h2><p className="text-sm text-muted-foreground">Track student progress across all active placements.</p></div><StudentReports /></div>);
}
