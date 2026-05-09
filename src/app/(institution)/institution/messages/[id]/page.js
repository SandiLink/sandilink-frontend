import { InstitutionMessages } from "@/features/institution/components/institution-messages";

export const metadata = { title: "Message Thread — SandiLink" };

export default async function InstitutionMessageThreadPage({ params }) {
  const { id } = await params;
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with preceptors about placements.</p>
      </div>
      <InstitutionMessages initialContactId={id} />
    </div>
  );
}
