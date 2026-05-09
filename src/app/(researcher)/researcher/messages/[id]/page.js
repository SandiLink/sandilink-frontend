import { ResearcherMessagesList } from "@/features/researcher/components/researcher-messages-list";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function ResearcherMessageThreadPage({ params }) {
  const { id } = await params;
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with grant writers, collaborators, and co-investigators.</p>
      </div>
      <ResearcherMessagesList initialContactId={id} />
    </div>
  );
}
