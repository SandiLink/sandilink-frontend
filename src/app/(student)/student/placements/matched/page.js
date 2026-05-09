import { MatchedPreceptors } from "@/features/student/components/matched-preceptors";

export const metadata = { title: "Matched Preceptors — SandiLink", description: "Preceptors matched to your preferences" };

export default function MatchedPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Matched Preceptors</h2>
        <p className="text-sm text-muted-foreground">Preceptors recommended based on your specialty preferences, availability, and location.</p>
      </div>
      <MatchedPreceptors />
    </div>
  );
}
