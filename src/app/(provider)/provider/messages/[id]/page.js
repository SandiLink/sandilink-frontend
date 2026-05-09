import { ProviderMessagesList } from "@/features/care-provider/components/provider-messages-list";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function ProviderMessageThreadPage({ params }) {
  const { id } = await params;
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with your patients.</p>
      </div>
      <ProviderMessagesList initialContactId={id} />
    </div>
  );
}
