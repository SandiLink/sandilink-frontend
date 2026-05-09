import { StudentMessagesList } from "@/features/student/components/student-messages-list";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function StudentMessageThreadPage({ params }) {
  const { id } = await params;
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with your preceptors.</p>
      </div>
      <StudentMessagesList initialContactId={id} />
    </div>
  );
}
