import { BookingConfirmation } from "@/features/service-user/components/booking-confirmation";

export const metadata = {
  title: "Confirm Booking — SandiLink",
  description: "Review and confirm your appointment details",
};

export default async function ConfirmPage({ params }) {
  const { id } = await params;
  return <BookingConfirmation bookingId={id} />;
}
