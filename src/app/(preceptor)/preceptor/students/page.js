import { ActiveStudents } from "@/features/preceptor/components/active-students";
import { Suspense } from "react";
export const metadata = { title: "My Students — SandiLink" };
export default function StudentsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            My Students
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage students in your current rotation.
          </p>
        </div>
        <ActiveStudents />
      </div>
    </Suspense>
  );
}
