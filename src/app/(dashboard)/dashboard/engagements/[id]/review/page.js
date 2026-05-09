import { ReviewForm } from "@/features/service-user/components/review-form";

export const metadata = {
  title: "Leave a Review — SandiLink",
  description: "Rate and review your provider",
};

export default async function ReviewPage({ params }) {
  const { id } = await params;
  return <ReviewForm bookingId={id} />;
}
