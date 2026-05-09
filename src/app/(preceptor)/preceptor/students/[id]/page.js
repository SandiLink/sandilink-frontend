import { StudentDetail } from "@/features/preceptor/components/student-detail";
export const metadata = { title: "Student Details — SandiLink" };
export default async function StudentDetailPage({ params }) { const { id } = await params; return <StudentDetail studentId={id} />; }
