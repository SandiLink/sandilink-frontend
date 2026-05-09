import { CredentialsUpload } from "@/features/student/components/credentials-upload";

export const metadata = { title: "Credentials — SandiLink", description: "Upload academic credentials" };

export default function CredentialsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Academic Credentials</h2>
        <p className="text-sm text-muted-foreground">Upload and manage your academic documents for preceptor verification.</p>
      </div>
      <CredentialsUpload />
    </div>
  );
}
