import { StudentMessagesList } from "@/features/student/components/student-messages-list";

export const metadata = { title: "Messages — SandiLink", description: "Preceptor conversations" };

export default function StudentMessagesPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with your preceptors.</p>
      </div>
      <StudentMessagesList />
    </div>
  );
}
