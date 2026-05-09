import { PlacementDetails } from "@/features/student/components/placement-details";

export const metadata = { title: "Placement Details — SandiLink" };

export default async function PlacementDetailPage({ params }) {
  const { id } = await params;
  return <PlacementDetails placementId={id} />;
}
