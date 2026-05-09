import { BookingSuccess } from "@/features/service-user/components/booking-success";

export const metadata = {
  title: "Booking Confirmed — SandiLink",
  description: "Your appointment has been successfully booked",
};

export default function SuccessPage() {
  return <BookingSuccess />;
}
