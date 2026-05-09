import { StudentEvaluation } from "@/features/preceptor/components/student-evaluation";
export const metadata = { title: "Student Evaluation — SandiLink" };
export default async function EvaluatePage({ params }) { const { id } = await params; return <StudentEvaluation studentId={id} />; }
