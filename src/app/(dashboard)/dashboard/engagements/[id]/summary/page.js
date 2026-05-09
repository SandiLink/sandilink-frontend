import { PostAppointmentSummary } from "@/features/service-user/components/post-appointment-summary";

export const metadata = {
  title: "Appointment Summary — SandiLink",
  description: "Post-appointment summary from your provider",
};

export default async function SummaryPage({ params }) {
  const { id } = await params;
  return <PostAppointmentSummary bookingId={id} />;
}
