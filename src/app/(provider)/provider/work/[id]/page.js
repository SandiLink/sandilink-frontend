import { ProviderBookingDetail } from "@/features/care-provider/components/provider-booking-detail";

export const metadata = { title: "Booking Detail — SandiLink" };

export default async function ProviderBookingDetailPage({ params }) {
  const { id } = await params;
  return <ProviderBookingDetail bookingId={id} />;
}
