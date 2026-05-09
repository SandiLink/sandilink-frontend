import { StudentProgressReview } from "@/features/preceptor/components/student-progress-review";
export const metadata = { title: "Student Progress — SandiLink" };
export default async function ProgressPage({ params }) { const { id } = await params; return <StudentProgressReview studentId={id} />; }
