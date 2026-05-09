"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Search,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { ApplicationsList } from "./grant-application/ApplicationsList";

const APPLICATIONS = [
  {
    id: "app-001",
    grantTitle: "NIH R01 — Community Health Disparities",
    funder: "National Institutes of Health",
    amount: "$425,000",
    submittedDate: "Oct 3, 2025",
    status: "Awarded",
    awardDate: "Jan 8, 2026",
    startDate: "Jan 15, 2026",
  },
  {
    id: "app-002",
    grantTitle: "NSF CAREER — AI in Clinical Diagnostics",
    funder: "National Science Foundation",
    amount: "$550,000",
    submittedDate: "Jun 15, 2024",
    status: "Awarded",
    awardDate: "Nov 20, 2024",
    startDate: "Mar 1, 2025",
  },
  {
    id: "app-003",
    grantTitle: "WHO Research Grant — Global Vaccine Access",
    funder: "World Health Organization",
    amount: "$120,000",
    submittedDate: "Feb 28, 2026",
    status: "Pending Review",
    awardDate: null,
    startDate: null,
  },
  {
    id: "app-004",
    grantTitle: "PCORI — Patient-Centered Outcomes Research",
    funder: "PCORI",
    amount: "$500,000",
    submittedDate: "Mar 15, 2026",
    status: "In Review",
    awardDate: null,
    startDate: null,
  },
  {
    id: "app-005",
    grantTitle: "Gates Foundation — Digital Health in East Africa",
    funder: "Bill & Melinda Gates Foundation",
    amount: "$750,000",
    submittedDate: "Sep 1, 2025",
    status: "Rejected",
    awardDate: null,
    startDate: null,
    feedback:
      "Strong proposal but overlapping scope with existing funded projects in the region.",
  },
  {
    id: "app-006",
    grantTitle: "NIH R21 — Mental Health Interventions",
    funder: "National Institutes of Health",
    amount: "$275,000",
    submittedDate: null,
    status: "Draft",
    awardDate: null,
    startDate: null,
  },
];

const STATUS_CONFIG = {
  Awarded: {
    icon: CheckCircle2,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    badge: "default",
  },
  "Pending Review": {
    icon: Clock,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    badge: "secondary",
  },
  "In Review": {
    icon: Eye,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    badge: "secondary",
  },
  Rejected: {
    icon: XCircle,
    color: "text-destructive bg-destructive/10",
    badge: "destructive",
  },
  Draft: {
    icon: Clock,
    color: "text-muted-foreground bg-muted",
    badge: "outline",
  },
};

export function GrantApplications() {
  const [search, setSearch] = useState("");

  const filtered = APPLICATIONS.filter(
    (a) =>
      !search ||
      a.grantTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.funder.toLowerCase().includes(search.toLowerCase()),
  );

  const awarded = filtered.filter((a) => a.status === "Awarded");
  const pending = filtered.filter(
    (a) => a.status === "Pending Review" || a.status === "In Review",
  );
  const rejected = filtered.filter((a) => a.status === "Rejected");
  const drafts = filtered.filter((a) => a.status === "Draft");

  const statsData = {
    total: APPLICATIONS.length,
    awarded: APPLICATIONS.filter((a) => a.status === "Awarded").length,
    pending: APPLICATIONS.filter(
      (a) => a.status === "Pending Review" || a.status === "In Review",
    ).length,
    successRate: Math.round(
      (APPLICATIONS.filter((a) => a.status === "Awarded").length /
        APPLICATIONS.filter((a) => a.status !== "Draft").length) *
        100,
    ),
  };

  const stats = [
    {
      label: "Total Applications",
      value: statsData.total.toString(),
      icon: Award,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Awarded",
      value: statsData.awarded.toString(),
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Under Review",
      value: statsData.pending.toString(),
      icon: Clock,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Success Rate",
      value: `${statsData.successRate}%`,
      icon: DollarSign,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
  ];
  const tabs = [
    {
      value: "all",
      label: `All (${filtered.length})`,
      content: (
        <ApplicationsList items={filtered} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "awarded",
      label: `Awarded (${awarded.length})`,
      content: (
        <ApplicationsList items={awarded} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "pending",
      label: `Under Review (${pending.length})`,
      content: (
        <ApplicationsList items={pending} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "rejected",
      label: `Rejected (${rejected.length})`,
      content: (
        <ApplicationsList items={rejected} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "drafts",
      label: `Drafts (${drafts.length})`,
      content: (
        <ApplicationsList items={drafts} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
  ];
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          My Grant Applications
        </h2>
        <p className="text-sm text-muted-foreground">
          Track the status of all your grant submissions.
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>
      <TabsComponent tabs={tabs} defaultValue="all" />
    </div>
  );
}
