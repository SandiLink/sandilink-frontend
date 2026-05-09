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
  PenTool,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

const WRITERS = [
  {
    id: "gw-001",
    name: "Dr. Lisa Nguyen",
    email: "lisa.nguyen@grantpro.com",
    location: "Boston, MA",
    successRate: "78%",
    grantsWon: 42,
    rating: 4.9,
    status: "verified",
    joined: "2025-06-15",
  },
  {
    id: "gw-002",
    name: "Mark Patterson, PhD",
    email: "m.patterson@freelance.com",
    location: "San Francisco, CA",
    successRate: "72%",
    grantsWon: 31,
    rating: 4.8,
    status: "verified",
    joined: "2025-08-20",
  },
  {
    id: "gw-003",
    name: "Dr. Fatima Al-Rashidi",
    email: "f.alrashidi@grantspec.com",
    location: "Washington, DC",
    successRate: "82%",
    grantsWon: 55,
    rating: 5.0,
    status: "verified",
    joined: "2025-05-01",
  },
  {
    id: "gw-004",
    name: "Sarah Chen, MPH",
    email: "s.chen@healthwrite.com",
    location: "Chicago, IL",
    successRate: "68%",
    grantsWon: 19,
    rating: 4.7,
    status: "verified",
    joined: "2025-10-12",
  },
  {
    id: "gw-005",
    name: "Dr. James Okonkwo",
    email: "j.okonkwo@acadgrant.com",
    location: "Atlanta, GA",
    successRate: "75%",
    grantsWon: 38,
    rating: 4.8,
    status: "pending",
    joined: "2026-03-01",
  },
  {
    id: "gw-006",
    name: "Emily Torres, PhD",
    email: "e.torres@resdev.com",
    location: "Austin, TX",
    successRate: "70%",
    grantsWon: 24,
    rating: 4.6,
    status: "suspended",
    joined: "2025-09-18",
  },
];

const STATUS_BADGE = {
  verified: "default",
  pending: "secondary",
  suspended: "destructive",
};

export function ManageGrantWriters() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const researcherColumns = [
    {
      header: "Name",
      accessorKey: "name",
      cellClassName: "text-sm",
      cell: (row) => (
        <div>
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cellClassName: "text-sm",
    },
    {
      header: "Success Rate",
      accessorKey: "successRate",
      cellClassName: "text-sm font-medium",
    },
    {
      header: "Grants Won",
      accessorKey: "grantsWon",
      cellClassName: "text-sm",
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (row) => (
        <span className="flex items-center gap-1 text-sm">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {row.rating}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge variant={STATUS_BADGE[row.status]} className="capitalize">
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Joined",
      accessorKey: "joined",
      cellClassName: "text-sm text-muted-foreground",
    },
  ];
  const filtered = WRITERS.filter((w) => {
    const matchesSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total",
      value: WRITERS.length,
      icon: PenTool,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Verified",
      value: WRITERS.filter((w) => w.status === "verified").length,
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Pending",
      value: WRITERS.filter((w) => w.status === "pending").length,
      icon: ShieldCheck,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Avg Rating",
      value: "4.8",
      icon: Star,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
  ];

  const researcherActions = (row) => {
    const actions = [
      {
        content: (
          <div className="flex items-center gap-2">
            <Eye className="size-4" />
            View Details
          </div>
        ),
        onClick: () => console.log("View researcher", row.id),
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
        onClick: () => console.log("Verify researcher", row.id),
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
        onClick: () => console.log("Suspend researcher", row.id),
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
        onClick: () => console.log("Reactivate researcher", row.id),
      });
    }

    return actions;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Manage Grant Writers
          </h1>
          <p className="text-muted-foreground">
            Verify credentials and manage grant writer accounts.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground ms-auto">
          <PenTool className="size-4" />
          {WRITERS.length} writers
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

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search grant writers..."
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

      <Card>
        <CardContent className="pt-4">
          <DataTable
            columns={researcherColumns}
            data={filtered}
            actions={researcherActions}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
            emptyMessage="No researchers found."
          />
        </CardContent>
      </Card>
    </div>
  );
}
