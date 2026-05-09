"use client";

import { useState } from "react";
import {
  Award,
  DollarSign,
  Edit,
  Eye,
  Globe,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";

const GRANTS = [
  {
    id: "g-001",
    title: "NIH R21 — Exploratory Research",
    funder: "NIH",
    amount: "$275K",
    deadline: "Apr 15, 2026",
    region: "US",
    field: "Biomedical",
    status: "Active",
    applications: 12,
  },
  {
    id: "g-002",
    title: "Gates Foundation — Global Health Innovation",
    funder: "Gates Foundation",
    amount: "$1M",
    deadline: "May 1, 2026",
    region: "Global",
    field: "Global Health",
    status: "Active",
    applications: 8,
  },
  {
    id: "g-003",
    title: "NSF CAREER",
    funder: "NSF",
    amount: "$600K",
    deadline: "Jul 15, 2026",
    region: "US",
    field: "STEM",
    status: "Active",
    applications: 5,
  },
  {
    id: "g-004",
    title: "WHO — Health Systems",
    funder: "WHO",
    amount: "$200K",
    deadline: "Jun 30, 2026",
    region: "Global",
    field: "Public Health",
    status: "Active",
    applications: 3,
  },
  {
    id: "g-005",
    title: "Wellcome Trust — Discovery Research",
    funder: "Wellcome Trust",
    amount: "£3M",
    deadline: "Rolling",
    region: "Global",
    field: "Biomedical",
    status: "Active",
    applications: 6,
  },
  {
    id: "g-006",
    title: "PCORI — Patient-Centered Outcomes",
    funder: "PCORI",
    amount: "$500K",
    deadline: "May 15, 2026",
    region: "US",
    field: "Clinical",
    status: "Active",
    applications: 4,
  },
  {
    id: "g-007",
    title: "ERC Starting Grant",
    funder: "ERC",
    amount: "€1.5M",
    deadline: "Oct 22, 2026",
    region: "Europe",
    field: "All Fields",
    status: "Active",
    applications: 2,
  },
  {
    id: "g-008",
    title: "RWJF — Health Equity",
    funder: "RWJF",
    amount: "$350K",
    deadline: "Aug 1, 2026",
    region: "US",
    field: "Health Equity",
    status: "Draft",
    applications: 0,
  },
];

export function GrantsDirectoryManagement() {
  const [search, setSearch] = useState("");

  const filtered = GRANTS.filter(
    (g) =>
      !search ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.funder.toLowerCase().includes(search.toLowerCase()),
  );
  const grantsColumns = [
    {
      header: "Grant",
      accessorKey: "title",
      className: "text-left",
      cellClassName: "text-sm font-medium max-w-[200px] truncate",
      cell: (row) => (
        <p className="font-medium text-sm max-w-[200px] truncate">
          {row.title}
        </p>
      ),
    },
    {
      header: "Funder",
      accessorKey: "funder",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      className: "text-left",
      cellClassName: "text-sm font-medium",
    },
    {
      header: "Deadline",
      accessorKey: "deadline",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Region",
      accessorKey: "region",
      className: "text-left",
      cellClassName: "",
      cell: (row) => (
        <Badge variant="outline" className="text-[10px]">
          {row.region}
        </Badge>
      ),
    },
    {
      header: "Apps",
      accessorKey: "applications",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Status",
      accessorKey: "status",
      className: "text-left",
      cellClassName: "",
      cell: (row) => (
        <Badge variant={row.status === "Active" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
  ];
  const grantsActions = (row) => [
    {
      content: (
        <div className="flex items-center gap-2">
          <Eye className="size-4" />
          View
        </div>
      ),
      onClick: () => console.log("View grant", row.id),
    },
    {
      content: (
        <div className="flex items-center gap-2">
          <Edit className="size-4" />
          Edit
        </div>
      ),
      onClick: () => console.log("Edit grant", row.id),
    },
    { separator: true },
    {
      content: (
        <div className="flex items-center gap-2 text-destructive">
          <Trash2 className="size-4" />
          Delete
        </div>
      ),
      onClick: () => console.log("Delete grant", row.id),
      className: "text-destructive",
    },
  ];

  const stats = [
    {
      label: "Total Grants",
      value: GRANTS.length.toString(),
      icon: Award,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Active",
      value: GRANTS.filter((g) => g.status === "Active").length.toString(),
      icon: Globe,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Applications",
      value: GRANTS.reduce((s, g) => s + g.applications, 0).toString(),
      icon: DollarSign,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Drafts",
      value: GRANTS.filter((g) => g.status === "Draft").length.toString(),
      icon: Edit,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Grants Directory
          </h1>
          <p className="text-muted-foreground">
            Add, edit, and manage the global grants database.
          </p>
        </div>
        <div className="flex gap-2 ms-auto">
          <Button variant="outline" size="sm">
            <Upload className="size-4" />
            Import CSV
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            Add Grant
          </Button>
        </div>
      </div>

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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search grants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      <Card>
        <CardContent className="pt-4">
          <DataTable
            columns={grantsColumns}
            data={filtered}
            actions={grantsActions}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
