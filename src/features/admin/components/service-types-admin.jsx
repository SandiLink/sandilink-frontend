"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { SERVICE_TYPES } from "@/lib/catalogs";
import { Badge } from "@/components/ui/badge";
import { CatalogManager } from "./catalog-manager";

export function ServiceTypesAdmin() {
  const [entries, setEntries] = useState(SERVICE_TYPES);

  const extraFields = [
    {
      name: "customAllowed",
      label: "Provider can supply custom description?",
      type: "checkbox",
      help: "When on, providers see a free-text field on this service.",
    },
    {
      name: "customMaxLength",
      label: "Custom text max length",
      type: "number",
      placeholder: "e.g. 240",
      help: "Only applies when custom is allowed.",
    },
  ];

  const extraColumns = [
    {
      header: "Custom",
      render: (e) =>
        e.customAllowed ? (
          <Badge variant="secondary" className="text-[10px]">
            Custom · {e.customMaxLength || 200} chars
          </Badge>
        ) : null,
    },
  ];

  return (
    <CatalogManager
      title="Service types"
      description="What providers can offer for booking. Mark a service as 'custom' to let providers attach a free-text description (within the admin-set length cap)."
      icon={Wrench}
      entries={entries}
      setEntries={setEntries}
      extraFields={extraFields}
      extraColumns={extraColumns}
      idHint="e.g. virtual-visit"
    />
  );
}
