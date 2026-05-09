import { StudentProfileView } from "@/features/institution/components/student-profile-view";

export const metadata = { title: "Student Profile — SandiLink" };

export default async function InstitutionStudentProfilePage({ params }) {
  const { id } = await params;
  return <StudentProfileView studentId={id} />;
}
