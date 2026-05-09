"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { LocalizedText } from "@/components/shared/localized-text";
import { localizedHaystack } from "@/lib/localized-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Multi-select picker driven by a catalog (specialties, credentials, etc.).
 * `value` is an array of catalog IDs; `onChange` receives the next array.
 *
 *   <CatalogMultiSelect catalog={SPECIALTIES} value={ids} onChange={setIds} />
 *
 * - Picks active entries from the catalog (`status === "active"`).
 * - Renders a popover with a search box + checklist; selected items show as
 *   chips below the trigger so users can remove without reopening.
 * - Search matches across all locale variants via `localizedHaystack`.
 */
export function CatalogMultiSelect({
  catalog,
  value = [],
  onChange,
  placeholder = "Select…",
  emptyText = "No options.",
  className,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const options = useMemo(
    () => catalog.filter((e) => e.status === "active"),
    [catalog],
  );

  const q = search.trim().toLowerCase();
  const filtered = !q
    ? options
    : options.filter((o) => localizedHaystack(o.label).includes(q));

  function toggle(id) {
    const next = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(next);
  }

  function removeChip(id) {
    onChange(value.filter((v) => v !== id));
  }

  const selectedEntries = value
    .map((id) => options.find((o) => o.id === id))
    .filter(Boolean);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-10 w-full justify-between font-normal"
          >
            <span className={value.length === 0 ? "text-muted-foreground" : ""}>
              {value.length === 0
                ? placeholder
                : `${value.length} selected`}
            </span>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <div className="border-b p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="p-3 text-center text-xs text-muted-foreground">{emptyText}</p>
            ) : (
              filtered.map((opt) => {
                const checked = value.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggle(opt.id)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input"
                      }`}
                    >
                      {checked && <Check className="size-3" />}
                    </span>
                    <span className="flex-1">
                      <LocalizedText value={opt.label} />
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selectedEntries.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedEntries.map((entry) => (
            <Badge key={entry.id} variant="secondary" className="gap-1 text-xs">
              <LocalizedText value={entry.label} />
              <button
                type="button"
                onClick={() => removeChip(entry.id)}
                className="hover:text-foreground"
                aria-label={`Remove ${entry.id}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
