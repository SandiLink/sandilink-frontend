import { PerformanceNotes } from "@/features/preceptor/components/performance-notes";
export const metadata = { title: "Performance Notes — SandiLink" };
export default async function NotesPage({ params }) { const { id } = await params; return <PerformanceNotes studentId={id} />; }
