"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { PROVIDER_CATEGORIES } from "@/lib/catalogs";
import { CatalogManager } from "./catalog-manager";

export function ProviderCategoriesAdmin() {
  const [entries, setEntries] = useState(PROVIDER_CATEGORIES);

  return (
    <CatalogManager
      title="Provider categories"
      description="Top-level groupings (clinical, allied health, CAM, wellness, supportive, community health, non-clinical, country-specific). Specialties roll up to these."
      icon={Layers}
      entries={entries}
      setEntries={setEntries}
      idHint="e.g. allied-health"
    />
  );
}
