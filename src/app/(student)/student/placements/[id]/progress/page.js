import { PlacementProgress } from "@/features/student/components/placement-progress";

export const metadata = { title: "Progress Tracking — SandiLink" };

export default async function ProgressPage({ params }) {
  const { id } = await params;
  return <PlacementProgress placementId={id} />;
}
