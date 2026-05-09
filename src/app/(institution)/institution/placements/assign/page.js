import { PlacementAssignment } from "@/features/institution/components/placement-assignment";
export const metadata = { title: "Assign Placement — SandiLink" };
export default function AssignPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Assign Placement</h2><p className="text-sm text-muted-foreground">Match a student with a preceptor for a clinical placement.</p></div><PlacementAssignment /></div>);
}
