import DisputeDetail from "@/features/admin/components/dispute-detail";

export const metadata = {
  title: "Dispute Detail — SandiLink",
};

export default async function DisputeDetailPage({ params }) {
  const { id } = await params;
  return <DisputeDetail id={id} />;
}
