import AdminUserDetail from "@/features/admin/components/admin-user-detail";

export const metadata = {
  title: "User Detail — SandiLink",
};

export default async function UserDetailPage({ params }) {
  const { id } = await params;
  return <AdminUserDetail userId={id} />;
}
