"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DELIVERABLES = [
  {
    id: "d-01",
    project: "NIH R21 — Mental Health Interventions",
    client: "Dr. Amira Rashid",
    name: "specific_aims_v2_final.docx",
    size: "128 KB",
    type: "Specific Aims",
    date: "Mar 16, 2026",
    status: "Approved",
  },
  {
    id: "d-02",
    project: "NIH R21 — Mental Health Interventions",
    client: "Dr. Amira Rashid",
    name: "significance_innovation_draft.docx",
    size: "245 KB",
    type: "Narrative",
    date: "Mar 30, 2026",
    status: "In Review",
  },
  {
    id: "d-03",
    project: "NIH R21 — Mental Health Interventions",
    client: "Dr. Amira Rashid",
    name: "budget_template_R21.xlsx",
    size: "56 KB",
    type: "Budget",
    date: "Mar 28, 2026",
    status: "Draft",
  },
  {
    id: "d-04",
    project: "NSF CAREER — Biomedical Imaging",
    client: "Dr. Robert Chen",
    name: "resubmission_response_letter.docx",
    size: "89 KB",
    type: "Response Letter",
    date: "Mar 25, 2026",
    status: "In Review",
  },
  {
    id: "d-05",
    project: "NSF CAREER — Biomedical Imaging",
    client: "Dr. Robert Chen",
    name: "revised_approach_section.docx",
    size: "312 KB",
    type: "Narrative",
    date: "Mar 22, 2026",
    status: "Draft",
  },
  {
    id: "d-06",
    project: "PCORI — Patient-Centered Outcomes",
    client: "Dr. Karen Lee",
    name: "proposal_review_feedback.pdf",
    size: "156 KB",
    type: "Review",
    date: "Apr 1, 2026",
    status: "Delivered",
  },
  {
    id: "d-07",
    project: "RWJF — Health Equity",
    client: "Dr. Sarah Mitchell",
    name: "initial_outline.docx",
    size: "45 KB",
    type: "Outline",
    date: "Apr 2, 2026",
    status: "Draft",
  },
  {
    id: "d-08",
    project: "NIH R01 — Cardiovascular Disease",
    client: "Dr. R. Thompson",
    name: "final_proposal_complete.pdf",
    size: "2.8 MB",
    type: "Full Proposal",
    date: "Dec 10, 2025",
    status: "Approved",
  },
];

const STATUS_CONFIG = {
  Approved: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  Delivered: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  "In Review": { icon: Eye, color: "text-blue-600 dark:text-blue-400" },
  Draft: { icon: Clock, color: "text-amber-600 dark:text-amber-400" },
};

export function ProjectDeliverables() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = DELIVERABLES.filter((d) => {
    const matchesSearch =
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.project.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total Files",
      value: DELIVERABLES.length.toString(),
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Approved",
      value: DELIVERABLES.filter(
        (d) => d.status === "Approved" || d.status === "Delivered",
      ).length.toString(),
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "In Review",
      value: DELIVERABLES.filter(
        (d) => d.status === "In Review",
      ).length.toString(),
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Drafts",
      value: DELIVERABLES.filter((d) => d.status === "Draft").length.toString(),
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Deliverables
          </h2>
          <p className="text-sm text-muted-foreground">
            All documents and files across your projects.
          </p>
        </div>
        <Button size="sm">
          <Upload className="size-4" />
          Upload File
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold font-heading tracking-tight">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files or projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px]">
            <Filter className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="In Review">In Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* File List */}
      <Card>
        <CardContent className="pt-4">
          {filtered.length > 0 ? (
            <div className="grid gap-2">
              {filtered.map((d) => {
                const cfg = STATUS_CONFIG[d.status];
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                        <FileText className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{d.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {d.project} · {d.client}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {d.size} · {d.type} · {d.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${cfg.color}`}
                      >
                        <cfg.icon className="size-3" />
                        {d.status}
                      </span>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">
                No deliverables match your filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
