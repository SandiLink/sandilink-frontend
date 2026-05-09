"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { LOCALES, DEFAULT_LOCALE } from "@/i18n/config";
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
  DialogTrigger,
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

/**
 * Shared CRUD shell for catalog admin screens (categories / specialties /
 * service types / credentials / delivery modes).
 *
 * Caller supplies:
 *   - title, description, icon
 *   - entries / setEntries — useState pair owned by the page
 *   - extraFields — array of `{ name, label, type, options?, ... }` describing
 *     catalog-specific add-form fields (e.g. categoryId for specialties)
 *   - extraColumns — array of `{ header, render }` to render those fields in
 *     the table
 *
 * Status (active / deactivated) and per-locale labels are baked into the
 * shell — every catalog gets them for free.
 */

const EMPTY_LABEL = () => Object.fromEntries(LOCALES.map((l) => [l.code, ""]));

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function CatalogManager({
  title,
  description,
  icon: Icon,
  entries,
  setEntries,
  extraFields = [],
  extraColumns = [],
  idHint = "auto-derived from English label",
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState(null);

  const stats = useMemo(() => {
    const active = entries.filter((e) => e.status === "active").length;
    return {
      total: entries.length,
      active,
      deactivated: entries.length - active,
    };
  }, [entries]);

  const q = search.trim().toLowerCase();
  const filtered = entries.filter((e) => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (!q) return true;
    if (e.id.toLowerCase().includes(q)) return true;
    return Object.values(e.label ?? {}).some(
      (v) => typeof v === "string" && v.toLowerCase().includes(q),
    );
  });

  function startCreate() {
    setEditingId(null);
    setDraft({
      id: "",
      label: EMPTY_LABEL(),
      status: "active",
      ...Object.fromEntries(extraFields.map((f) => [f.name, f.defaultValue ?? ""])),
    });
    setError(null);
    setOpen(true);
  }

  function startEdit(entry) {
    setEditingId(entry.id);
    setDraft({
      ...entry,
      label: { ...EMPTY_LABEL(), ...(entry.label ?? {}) },
    });
    setError(null);
    setOpen(true);
  }

  function handleSave() {
    if (!draft) return;
    const enLabel = (draft.label[DEFAULT_LOCALE] ?? "").trim();
    if (!enLabel) {
      setError(`English label is required.`);
      return;
    }
    const nextId = (draft.id || "").trim() || slugify(enLabel);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(nextId)) {
      setError("ID must be lowercase letters, digits, or hyphens.");
      return;
    }
    if (
      editingId !== nextId &&
      entries.some((e) => e.id === nextId)
    ) {
      setError(`'${nextId}' already exists.`);
      return;
    }
    for (const f of extraFields) {
      if (f.required && !draft[f.name]) {
        setError(`${f.label} is required.`);
        return;
      }
    }

    if (editingId) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingId ? { ...draft, id: nextId } : e)),
      );
    } else {
      setEntries((prev) => [...prev, { ...draft, id: nextId }]);
    }
    setOpen(false);
    setDraft(null);
    setEditingId(null);
  }

  function toggleStatus(id) {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "active" ? "deactivated" : "active" }
          : e,
      ),
    );
  }

  function remove(id) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const filledLocales = (entry) =>
    LOCALES.filter((l) => entry.label?.[l.code]?.trim()).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button onClick={startCreate}>
          <Plus className="size-4" />
          Add entry
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-3">
        {[
          { label: "Total", value: stats.total },
          { label: "Active", value: stats.active },
          { label: "Deactivated", value: stats.deactivated },
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search ID or any locale label…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active only</SelectItem>
            <SelectItem value="deactivated">Deactivated</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground ml-auto">
          {filtered.length} / {entries.length}
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                No entries match.
              </p>
            ) : (
              filtered.map((entry) => (
                <div
                  key={entry.id}
                  className={`grid gap-3 p-4 md:grid-cols-[1fr_auto] ${
                    entry.status === "deactivated" ? "opacity-60" : ""
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">
                        {entry.label?.[DEFAULT_LOCALE] || entry.id}
                      </p>
                      <Badge
                        variant={entry.status === "active" ? "default" : "secondary"}
                        className="text-[10px] capitalize"
                      >
                        {entry.status}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {filledLocales(entry)}/{LOCALES.length} locales
                      </Badge>
                      {extraColumns.map((col) => (
                        <span key={col.header}>{col.render(entry)}</span>
                      ))}
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">{entry.id}</p>
                  </div>
                  <div className="flex items-center gap-1 justify-self-end">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => startEdit(entry)}
                      aria-label={`Edit ${entry.id}`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleStatus(entry.id)}
                      aria-label={
                        entry.status === "active"
                          ? `Deactivate ${entry.id}`
                          : `Reactivate ${entry.id}`
                      }
                    >
                      {entry.status === "active" ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => remove(entry.id)}
                      aria-label={`Remove ${entry.id}`}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            setDraft(null);
            setEditingId(null);
            setError(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit entry" : "Add entry"}</DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update labels and metadata for this catalog entry."
                : "New entries default to active. Translations can be filled later via the localized-content admin."}
            </DialogDescription>
          </DialogHeader>

          {draft && (
            <div className="space-y-4 py-2">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="id">ID</Label>
                  <Input
                    id="id"
                    value={draft.id}
                    onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
                    placeholder={idHint}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={draft.status}
                    onValueChange={(v) => setDraft((d) => ({ ...d, status: v }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="deactivated">Deactivated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {extraFields.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2">
                  {extraFields.map((field) => {
                    const value = draft[field.name] ?? "";
                    if (field.type === "select") {
                      return (
                        <div key={field.name} className="grid gap-1.5">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <Select
                            value={value || ""}
                            onValueChange={(v) =>
                              setDraft((d) => ({ ...d, [field.name]: v }))
                            }
                          >
                            <SelectTrigger id={field.name}>
                              <SelectValue placeholder={field.placeholder ?? "Select…"} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {field.help && (
                            <p className="text-xs text-muted-foreground">{field.help}</p>
                          )}
                        </div>
                      );
                    }
                    if (field.type === "checkbox") {
                      return (
                        <div key={field.name} className="grid gap-1.5">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <div className="flex items-center gap-2 h-10">
                            <input
                              id={field.name}
                              type="checkbox"
                              checked={!!value}
                              onChange={(e) =>
                                setDraft((d) => ({ ...d, [field.name]: e.target.checked }))
                              }
                              className="size-4 accent-primary"
                            />
                            <span className="text-sm text-muted-foreground">{field.help ?? ""}</span>
                          </div>
                        </div>
                      );
                    }
                    if (field.type === "number") {
                      return (
                        <div key={field.name} className="grid gap-1.5">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <Input
                            id={field.name}
                            type="number"
                            value={value}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, [field.name]: e.target.value }))
                            }
                            placeholder={field.placeholder}
                          />
                          {field.help && (
                            <p className="text-xs text-muted-foreground">{field.help}</p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div key={field.name} className="grid gap-1.5">
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <Input
                          id={field.name}
                          value={value}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, [field.name]: e.target.value }))
                          }
                          placeholder={field.placeholder}
                        />
                        {field.help && (
                          <p className="text-xs text-muted-foreground">{field.help}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="grid gap-2">
                <Label className="text-sm">Labels per locale</Label>
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
                        value={draft.label[l.code] ?? ""}
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
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save changes" : "Create entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
