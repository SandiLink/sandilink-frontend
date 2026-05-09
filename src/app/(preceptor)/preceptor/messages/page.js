import { PreceptorMessages } from "@/features/preceptor/components/preceptor-messages";

export const metadata = { title: "Messages — SandiLink" };

export default function PreceptorMessagesPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with your students and institutions.</p>
      </div>
      <PreceptorMessages />
    </div>
  );
}
