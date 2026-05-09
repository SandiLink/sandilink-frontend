import { BulkImport } from "@/features/institution/components/bulk-import";
export const metadata = { title: "Bulk Import — SandiLink" };
export default function BulkImportPage() {
  return (<div className="grid gap-6"><div><h2 className="font-heading text-xl font-semibold tracking-tight">Bulk Student Import</h2><p className="text-sm text-muted-foreground">Import multiple students at once using a CSV file.</p></div><BulkImport /></div>);
}
