import { BookingDetails } from "@/features/service-user/components/booking-details";

export const metadata = {
  title: "Booking Details — SandiLink",
  description: "View your booking details",
};

export default async function BookingDetailPage({ params }) {
  const { id } = await params;
  return <BookingDetails bookingId={id} />;
}
