"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Filter,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { ActiveProjectsTab } from "./active-project-list/ActiveProjectsTab";
import { CompletedProjectsTab } from "./active-project-list/CompletedProjectsTab";

const PROJECTS = [
  {
    id: "proj-001",
    client: "Dr. Amira Rashid",
    initials: "AR",
    institution: "University Medical Center",
    grantTitle: "NIH R21 — Mental Health Interventions",
    funder: "NIH",
    type: "Full Proposal",
    deadline: "Apr 15, 2026",
    daysLeft: 9,
    status: "In Progress",
    progress: 60,
    amount: "$5,000",
    startDate: "Mar 1, 2026",
  },
  {
    id: "proj-002",
    client: "Dr. Robert Chen",
    initials: "RC",
    institution: "Stanford School of Medicine",
    grantTitle: "NSF CAREER — Biomedical Imaging",
    funder: "NSF",
    type: "Resubmission",
    deadline: "May 1, 2026",
    daysLeft: 25,
    status: "In Progress",
    progress: 35,
    amount: "$4,200",
    startDate: "Mar 10, 2026",
  },
  {
    id: "proj-003",
    client: "Dr. Karen Lee",
    initials: "KL",
    institution: "Johns Hopkins University",
    grantTitle: "PCORI — Patient-Centered Outcomes",
    funder: "PCORI",
    type: "Proposal Review",
    deadline: "Apr 20, 2026",
    daysLeft: 14,
    status: "Review",
    progress: 80,
    amount: "$1,500",
    startDate: "Mar 25, 2026",
  },
  {
    id: "proj-004",
    client: "Dr. Sarah Mitchell",
    initials: "SM",
    institution: "Emory University",
    grantTitle: "RWJF — Health Equity Community Programs",
    funder: "RWJF",
    type: "Full Proposal",
    deadline: "May 15, 2026",
    daysLeft: 39,
    status: "In Progress",
    progress: 15,
    amount: "$5,500",
    startDate: "Apr 1, 2026",
  },
  {
    id: "proj-005",
    client: "Dr. R. Thompson",
    initials: "RT",
    institution: "Duke University",
    grantTitle: "NIH R01 — Cardiovascular Disease Prevention",
    funder: "NIH",
    type: "Full Proposal",
    deadline: "Dec 15, 2025",
    daysLeft: 0,
    status: "Completed",
    progress: 100,
    amount: "$6,200",
    startDate: "Sep 1, 2025",
    outcome: "Funded — $2.1M",
  },
  {
    id: "proj-006",
    client: "Dr. J. Kim",
    initials: "JK",
    institution: "University of Washington",
    grantTitle: "NSF — Health Informatics Infrastructure",
    funder: "NSF",
    type: "Full Proposal",
    deadline: "Nov 1, 2025",
    daysLeft: 0,
    status: "Completed",
    progress: 100,
    amount: "$4,800",
    startDate: "Jul 15, 2025",
    outcome: "Funded — $890K",
  },
];

const STATUS_CONFIG = {
  "In Progress": {
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    badge: "default",
  },
  Review: {
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    badge: "secondary",
  },
  Completed: {
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    badge: "secondary",
  },
};

export function ActiveProjectsList() {
  const [search, setSearch] = useState("");
  const [funderFilter, setFunderFilter] = useState("all");

  const filtered = PROJECTS.filter((p) => {
    const matchesSearch =
      !search ||
      p.grantTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchesFunder = funderFilter === "all" || p.funder === funderFilter;
    return matchesSearch && matchesFunder;
  });

  const active = filtered.filter((p) => p.status !== "Completed");
  const completed = filtered.filter((p) => p.status === "Completed");
  const stats = [
    {
      label: "Active",
      value: PROJECTS.filter((p) => p.status !== "Completed").length.toString(),
      icon: Briefcase,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "In Review",
      value: PROJECTS.filter((p) => p.status === "Review").length.toString(),
      icon: Clock,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Completed",
      value: PROJECTS.filter((p) => p.status === "Completed").length.toString(),
      icon: Briefcase,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Revenue (Active)",
      value: "$16,200",
      icon: DollarSign,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
  ];

  const tabs = [
    {
      value: "active",
      label: `Active (${active.length})`,
      content: <ActiveProjectsTab projects={active} />,
    },
    {
      value: "completed",
      label: `Completed (${completed.length})`,
      content: <CompletedProjectsTab projects={completed} />,
    },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your active and completed grant writing projects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select value={funderFilter} onValueChange={setFunderFilter}>
          <SelectTrigger className="h-9 w-[140px]">
            <Filter className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Funders</SelectItem>
            <SelectItem value="NIH">NIH</SelectItem>
            <SelectItem value="NSF">NSF</SelectItem>
            <SelectItem value="PCORI">PCORI</SelectItem>
            <SelectItem value="RWJF">RWJF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TabsComponent tabs={tabs} defaultValue="active" />
    </div>
  );
}
