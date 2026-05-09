"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import { CREDENTIALS } from "@/lib/catalogs";
import { Badge } from "@/components/ui/badge";
import { CatalogManager } from "./catalog-manager";

const COUNTRY_OPTIONS = [
  { value: "", label: "Any / global" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "BR", label: "Brazil" },
  { value: "ZA", label: "South Africa" },
  { value: "KE", label: "Kenya" },
];

export function CredentialsAdmin() {
  const [entries, setEntries] = useState(CREDENTIALS);

  const extraFields = [
    {
      name: "country",
      label: "Country (optional)",
      type: "select",
      options: COUNTRY_OPTIONS,
      help: "Scope this credential to a specific regulatory regime. Leave empty for globally recognised credentials.",
    },
  ];

  const extraColumns = [
    {
      header: "Country",
      render: (e) =>
        e.country ? (
          <Badge variant="secondary" className="text-[10px]">
            {e.country}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[10px]">
            Global
          </Badge>
        ),
    },
  ];

  return (
    <CatalogManager
      title="Credentials"
      description="Licenses and qualifications a provider can list on their profile. Country-scoped credentials are filtered to providers in that region."
      icon={Award}
      entries={entries}
      setEntries={setEntries}
      extraFields={extraFields}
      extraColumns={extraColumns}
      idHint="e.g. md, np, rgn"
    />
  );
}
