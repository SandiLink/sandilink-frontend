"use client";

import { useState } from "react";
import { Video } from "lucide-react";
import { DELIVERY_MODES } from "@/lib/catalogs";
import { CatalogManager } from "./catalog-manager";

export function DeliveryModesAdmin() {
  const [entries, setEntries] = useState(DELIVERY_MODES);

  return (
    <CatalogManager
      title="Delivery modes"
      description="How a service is delivered (in-person, virtual, hybrid, asynchronous, …). Open-ended — add new modes as the platform expands."
      icon={Video}
      entries={entries}
      setEntries={setEntries}
      idHint="e.g. mobile-clinic"
    />
  );
}
