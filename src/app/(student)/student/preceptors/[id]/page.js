import { PreceptorProfile } from "@/features/student/components/preceptor-profile";

export const metadata = { title: "Preceptor Profile — SandiLink", description: "View preceptor details and request placement" };

export default async function PreceptorProfilePage({ params }) {
  const { id } = await params;
  return <PreceptorProfile preceptorId={id} />;
}
