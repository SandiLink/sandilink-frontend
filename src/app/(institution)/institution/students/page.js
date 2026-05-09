import { StudentRoster } from "@/features/institution/components/student-roster";
export const metadata = { title: "Students — SandiLink" };
export default function StudentsPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Student Roster</h2><p className="text-sm text-muted-foreground">Manage your enrolled students and their placement status.</p></div><StudentRoster /></div>);
}
