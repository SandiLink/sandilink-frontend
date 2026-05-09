"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  DollarSign,
  FlaskConical,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProjectsList } from "./projects-dashboard/ProjectsList";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PROJECTS = [
  {
    id: "proj-001",
    title:
      "AI-Powered Early Detection of Chronic Diseases in Underserved Communities",
    description:
      "Developing machine learning models using EHR data and community health surveys to enable early screening in low-resource settings.",
    status: "Active",
    funding: "$425,000",
    funder: "NIH R01",
    startDate: "Jan 2026",
    endDate: "Dec 2028",
    progress: 35,
    collaborators: [
      { name: "Dr. J. Martinez", initials: "JM" },
      { name: "Dr. S. Patel", initials: "SP" },
    ],
    publications: 2,
    milestones: { total: 8, completed: 3 },
  },
  {
    id: "proj-002",
    title:
      "Computer Vision for Clinical Diagnostics in Resource-Limited Settings",
    description:
      "Building a portable, AI-driven imaging tool that assists clinicians in regions with limited access to specialist diagnostic services.",
    status: "Active",
    funding: "$550,000",
    funder: "NSF CAREER",
    startDate: "Mar 2025",
    endDate: "Feb 2030",
    progress: 20,
    collaborators: [
      { name: "Dr. L. Nguyen", initials: "LN" },
      { name: "Dr. R. Thompson", initials: "RT" },
      { name: "Dr. M. Ali", initials: "MA" },
    ],
    publications: 1,
    milestones: { total: 12, completed: 2 },
  },
  {
    id: "proj-003",
    title: "Social Determinants of Health — Predictive Analytics Framework",
    description:
      "Creating a data framework that integrates social determinants with clinical outcomes to improve public health policy recommendations.",
    status: "Active",
    funding: "$85,000",
    funder: "Internal Grant",
    startDate: "Sep 2025",
    endDate: "Aug 2026",
    progress: 65,
    collaborators: [{ name: "Dr. H. Kim", initials: "HK" }],
    publications: 1,
    milestones: { total: 5, completed: 3 },
  },
  {
    id: "proj-004",
    title: "Vaccine Distribution Optimization in Sub-Saharan Africa",
    description:
      "Modeling optimal distribution networks for vaccine access in low-income regions using geospatial and supply chain data.",
    status: "Completed",
    funding: "$200,000",
    funder: "Gates Foundation",
    startDate: "Jan 2024",
    endDate: "Dec 2025",
    progress: 100,
    collaborators: [
      { name: "Dr. K. Okafor", initials: "KO" },
      { name: "Dr. S. Patel", initials: "SP" },
    ],
    publications: 3,
    milestones: { total: 6, completed: 6 },
  },
  {
    id: "proj-005",
    title: "Digital Health Equity Assessment Tool",
    description:
      "Designing a standardized assessment tool to measure digital health equity across healthcare systems.",
    status: "Draft",
    funding: "—",
    funder: "Unfunded",
    startDate: "—",
    endDate: "—",
    progress: 0,
    collaborators: [],
    publications: 0,
    milestones: { total: 0, completed: 0 },
  },
];

const STATUS_CONFIG = {
  Active: {
    variant: "default",
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  Completed: {
    variant: "secondary",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  Draft: { variant: "outline", color: "text-muted-foreground bg-muted" },
};

export function ResearchProjectsDashboard() {
  const [search, setSearch] = useState("");

  const filtered = PROJECTS.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.funder.toLowerCase().includes(search.toLowerCase()),
  );

  const active = filtered.filter((p) => p.status === "Active");
  const completed = filtered.filter((p) => p.status === "Completed");
  const drafts = filtered.filter((p) => p.status === "Draft");

  const tabs = [
    {
      value: "active",
      label: `Active (${active.length})`,
      content: (
        <ProjectsList
          items={active}
          type="active"
          STATUS_CONFIG={STATUS_CONFIG}
        />
      ),
    },
    {
      value: "completed",
      label: `Completed (${completed.length})`,
      content: (
        <ProjectsList
          items={completed}
          type="completed"
          STATUS_CONFIG={STATUS_CONFIG}
        />
      ),
    },
    {
      value: "drafts",
      label: `Drafts (${drafts.length})`,
      content: (
        <ProjectsList
          items={drafts}
          type="drafts"
          STATUS_CONFIG={STATUS_CONFIG}
        />
      ),
    },
  ];

  const stats = [
    {
      label: "Active Projects",
      value: PROJECTS.filter((p) => p.status === "Active").length.toString(),
      icon: FlaskConical,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Total Funding",
      value: "$1.26M",
      icon: DollarSign,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Collaborators",
      value: "7",
      icon: Users,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Publications",
      value: "7",
      icon: Award,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Research Projects
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your active, completed, and planned research projects.
          </p>
        </div>
        <div className="ms-auto">
          <Button size="sm" asChild>
            <Link href="/researcher/projects/new">
              <Plus className="size-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>
      <TabsComponent tabs={tabs} defaultValue="active" />
    </div>
  );
}
