import { PlacementDocuments } from "@/features/student/components/placement-documents";

export const metadata = { title: "Placement Documents — SandiLink" };

export default async function DocumentsPage({ params }) {
  const { id } = await params;
  return <PlacementDocuments placementId={id} />;
}
