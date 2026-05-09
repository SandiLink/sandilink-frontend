import { ClientList } from "@/features/grant-writer/components/client-list";

export const metadata = { title: "My Clients — SandiLink", description: "Manage your researcher clients" };

export default function ClientsPage() {
  return <ClientList />;
}
