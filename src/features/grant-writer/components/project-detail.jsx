"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { MilestonesTab } from "./project-detail/MilestonesTab";
import { DeliverablesTab } from "./project-detail/DeliverablesTab";
import { ClientInfoTab } from "./project-detail/ClientInfoTab";

const PROJECT = {
  id: "proj-001",
  client: "Dr. Amira Rashid",
  clientInitials: "AR",
  institution: "University Medical Center",
  grantTitle: "NIH R21 — Mental Health Interventions",
  funder: "NIH",
  fundingAmount: "$275,000",
  type: "Full Proposal",
  service: "Full Proposal Writing",
  fee: "$5,000",
  paid: "$2,500",
  remaining: "$2,500",
  deadline: "Apr 15, 2026",
  daysLeft: 9,
  status: "In Progress",
  progress: 60,
  startDate: "Mar 1, 2026",
  description:
    "Complete proposal development for an NIH R21 exploratory grant focused on ML-based mental health screening tools for underserved communities.",
};

const MILESTONES = [
  {
    id: "m-1",
    title: "Initial consultation & strategy session",
    status: "completed",
    dueDate: "Mar 5, 2026",
    completedDate: "Mar 3, 2026",
  },
  {
    id: "m-2",
    title: "Specific Aims page — draft",
    status: "completed",
    dueDate: "Mar 12, 2026",
    completedDate: "Mar 10, 2026",
  },
  {
    id: "m-3",
    title: "Specific Aims — client review & revision",
    status: "completed",
    dueDate: "Mar 18, 2026",
    completedDate: "Mar 16, 2026",
  },
  {
    id: "m-4",
    title: "Significance & Innovation sections",
    status: "in-progress",
    dueDate: "Apr 1, 2026",
    completedDate: null,
  },
  {
    id: "m-5",
    title: "Approach section & methodology",
    status: "upcoming",
    dueDate: "Apr 5, 2026",
    completedDate: null,
  },
  {
    id: "m-6",
    title: "Budget & justification",
    status: "upcoming",
    dueDate: "Apr 8, 2026",
    completedDate: null,
  },
  {
    id: "m-7",
    title: "Full draft review with client",
    status: "upcoming",
    dueDate: "Apr 11, 2026",
    completedDate: null,
  },
  {
    id: "m-8",
    title: "Final revisions & submission prep",
    status: "upcoming",
    dueDate: "Apr 14, 2026",
    completedDate: null,
  },
];

const DELIVERABLES = [
  {
    name: "specific_aims_v2_final.docx",
    size: "128 KB",
    type: "Specific Aims",
    date: "Mar 16, 2026",
    status: "Approved",
  },
  {
    name: "significance_innovation_draft.docx",
    size: "245 KB",
    type: "Narrative",
    date: "Mar 30, 2026",
    status: "In Review",
  },
  {
    name: "budget_template_R21.xlsx",
    size: "56 KB",
    type: "Budget",
    date: "Mar 28, 2026",
    status: "Draft",
  },
  {
    name: "client_research_summary.pdf",
    size: "1.8 MB",
    type: "Reference",
    date: "Mar 2, 2026",
    status: "Reference",
  },
];

const stats = [
  {
    label: "Fee",
    value: PROJECT.fee,
    icon: DollarSign,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    label: "Paid",
    value: PROJECT.paid,
    icon: DollarSign,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    label: "Deadline",
    value: `${PROJECT.daysLeft}d left`,
    icon: Calendar,
    color: "text-destructive bg-destructive/10",
  },
  {
    label: "Progress",
    value: `${PROJECT.progress}%`,
    icon: Clock,
    color:
      "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
];

const tabs = [
  {
    value: "milestones",
    label: "Milestones",
    content: <MilestonesTab milestones={MILESTONES} />,
  },
  {
    value: "deliverables",
    label: `Deliverables (${DELIVERABLES.length})`,
    content: <DeliverablesTab deliverables={DELIVERABLES} />,
  },
  {
    value: "client",
    label: "Client Info",
    content: <ClientInfoTab project={PROJECT} />,
  },
];

export function ProjectDetail() {
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3 justify-between flex-wrap">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/grant-writer/projects">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>In Progress</Badge>
              <Badge variant="outline" className="text-[10px]">
                {PROJECT.type}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {PROJECT.funder}
              </Badge>
            </div>
            <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight leading-snug">
              {PROJECT.grantTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {PROJECT.description}
            </p>
          </div>
        </div>
        <Button className="ms-auto" variant="outline" size="sm">
          <MessageSquare className="size-4" />
          Message Client
        </Button>
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

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="text-muted-foreground">
              {MILESTONES.filter((m) => m.status === "completed").length} of{" "}
              {MILESTONES.length} milestones
            </span>
          </div>
          <Progress value={PROJECT.progress} className="h-2.5" />
        </CardContent>
      </Card>
      <TabsComponent tabs={tabs} defaultValue="milestones" />
    </div>
  );
}
