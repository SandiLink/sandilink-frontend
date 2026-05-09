import { InstitutionMessages } from "@/features/institution/components/institution-messages";

export const metadata = { title: "Messages — SandiLink" };

export default function InstitutionMessagesPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with preceptors about placements.</p>
      </div>
      <InstitutionMessages />
    </div>
  );
}
