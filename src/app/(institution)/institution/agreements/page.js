import { AgreementsManagement } from "@/features/institution/components/agreements-management";
export const metadata = { title: "Agreements — SandiLink" };
export default function AgreementsPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Agreements</h2><p className="text-sm text-muted-foreground">Manage affiliation agreements with preceptors and clinical sites.</p></div><AgreementsManagement /></div>);
}
