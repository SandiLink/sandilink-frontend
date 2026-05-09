import FlaggedContent from "@/features/admin/components/flagged-content";
import { Suspense } from "react";

export const metadata = {
  title: "Flagged Content — SandiLink",
};

export default function FlaggedContentPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <FlaggedContent />
    </Suspense>
  );
}
