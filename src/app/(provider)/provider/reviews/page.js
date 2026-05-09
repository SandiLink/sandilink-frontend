import { ProviderReviews } from "@/features/care-provider/components/provider-reviews";

export const metadata = { title: "Reviews — SandiLink", description: "View your client reviews and ratings" };

export default function ReviewsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Client Reviews</h2>
        <p className="text-sm text-muted-foreground">See what your patients are saying about their experience.</p>
      </div>
      <ProviderReviews />
    </div>
  );
}
