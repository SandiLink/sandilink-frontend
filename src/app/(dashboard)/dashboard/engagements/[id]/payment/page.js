import { PaymentForm } from "@/features/service-user/components/payment-form";

export const metadata = {
  title: "Payment — SandiLink",
  description: "Complete your payment to confirm the booking",
};

export default async function PaymentPage({ params }) {
  const { id } = await params;
  return <PaymentForm bookingId={id} />;
}
