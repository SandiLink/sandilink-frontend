import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewAgreementForm } from "@/features/institution/components/new-agreement-form";

export const metadata = { title: "New Agreement — SandiLink" };

export default function NewAgreementPage() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/institution/agreements" aria-label="Back to agreements">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            New Agreement
          </h2>
          <p className="text-sm text-muted-foreground">
            Draft an affiliation or clinical site agreement and send it for signature.
          </p>
        </div>
      </div>

      <NewAgreementForm />
    </div>
  );
}
