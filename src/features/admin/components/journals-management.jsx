"use client";

import { useState } from "react";
import {
  BookOpen,
  Edit,
  Eye,
  Plus,
  Search,
  Star,
  Trash2,
  TrendingUp,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/DataTable";

const JOURNALS = [
  {
    id: "j-001",
    name: "The Lancet Digital Health",
    publisher: "Elsevier",
    impactFactor: 36.6,
    field: "Digital Health",
    access: "Open Access",
    submissions: 8,
    status: "Active",
  },
  {
    id: "j-002",
    name: "Nature Medicine",
    publisher: "Springer Nature",
    impactFactor: 82.9,
    field: "Biomedical",
    access: "Hybrid",
    submissions: 3,
    status: "Active",
  },
  {
    id: "j-003",
    name: "AJPH",
    publisher: "APHA",
    impactFactor: 12.4,
    field: "Public Health",
    access: "Subscription",
    submissions: 5,
    status: "Active",
  },
  {
    id: "j-004",
    name: "JAMA Network Open",
    publisher: "AMA",
    impactFactor: 13.8,
    field: "General Medicine",
    access: "Open Access",
    submissions: 6,
    status: "Active",
  },
  {
    id: "j-005",
    name: "Journal of Biomedical Informatics",
    publisher: "Elsevier",
    impactFactor: 8.0,
    field: "Health Informatics",
    access: "Hybrid",
    submissions: 4,
    status: "Active",
  },
  {
    id: "j-006",
    name: "BMC Public Health",
    publisher: "Springer Nature",
    impactFactor: 4.5,
    field: "Public Health",
    access: "Open Access",
    submissions: 7,
    status: "Active",
  },
  {
    id: "j-007",
    name: "The Lancet Global Health",
    publisher: "Elsevier",
    impactFactor: 34.3,
    field: "Global Health",
    access: "Open Access",
    submissions: 2,
    status: "Active",
  },
  {
    id: "j-008",
    name: "PLOS Medicine",
    publisher: "PLOS",
    impactFactor: 15.8,
    field: "General Medicine",
    access: "Open Access",
    submissions: 3,
    status: "Draft",
  },
];

export function JournalsManagement() {
  const [search, setSearch] = useState("");

  const filtered = JOURNALS.filter(
    (j) =>
      !search ||
      j.name.toLowerCase().includes(search.toLowerCase()) ||
      j.publisher.toLowerCase().includes(search.toLowerCase()),
  );

  const journalColumns = [
    {
      header: "Journal",
      accessorKey: "name",
      className: "text-left",
      cellClassName: "font-medium text-sm max-w-[200px] truncate",
      cell: (row) => (
        <p className="font-medium text-sm max-w-[200px] truncate">{row.name}</p>
      ),
    },
    {
      header: "Publisher",
      accessorKey: "publisher",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "IF",
      accessorKey: "impactFactor",
      className: "text-left",
      cellClassName:
        "text-sm font-semibold text-emerald-600 dark:text-emerald-400",
    },
    {
      header: "Field",
      accessorKey: "field",
      className: "text-left",
      cell: (row) => (
        <Badge variant="outline" className="text-[10px]">
          {row.field}
        </Badge>
      ),
    },
    {
      header: "Access",
      accessorKey: "access",
      className: "text-left",
      cell: (row) => (
        <Badge
          variant={row.access === "Open Access" ? "default" : "secondary"}
          className="text-[10px]"
        >
          {row.access}
        </Badge>
      ),
    },
    {
      header: "Submissions",
      accessorKey: "submissions",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Status",
      accessorKey: "status",
      className: "text-left",
      cell: (row) => (
        <Badge variant={row.status === "Active" ? "default" : "outline"}>
          {row.status}
        </Badge>
      ),
    },
  ];
  const journalActions = (row) => [
    {
      content: (
        <div className="flex items-center gap-2">
          <Eye className="size-4" />
          View
        </div>
      ),
      onClick: () => console.log("View journal", row.id),
    },
    {
      content: (
        <div className="flex items-center gap-2">
          <Edit className="size-4" />
          Edit
        </div>
      ),
      onClick: () => console.log("Edit journal", row.id),
    },
    { separator: true },
    {
      content: (
        <div className="flex items-center gap-2 text-destructive">
          <Trash2 className="size-4" />
          Delete
        </div>
      ),
      onClick: () => console.log("Delete journal", row.id),
      className: "text-destructive",
    },
  ];
  const stats = [
    {
      label: "Total Journals",
      value: JOURNALS.length.toString(),
      icon: BookOpen,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Active",
      value: JOURNALS.filter((j) => j.status === "Active").length.toString(),
      icon: Star,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Total Submissions",
      value: JOURNALS.reduce((s, j) => s + j.submissions, 0).toString(),
      icon: TrendingUp,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Avg IF",
      value: (
        JOURNALS.reduce((s, j) => s + j.impactFactor, 0) / JOURNALS.length
      ).toFixed(1),
      icon: Star,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Journals Directory
          </h1>
          <p className="text-muted-foreground">
            Manage the academic journals database.
          </p>
        </div>
        <div className="flex gap-2 ms-auto">
          <Button variant="outline" size="sm">
            <Upload className="size-4" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            Add Journal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
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
          placeholder="Search journals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={journalColumns}
            data={filtered}
            actions={journalActions}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
            emptyMessage="No journals found."
          />
        </CardContent>
      </Card>
    </div>
  );
}
