import { IntakeForm } from "@/features/service-user/components/intake-form";

export const metadata = {
  title: "Intake Form — SandiLink",
  description: "Complete your intake form before your appointment",
};

export default async function IntakePage({ params }) {
  const { id } = await params;
  return <IntakeForm bookingId={id} />;
}
