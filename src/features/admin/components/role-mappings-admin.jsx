"use client";

import { useMemo, useState } from "react";
import { Globe2, Map, Pencil, Plus, Trash2 } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
import {
  CREDENTIALS,
  GLOBAL_ROLES,
  REGIONS,
  ROLE_MAPPINGS,
  activeOnly,
  getRoleMapping,
} from "@/lib/catalogs";
import { LocalizedText } from "@/components/shared/localized-text";
import { CatalogMultiSelect } from "@/components/shared/catalog-multi-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EMPTY_LABEL = () => Object.fromEntries(LOCALES.map((l) => [l.code, ""]));

function MappingDialog({
  open,
  onOpenChange,
  globalRoles,
  regions,
  initial,
  onSave,
  onDelete,
}) {
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState(null);

  if (!draft) return null;

  function save() {
    if (!draft.globalRoleId || !draft.regionCode) {
      setError("Pick a global role and a region.");
      return;
    }
    if (!draft.localName?.[DEFAULT_LOCALE]?.trim()) {
      setError("Local role name is required in the default language.");
      return;
    }
    onSave(draft);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{initial?.existing ? "Edit mapping" : "Add mapping"}</DialogTitle>
          <DialogDescription>
            Map a canonical global role to its local naming and credentials in
            this region. Mappings drive directory facets and provider-profile
            display.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Global role</Label>
              <Select
                value={draft.globalRoleId || ""}
                onValueChange={(v) => setDraft((d) => ({ ...d, globalRoleId: v }))}
                disabled={!!initial?.existing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pick a global role…" />
                </SelectTrigger>
                <SelectContent>
                  {globalRoles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      <LocalizedText value={r.label} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Region</Label>
              <Select
                value={draft.regionCode || ""}
                onValueChange={(v) => setDraft((d) => ({ ...d, regionCode: v }))}
                disabled={!!initial?.existing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pick a region…" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.code} value={r.code}>
                      <LocalizedText value={r.label} />
                      <span className="ml-1 font-mono text-xs text-muted-foreground">
                        {r.code}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm">Local role name (per locale)</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {LOCALES.map((l) => (
                <div key={l.code} className="grid gap-1">
                  <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {l.flag} {l.native}
                    {l.code === DEFAULT_LOCALE && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
                  </Label>
                  <Input
                    value={draft.localName?.[l.code] ?? ""}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        localName: { ...(d.localName ?? {}), [l.code]: e.target.value },
                      }))
                    }
                    dir={l.dir}
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label>Credentials in this region</Label>
            <CatalogMultiSelect
              catalog={CREDENTIALS}
              value={draft.credentialIds ?? []}
              onChange={(ids) => setDraft((d) => ({ ...d, credentialIds: ids }))}
              placeholder="Pick the credentials this role typically holds…"
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Notes (optional)</Label>
            <Textarea
              value={draft.notes ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              rows={3}
              placeholder="Scope-of-practice differences, licensure peculiarities, etc."
              className="text-sm"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {initial?.existing && (
            <Button
              variant="ghost"
              onClick={() => {
                onDelete(draft.globalRoleId, draft.regionCode);
                onOpenChange(false);
              }}
              className="mr-auto text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4" />
              Remove mapping
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddRoleDialog({ open, onOpenChange, onSave, existingIds }) {
  const [draft, setDraft] = useState({ id: "", label: EMPTY_LABEL() });
  const [error, setError] = useState(null);

  function save() {
    const en = draft.label[DEFAULT_LOCALE]?.trim();
    if (!en) {
      setError("English label is required.");
      return;
    }
    const id =
      draft.id.trim() ||
      en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) {
      setError("ID must be lowercase letters, digits, or hyphens.");
      return;
    }
    if (existingIds.includes(id)) {
      setError(`'${id}' already exists.`);
      return;
    }
    onSave({ id, status: "active", label: { ...draft.label } });
    setDraft({ id: "", label: EMPTY_LABEL() });
    setError(null);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) {
          setDraft({ id: "", label: EMPTY_LABEL() });
          setError(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add a global role</DialogTitle>
          <DialogDescription>
            A canonical role concept that local jurisdictions map to.
            Per-region naming + credentials are added separately via the
            matrix.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid gap-1.5">
            <Label htmlFor="role-id">ID (optional)</Label>
            <Input
              id="role-id"
              value={draft.id}
              onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
              placeholder="auto-derived from English label if empty"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm">Label per locale</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {LOCALES.map((l) => (
                <div key={l.code} className="grid gap-1">
                  <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {l.flag} {l.native}
                    {l.code === DEFAULT_LOCALE && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
                  </Label>
                  <Input
                    value={draft.label[l.code]}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        label: { ...d.label, [l.code]: e.target.value },
                      }))
                    }
                    dir={l.dir}
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Add role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddRegionDialog({ open, onOpenChange, onSave, existingCodes }) {
  const [draft, setDraft] = useState({
    code: "",
    kind: "country",
    label: EMPTY_LABEL(),
  });
  const [error, setError] = useState(null);

  function save() {
    const code = draft.code.trim().toUpperCase();
    if (!/^[A-Z]{2,3}$/.test(code)) {
      setError("Region code must be 2–3 letters (ISO-style).");
      return;
    }
    if (existingCodes.includes(code)) {
      setError(`'${code}' already exists.`);
      return;
    }
    if (!draft.label[DEFAULT_LOCALE]?.trim()) {
      setError("English label is required.");
      return;
    }
    onSave({ code, status: "active", kind: draft.kind, label: { ...draft.label } });
    setDraft({ code: "", kind: "country", label: EMPTY_LABEL() });
    setError(null);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) {
          setDraft({ code: "", kind: "country", label: EMPTY_LABEL() });
          setError(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add a region</DialogTitle>
          <DialogDescription>
            Country (e.g. NZ, IN) or continent-level scope (e.g. SA for South
            America). Add country entries when granular regulation diverges
            from the continent default.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="region-code">Code</Label>
              <Input
                id="region-code"
                value={draft.code}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, code: e.target.value.toUpperCase() }))
                }
                placeholder="e.g. NZ"
                maxLength={3}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Kind</Label>
              <Select
                value={draft.kind}
                onValueChange={(v) => setDraft((d) => ({ ...d, kind: v }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="continent">Continent / region</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm">Label per locale</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {LOCALES.map((l) => (
                <div key={l.code} className="grid gap-1">
                  <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {l.flag} {l.native}
                    {l.code === DEFAULT_LOCALE && (
                      <span className="ml-1 text-destructive">*</span>
                    )}
                  </Label>
                  <Input
                    value={draft.label[l.code]}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        label: { ...d.label, [l.code]: e.target.value },
                      }))
                    }
                    dir={l.dir}
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Add region</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RoleMappingsAdmin() {
  const [globalRoles, setGlobalRoles] = useState(GLOBAL_ROLES);
  const [regions, setRegions] = useState(REGIONS);
  const [mappings, setMappings] = useState(ROLE_MAPPINGS);

  const [mappingDialog, setMappingDialog] = useState({ open: false, draft: null });
  const [addRoleOpen, setAddRoleOpen] = useState(false);
  const [addRegionOpen, setAddRegionOpen] = useState(false);

  const activeRoles = activeOnly(globalRoles);
  const activeRegions = activeOnly(regions);

  const totalCells = activeRoles.length * activeRegions.length;
  const filledCells = useMemo(
    () =>
      mappings.filter(
        (m) =>
          activeRoles.some((r) => r.id === m.globalRoleId) &&
          activeRegions.some((r) => r.code === m.regionCode),
      ).length,
    [mappings, activeRoles, activeRegions],
  );
  const completeness =
    totalCells === 0 ? 0 : Math.round((filledCells / totalCells) * 100);

  function openCell(globalRoleId, regionCode) {
    const existing = getRoleMapping(mappings, globalRoleId, regionCode);
    setMappingDialog({
      open: true,
      draft: existing
        ? { ...existing, existing: true }
        : {
            globalRoleId,
            regionCode,
            credentialIds: [],
            localName: EMPTY_LABEL(),
            notes: "",
            existing: false,
          },
    });
  }

  function saveMapping(draft) {
    const { existing: _omit, ...payload } = draft;
    setMappings((prev) => {
      const idx = prev.findIndex(
        (m) =>
          m.globalRoleId === payload.globalRoleId &&
          m.regionCode === payload.regionCode,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });
  }

  function deleteMapping(globalRoleId, regionCode) {
    setMappings((prev) =>
      prev.filter(
        (m) => !(m.globalRoleId === globalRoleId && m.regionCode === regionCode),
      ),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Map className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Global role mapping</h1>
            <p className="text-muted-foreground">
              Hub-and-spoke: each canonical global role maps to a local name and
              credentials per region. Click any cell to add or edit a mapping.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAddRegionOpen(true)}>
            <Globe2 className="size-4" />
            Add region
          </Button>
          <Button onClick={() => setAddRoleOpen(true)}>
            <Plus className="size-4" />
            Add global role
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Global roles", value: activeRoles.length },
          { label: "Regions", value: activeRegions.length },
          { label: "Mappings filled", value: `${filledCells}/${totalCells}` },
          { label: "Coverage", value: `${completeness}%` },
        ].map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold font-heading tabular-nums">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs">
                <tr>
                  <th className="sticky left-0 z-10 bg-muted/40 px-4 py-3 text-left font-medium min-w-[220px]">
                    Global role
                  </th>
                  {activeRegions.map((r) => (
                    <th key={r.code} className="px-3 py-3 text-left font-medium min-w-[200px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-muted-foreground">{r.code}</span>
                        <LocalizedText value={r.label} />
                        {r.kind === "continent" && (
                          <Badge variant="outline" className="text-[9px]">
                            Continent
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {activeRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-muted/20">
                    <td className="sticky left-0 z-10 bg-background px-4 py-3 align-top">
                      <div>
                        <p className="text-sm font-medium">
                          <LocalizedText value={role.label} />
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">{role.id}</p>
                      </div>
                    </td>
                    {activeRegions.map((region) => {
                      const m = getRoleMapping(mappings, role.id, region.code);
                      return (
                        <td key={region.code} className="px-3 py-2 align-top">
                          {m ? (
                            <button
                              type="button"
                              onClick={() => openCell(role.id, region.code)}
                              className="group block w-full rounded-md border bg-card p-2.5 text-left transition-colors hover:border-primary hover:bg-accent"
                            >
                              <p className="text-xs font-medium leading-tight">
                                <LocalizedText value={m.localName} />
                              </p>
                              {m.credentialIds?.length > 0 && (
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  {m.credentialIds.map((cid) => {
                                    const c = CREDENTIALS.find((x) => x.id === cid);
                                    return (
                                      <Badge key={cid} variant="secondary" className="text-[9px] uppercase">
                                        {c?.id ?? cid}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              )}
                              {m.notes && (
                                <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">
                                  {m.notes}
                                </p>
                              )}
                              <span className="mt-1 hidden text-[10px] text-primary group-hover:inline-flex items-center gap-1">
                                <Pencil className="size-2.5" /> Edit
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => openCell(role.id, region.code)}
                              className="block w-full rounded-md border border-dashed p-2.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                              <span className="inline-flex items-center gap-1">
                                <Plus className="size-3" />
                                Add mapping
                              </span>
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <MappingDialog
        open={mappingDialog.open}
        onOpenChange={(o) => setMappingDialog((s) => ({ ...s, open: o }))}
        globalRoles={activeRoles}
        regions={activeRegions}
        initial={mappingDialog.draft}
        onSave={saveMapping}
        onDelete={deleteMapping}
        key={
          mappingDialog.draft
            ? `${mappingDialog.draft.globalRoleId}-${mappingDialog.draft.regionCode}`
            : "closed"
        }
      />

      <AddRoleDialog
        open={addRoleOpen}
        onOpenChange={setAddRoleOpen}
        onSave={(role) => setGlobalRoles((prev) => [...prev, role])}
        existingIds={globalRoles.map((r) => r.id)}
      />

      <AddRegionDialog
        open={addRegionOpen}
        onOpenChange={setAddRegionOpen}
        onSave={(region) => setRegions((prev) => [...prev, region])}
        existingCodes={regions.map((r) => r.code)}
      />
    </div>
  );
}
