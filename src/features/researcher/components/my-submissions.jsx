"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Plus,
  Search,
  Send,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { SubmissionsList } from "./submissions/SubmissionsList";

const SUBMISSIONS = [
  {
    id: "sub-001",
    title:
      "Machine Learning Approaches to Early Disease Detection in Underserved Communities",
    journal: "The Lancet Digital Health",
    submittedDate: "Oct 3, 2025",
    status: "Published",
    lastUpdate: "Feb 15, 2026",
    manuscriptId: "LANDIG-2025-0834",
    revisions: 1,
  },
  {
    id: "sub-002",
    title:
      "Community-Based Participatory Research in Rural Healthcare Settings",
    journal: "American Journal of Public Health",
    submittedDate: "Jan 20, 2026",
    status: "Under Review",
    lastUpdate: "Mar 5, 2026",
    manuscriptId: "AJPH-2026-0192",
    revisions: 0,
  },
  {
    id: "sub-003",
    title: "Predictive Modeling of Chronic Disease Progression Using EHR Data",
    journal: "Journal of Biomedical Informatics",
    submittedDate: "Dec 10, 2025",
    status: "Revision Requested",
    lastUpdate: "Mar 25, 2026",
    manuscriptId: "JBI-2025-1147",
    revisions: 0,
    feedback:
      "Reviewers request additional validation on the external dataset and clarification of the feature selection methodology.",
  },
  {
    id: "sub-004",
    title: "AI-Driven Screening Tools for Low-Resource Clinical Environments",
    journal: "Nature Medicine",
    submittedDate: "Sep 15, 2025",
    status: "Accepted",
    lastUpdate: "Jan 2, 2026",
    manuscriptId: "NATMED-2025-5621",
    revisions: 2,
  },
  {
    id: "sub-005",
    title: "Digital Health Equity Assessment Tool — Validation Study",
    journal: "JAMA Network Open",
    submittedDate: "Aug 1, 2025",
    status: "Rejected",
    lastUpdate: "Oct 15, 2025",
    manuscriptId: "JAMA-NO-2025-8734",
    revisions: 0,
    feedback:
      "The study lacks sufficient sample size for the conclusions drawn. Editors suggest resubmission with expanded dataset.",
  },
  {
    id: "sub-006",
    title:
      "Social Determinants of Health and Machine Learning: A Systematic Review",
    journal: "BMC Public Health",
    submittedDate: null,
    status: "Draft",
    lastUpdate: "Apr 1, 2026",
    manuscriptId: null,
    revisions: 0,
  },
];

const STATUS_CONFIG = {
  Published: {
    icon: CheckCircle2,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    badge: "default",
  },
  Accepted: {
    icon: CheckCircle2,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    badge: "default",
  },
  "Under Review": {
    icon: Eye,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    badge: "secondary",
  },
  "Revision Requested": {
    icon: Edit,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
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

export function MySubmissions() {
  const [search, setSearch] = useState("");

  const filtered = SUBMISSIONS.filter(
    (s) =>
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.journal.toLowerCase().includes(search.toLowerCase()),
  );

  const active = filtered.filter((s) =>
    ["Under Review", "Revision Requested"].includes(s.status),
  );
  const completed = filtered.filter((s) =>
    ["Published", "Accepted"].includes(s.status),
  );
  const rejected = filtered.filter((s) => s.status === "Rejected");
  const drafts = filtered.filter((s) => s.status === "Draft");
  const stats = [
    {
      label: "Total Submissions",
      value: SUBMISSIONS.length.toString(),
      icon: Send,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Under Review",
      value: SUBMISSIONS.filter(
        (s) => s.status === "Under Review",
      ).length.toString(),
      icon: Eye,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Accepted / Published",
      value: SUBMISSIONS.filter((s) =>
        ["Published", "Accepted"].includes(s.status),
      ).length.toString(),
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Needs Revision",
      value: SUBMISSIONS.filter(
        (s) => s.status === "Revision Requested",
      ).length.toString(),
      icon: Edit,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
  ];
  const tabs = [
    {
      value: "all",
      label: `All (${filtered.length})`,
      content: (
        <SubmissionsList items={filtered} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "active",
      label: `Active (${active.length})`,
      content: <SubmissionsList items={active} STATUS_CONFIG={STATUS_CONFIG} />,
    },
    {
      value: "completed",
      label: `Accepted (${completed.length})`,
      content: (
        <SubmissionsList items={completed} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "rejected",
      label: `Rejected (${rejected.length})`,
      content: (
        <SubmissionsList items={rejected} STATUS_CONFIG={STATUS_CONFIG} />
      ),
    },
    {
      value: "drafts",
      label: `Drafts (${drafts.length})`,
      content: <SubmissionsList items={drafts} STATUS_CONFIG={STATUS_CONFIG} />,
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            My Submissions
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your manuscript submissions across journals.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/researcher/submissions/new">
            <Plus className="size-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Stats */}
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
          placeholder="Search submissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>
      <TabsComponent tabs={tabs} defaultValue="all" />
    </div>
  );
}
