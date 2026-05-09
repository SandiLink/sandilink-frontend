"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ban,
  CheckCircle2,
  Eye,
  FlaskConical,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

const RESEARCHERS = [
  {
    id: "r-001",
    name: "Dr. Amira Rashid",
    email: "a.rashid@universitymed.edu",
    institution: "University Medical Center",
    field: "Public Health / AI",
    status: "verified",
    hIndex: 18,
    grants: 3,
    joined: "2026-01-15",
  },
  {
    id: "r-002",
    name: "Dr. Helen Park",
    email: "h.park@jhu.edu",
    institution: "Johns Hopkins University",
    field: "Community Health",
    status: "verified",
    hIndex: 12,
    grants: 1,
    joined: "2026-02-01",
  },
  {
    id: "r-003",
    name: "Dr. Marco Silva",
    email: "m.silva@usp.br",
    institution: "University of São Paulo",
    field: "AI Diagnostics",
    status: "pending",
    hIndex: 8,
    grants: 0,
    joined: "2026-03-20",
  },
  {
    id: "r-004",
    name: "Dr. Wei Zhang",
    email: "w.zhang@mit.edu",
    institution: "MIT",
    field: "Computational Biology",
    status: "verified",
    hIndex: 22,
    grants: 2,
    joined: "2025-11-10",
  },
  {
    id: "r-005",
    name: "Dr. Priya Sharma",
    email: "p.sharma@aiims.edu",
    institution: "AIIMS Delhi",
    field: "Epidemiology",
    status: "pending",
    hIndex: 6,
    grants: 0,
    joined: "2026-04-01",
  },
  {
    id: "r-006",
    name: "Dr. James Okonkwo",
    email: "j.okonkwo@emory.edu",
    institution: "Emory University",
    field: "Clinical Trials",
    status: "suspended",
    hIndex: 15,
    grants: 1,
    joined: "2025-09-05",
  },
];

const STATUS_BADGE = {
  verified: "default",
  pending: "secondary",
  suspended: "destructive",
};

export function ManageResearchers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const tableColumns = [
    {
      header: "Name",
      accessorKey: "name",
      className: "text-left",
      cellClassName: "text-sm",
      cell: (row) => (
        <div>
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Institution",
      accessorKey: "institution",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Field",
      accessorKey: "field",
      className: "text-left",
      cellClassName: "",
      cell: (row) => (
        <Badge variant="outline" className="text-[10px]">
          {row.field}
        </Badge>
      ),
    },
    {
      header: "h-index",
      accessorKey: "hIndex",
      className: "text-left",
      cellClassName: "text-sm font-medium",
    },
    {
      header: "Grants",
      accessorKey: "grants",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Status",
      accessorKey: "status",
      className: "text-left",
      cellClassName: "",
      cell: (row) => (
        <Badge variant={STATUS_BADGE[row.status]} className="capitalize">
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Joined",
      accessorKey: "joined",
      className: "text-left",
      cellClassName: "text-sm text-muted-foreground",
    },
  ];

  const tableActions = (row) => {
    const actions = [
      {
        content: (
          <div className="flex items-center gap-2">
            <Eye className="size-4" />
            View Details
          </div>
        ),
        onClick: () => {
          console.log("View", row.id);
        },
      },
    ];

    if (row.status === "pending") {
      actions.push({
        content: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            Verify
          </div>
        ),
        onClick: () => {
          console.log("Verify", row.id);
        },
      });
    }

    actions.push({ separator: true });

    if (row.status !== "suspended") {
      actions.push({
        content: (
          <div className="flex items-center gap-2 text-destructive">
            <Ban className="size-4" />
            Suspend
          </div>
        ),
        onClick: () => {
          console.log("Suspend", row.id);
        },
        className: "text-destructive",
      });
    } else {
      actions.push({
        content: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            Reactivate
          </div>
        ),
        onClick: () => {
          console.log("Reactivate", row.id);
        },
      });
    }

    return actions;
  };

  const stats = [
    {
      label: "Total",
      value: RESEARCHERS.length,
      icon: FlaskConical,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Verified",
      value: RESEARCHERS.filter((r) => r.status === "verified").length,
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Pending",
      value: RESEARCHERS.filter((r) => r.status === "pending").length,
      icon: ShieldCheck,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Suspended",
      value: RESEARCHERS.filter((r) => r.status === "suspended").length,
      icon: Ban,
      color: "text-destructive bg-destructive/10",
    },
  ];

  const filtered = RESEARCHERS.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.institution.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Researchers
          </h1>
          <p className="text-muted-foreground">
            Verify credentials and manage researcher accounts.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground ms-auto">
          <Users className="size-4" />
          {RESEARCHERS.length} researchers
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}
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

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search researchers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent>
          <DataTable
            columns={tableColumns}
            data={filtered}
            actions={tableActions}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
