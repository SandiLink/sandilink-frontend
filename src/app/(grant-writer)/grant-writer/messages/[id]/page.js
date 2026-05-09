import { GrantWriterMessages } from "@/features/grant-writer/components/grant-writer-messages";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function GrantWriterMessageThreadPage({ params }) {
  const { id } = await params;
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with your researcher clients.</p>
      </div>
      <GrantWriterMessages initialContactId={id} />
    </div>
  );
}
