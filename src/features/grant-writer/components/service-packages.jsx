"use client";

import { useState } from "react";
import {
  CheckCircle2,
  DollarSign,
  Loader2,
  Pencil,
  PenTool,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_PACKAGES = [
  {
    id: "pkg-001",
    name: "Full Proposal Writing",
    description:
      "End-to-end grant proposal development from specific aims through final submission-ready document. Includes strategy consultation, narrative writing, budget development, and two rounds of revisions.",
    price: "From $5,000",
    turnaround: "4–6 weeks",
    includes: [
      "Strategy consultation",
      "Specific aims development",
      "Full narrative (Significance, Innovation, Approach)",
      "Budget & justification",
      "2 revision rounds",
      "Submission-ready formatting",
    ],
    active: true,
    popular: true,
  },
  {
    id: "pkg-002",
    name: "Proposal Review & Editing",
    description:
      "Critical review of a near-complete proposal with detailed feedback on structure, narrative strength, reviewer appeal, and compliance with funder guidelines.",
    price: "From $1,500",
    turnaround: "1–2 weeks",
    includes: [
      "Line-by-line review",
      "Structural feedback",
      "Reviewer perspective analysis",
      "Compliance check",
      "Summary report with action items",
    ],
    active: true,
    popular: false,
  },
  {
    id: "pkg-003",
    name: "Specific Aims Page",
    description:
      "Strategic development and writing of the Specific Aims page — the most critical component of any NIH-style proposal.",
    price: "From $800",
    turnaround: "3–5 days",
    includes: [
      "Strategy session",
      "Aims drafting",
      "1 revision round",
      "Final polished document",
    ],
    active: true,
    popular: false,
  },
  {
    id: "pkg-004",
    name: "Budget Development",
    description:
      "Complete budget construction and justification aligned with funder requirements and institutional guidelines.",
    price: "From $600",
    turnaround: "3–5 days",
    includes: [
      "Personnel cost modeling",
      "Equipment & supplies",
      "Travel & other costs",
      "Indirect cost calculation",
      "Written justification",
    ],
    active: true,
    popular: false,
  },
  {
    id: "pkg-005",
    name: "Resubmission Strategy",
    description:
      "Strategic response to reviewer critiques, revision plan, and rewriting of weakened sections for resubmission.",
    price: "From $2,000",
    turnaround: "2–3 weeks",
    includes: [
      "Critique analysis",
      "Response-to-reviewers letter",
      "Revised narrative sections",
      "Strengthened methodology",
      "1 revision round",
    ],
    active: true,
    popular: false,
  },
  {
    id: "pkg-006",
    name: "Letter of Intent / Pre-proposal",
    description:
      "Concise, compelling LOI or pre-proposal for foundations and private funders.",
    price: "From $400",
    turnaround: "2–3 days",
    includes: [
      "Project summary",
      "Aims overview",
      "Budget estimate",
      "1 revision round",
    ],
    active: false,
    popular: false,
  },
];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  turnaround: "",
  includes: "",
};

export function ServicePackages() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isEditing = editingId !== null;

  function toggleActive(id) {
    setPackages(
      packages.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  }

  function togglePopular(id) {
    setPackages(
      packages.map((p) => (p.id === id ? { ...p, popular: !p.popular } : p)),
    );
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setOpen(true);
  }

  function openEdit(pkg) {
    setEditingId(pkg.id);
    setForm({
      name: pkg.name,
      description: pkg.description ?? "",
      price: pkg.price,
      turnaround: pkg.turnaround === "—" ? "" : pkg.turnaround,
      includes: (pkg.includes ?? []).join("\n"),
    });
    setOpen(true);
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const price = form.price.trim();
    if (!name || !price) {
      toast.error("Name and price are required.");
      return;
    }
    const includes = form.includes
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    setSubmitting(true);
    setTimeout(() => {
      if (isEditing) {
        setPackages((prev) =>
          prev.map((p) =>
            p.id === editingId
              ? {
                  ...p,
                  name,
                  description: form.description.trim(),
                  price,
                  turnaround: form.turnaround.trim() || "—",
                  includes,
                }
              : p,
          ),
        );
        toast.success(`Updated "${name}"`);
      } else {
        const newPkg = {
          id: `pkg-${Date.now()}`,
          name,
          description: form.description.trim(),
          price,
          turnaround: form.turnaround.trim() || "—",
          includes,
          active: true,
          popular: false,
        };
        setPackages((prev) => [newPkg, ...prev]);
        toast.success(`Added "${name}"`, {
          description: "The package is live and bookable by clients.",
        });
      }
      setSubmitting(false);
      setOpen(false);
      setEditingId(null);
    }, 400);
  }

  function handleDelete(pkg) {
    toast(`Delete "${pkg.name}"?`, {
      description: "This cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
          toast.success(`Deleted "${pkg.name}"`);
        },
      },
      cancel: { label: "Cancel" },
    });
  }

  const stats = [
    {
      label: "Active Packages",
      value: packages.filter((p) => p.active).length.toString(),
      icon: PenTool,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Price Range",
      value: "$400 – $5,000+",
      icon: DollarSign,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Total Offerings",
      value: packages.length.toString(),
      icon: CheckCircle2,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Service Packages
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure and manage your grant writing service offerings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={openAdd}>
            <Plus className="size-4" />
            Add Package
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${s.color}`}
                >
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Packages */}
      <div className="grid gap-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={!pkg.active ? "opacity-60" : ""}>
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold">{pkg.name}</h3>
                    {pkg.popular && (
                      <Badge className="text-[10px]">Popular</Badge>
                    )}
                    {!pkg.active && (
                      <Badge variant="outline" className="text-[10px]">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {pkg.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <DollarSign className="size-3" />
                      {pkg.price}
                    </span>
                    <span>Turnaround: {pkg.turnaround}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
                      Includes:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {pkg.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 text-xs text-muted-foreground"
                        >
                          <CheckCircle2 className="size-3 shrink-0 text-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Active
                    </span>
                    <Switch
                      checked={pkg.active}
                      onCheckedChange={() => toggleActive(pkg.id)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Featured
                    </span>
                    <Switch
                      checked={pkg.popular}
                      onCheckedChange={() => togglePopular(pkg.id)}
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => openEdit(pkg)}
                      aria-label={`Edit ${pkg.name}`}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(pkg)}
                      aria-label={`Delete ${pkg.name}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md!">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit service package" : "Add a service package"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Changes save immediately and update what researchers see on your profile."
                  : "New packages appear in your public profile and can be booked by researchers immediately."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pkg-name">Package name *</Label>
                <Input
                  id="pkg-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. NIH K-Award Coaching"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pkg-description">Description</Label>
                <Textarea
                  id="pkg-description"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="What's the value, scope, and deliverable?"
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="pkg-price">Price *</Label>
                  <Input
                    id="pkg-price"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="From $1,500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pkg-turnaround">Turnaround</Label>
                  <Input
                    id="pkg-turnaround"
                    value={form.turnaround}
                    onChange={(e) => update("turnaround", e.target.value)}
                    placeholder="2–3 weeks"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pkg-includes">What's included</Label>
                <Textarea
                  id="pkg-includes"
                  value={form.includes}
                  onChange={(e) => update("includes", e.target.value)}
                  placeholder={`One bullet per line, e.g.:\nStrategy session\n2 revision rounds\nFinal polished draft`}
                  rows={4}
                />
                <p className="text-[11px] text-muted-foreground">
                  One bullet per line — these appear as the package's checklist.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="size-4 animate-spin" data-icon="inline-start" />}
                {submitting
                  ? "Saving…"
                  : isEditing
                    ? "Save changes"
                    : "Add package"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
