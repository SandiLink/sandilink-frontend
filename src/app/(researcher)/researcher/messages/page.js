import { ResearcherMessagesList } from "@/features/researcher/components/researcher-messages-list";

export const metadata = { title: "Messages — SandiLink", description: "Researcher conversations" };

export default function ResearcherMessagesPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with grant writers, collaborators, and co-investigators.</p>
      </div>
      <ResearcherMessagesList />
    </div>
  );
}
