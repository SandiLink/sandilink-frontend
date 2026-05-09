import { ServicePackages } from "@/features/grant-writer/components/service-packages";

export const metadata = { title: "Service Packages — SandiLink", description: "Manage your service offerings" };

export default function PackagesPage() {
  return <ServicePackages />;
}
