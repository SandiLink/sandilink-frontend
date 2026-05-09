"use client";

import { useState } from "react";
import { Stethoscope } from "lucide-react";
import { PROVIDER_CATEGORIES, SPECIALTIES, getProviderCategory } from "@/lib/catalogs";
import { LocalizedText } from "@/components/shared/localized-text";
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

export function SpecialtiesAdmin() {
  const [entries, setEntries] = useState(SPECIALTIES);

  const extraFields = [
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      required: true,
      placeholder: "Select category…",
      options: PROVIDER_CATEGORIES.filter((c) => c.status === "active").map((c) => ({
        value: c.id,
        label: c.label.en,
      })),
      help: "Which provider category does this specialty roll up to?",
    },
    {
      name: "country",
      label: "Country (optional)",
      type: "select",
      options: COUNTRY_OPTIONS,
      help: "Set only when the specialty exists exclusively in one regulatory regime.",
    },
    {
      name: "tags",
      label: "Tags (optional)",
      type: "text",
      placeholder: "wellness, alternative",
      help: "Comma-separated. Used to group wellness/alternative entries.",
    },
  ];

  const extraColumns = [
    {
      header: "Category",
      render: (e) => {
        const cat = getProviderCategory(e.categoryId);
        if (!cat) return null;
        return (
          <Badge variant="outline" className="text-[10px]">
            <LocalizedText value={cat.label} />
          </Badge>
        );
      },
    },
    {
      header: "Country",
      render: (e) =>
        e.country ? (
          <Badge variant="secondary" className="text-[10px]">
            {e.country}
          </Badge>
        ) : null,
    },
    {
      header: "Tags",
      render: (e) => {
        const tags = Array.isArray(e.tags)
          ? e.tags
          : typeof e.tags === "string"
            ? e.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [];
        return tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px]">
            {t}
          </Badge>
        ));
      },
    },
  ];

  return (
    <CatalogManager
      title="Specialties"
      description="Fine-grained scope of practice. Multi-selectable on a provider profile. Country-scoped specialties only surface in their region."
      icon={Stethoscope}
      entries={entries}
      setEntries={setEntries}
      extraFields={extraFields}
      extraColumns={extraColumns}
      idHint="e.g. cardiology"
    />
  );
}
