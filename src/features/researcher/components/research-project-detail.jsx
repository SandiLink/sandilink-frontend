"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  Download,
  FileText,
  FlaskConical,
  MessageSquare,
  Plus,
  Upload,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PROJECT = {
  id: "proj-001",
  title:
    "AI-Powered Early Detection of Chronic Diseases in Underserved Communities",
  description:
    "Developing machine learning models using EHR data and community health surveys to enable early screening in low-resource settings. This project aims to create deployable tools for community health centers to identify at-risk populations earlier and more accurately.",
  status: "Active",
  funding: "$425,000",
  spent: "$148,750",
  remaining: "$276,250",
  funder: "NIH R01",
  grantId: "R01-AI-2026-0142",
  startDate: "Jan 15, 2026",
  endDate: "Dec 31, 2028",
  progress: 35,
  piName: "Dr. Amira Rashid",
};

const MILESTONES = [
  {
    id: "m-1",
    title: "Literature review and data source identification",
    status: "completed",
    dueDate: "Feb 28, 2026",
    completedDate: "Feb 15, 2026",
  },
  {
    id: "m-2",
    title: "IRB approval and data use agreements",
    status: "completed",
    dueDate: "Mar 15, 2026",
    completedDate: "Mar 10, 2026",
  },
  {
    id: "m-3",
    title: "Data collection from 12 community health centers",
    status: "completed",
    dueDate: "Apr 30, 2026",
    completedDate: "Apr 2, 2026",
  },
  {
    id: "m-4",
    title: "Feature engineering and initial model development",
    status: "in-progress",
    dueDate: "Jun 30, 2026",
    completedDate: null,
  },
  {
    id: "m-5",
    title: "Model validation and bias testing",
    status: "upcoming",
    dueDate: "Sep 30, 2026",
    completedDate: null,
  },
  {
    id: "m-6",
    title: "Pilot deployment at 3 community health centers",
    status: "upcoming",
    dueDate: "Mar 31, 2027",
    completedDate: null,
  },
  {
    id: "m-7",
    title: "Outcome evaluation and manuscript preparation",
    status: "upcoming",
    dueDate: "Sep 30, 2027",
    completedDate: null,
  },
  {
    id: "m-8",
    title: "Final report and dissemination",
    status: "upcoming",
    dueDate: "Dec 31, 2028",
    completedDate: null,
  },
];

const COLLABORATORS = [
  {
    name: "Dr. Amira Rashid",
    initials: "AR",
    role: "Principal Investigator",
    institution: "University Medical Center",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  },
  {
    name: "Dr. Juan Martinez",
    initials: "JM",
    role: "Co-Investigator",
    institution: "Stanford School of Medicine",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Dr. Sana Patel",
    initials: "SP",
    role: "Co-Investigator",
    institution: "Harvard T.H. Chan School of Public Health",
    color: "bg-primary/10 text-primary",
  },
];

const PUBLICATIONS = [
  {
    id: "pub-001",
    title:
      "Machine Learning Approaches to Early Disease Detection in Underserved Communities",
    journal: "The Lancet Digital Health",
    status: "Published",
  },
  {
    id: "pub-005",
    title: "Predictive Modeling of Chronic Disease Progression Using EHR Data",
    journal: "Journal of Biomedical Informatics",
    status: "Revision Requested",
  },
];

const DOCUMENTS = [
  {
    name: "grant_proposal_final.pdf",
    size: "3.1 MB",
    type: "Proposal",
    date: "Oct 2025",
  },
  {
    name: "irb_approval_letter.pdf",
    size: "245 KB",
    type: "IRB",
    date: "Mar 2026",
  },
  {
    name: "data_use_agreement_signed.pdf",
    size: "1.2 MB",
    type: "Agreement",
    date: "Mar 2026",
  },
  {
    name: "annual_progress_report_2026.docx",
    size: "890 KB",
    type: "Report",
    date: "Apr 2026",
  },
  {
    name: "budget_justification.xlsx",
    size: "156 KB",
    type: "Budget",
    date: "Oct 2025",
  },
];

export function ResearchProjectDetail() {
  const tabs = [
    {
      value: "milestones",
      label: "Milestones",
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>
                Track deliverables and key dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {MILESTONES.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-start gap-3 rounded-lg border p-3.5"
                  >
                    {m.status === "completed" ? (
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    ) : m.status === "in-progress" ? (
                      <Clock className="mt-0.5 size-5 shrink-0 text-blue-500 animate-pulse" />
                    ) : (
                      <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground/40" />
                    )}

                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          m.status === "completed"
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {m.title}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          Due: {m.dueDate}
                        </span>

                        {m.completedDate && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="size-3" />
                            Completed: {m.completedDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <Badge
                      variant={
                        m.status === "completed"
                          ? "secondary"
                          : m.status === "in-progress"
                            ? "default"
                            : "outline"
                      }
                      className="text-[10px] shrink-0"
                    >
                      {m.status === "in-progress"
                        ? "In Progress"
                        : m.status === "completed"
                          ? "Done"
                          : "Upcoming"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "team",
      label: `Team (${COLLABORATORS.length})`,
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Research Team</CardTitle>
              <CardDescription>
                Principal investigator and co-investigators
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  <Plus className="size-4" />
                  Add Member
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3">
                {COLLABORATORS.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 rounded-lg border p-3.5"
                  >
                    <Avatar>
                      <AvatarFallback className={`${c.color} text-xs`}>
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.institution}
                      </p>
                    </div>

                    <Badge variant="outline" className="text-[10px]">
                      {c.role}
                    </Badge>

                    <Button variant="ghost" size="icon" className="size-8">
                      <MessageSquare className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "publications",
      label: `Publications (${PUBLICATIONS.length})`,
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Related Publications</CardTitle>
              <CardDescription>
                Papers produced from this research project
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3">
                {PUBLICATIONS.map((pub) => (
                  <Link
                    key={pub.id}
                    href={`/researcher/publications/${pub.id}`}
                  >
                    <div className="flex items-start gap-3 rounded-lg border p-3.5 transition-colors hover:bg-muted/50">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                        <FileText className="size-4" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium leading-snug">
                          {pub.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {pub.journal}
                        </p>
                      </div>

                      <Badge
                        variant={
                          pub.status === "Published" ? "default" : "secondary"
                        }
                        className="text-[10px] shrink-0"
                      >
                        {pub.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "documents",
      label: `Documents (${DOCUMENTS.length})`,
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <CardDescription>
                Proposals, agreements, reports, and budgets
              </CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  <Upload className="size-4" />
                  Upload
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <div className="grid gap-2">
                {DOCUMENTS.map((doc) => (
                  <div
                    key={doc.name}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                        <FileText className="size-3.5 text-muted-foreground" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} · {doc.type} · {doc.date}
                        </p>
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="size-8">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];
  const stats = [
    {
      label: "Total Funding",
      value: PROJECT.funding,
      icon: DollarSign,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Spent",
      value: PROJECT.spent,
      icon: DollarSign,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Timeline",
      value: `${PROJECT.startDate.split(" ")[0]} '26 — Dec '28`,
      icon: Calendar,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Progress",
      value: `${PROJECT.progress}%`,
      icon: FlaskConical,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/researcher/projects">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>Active</Badge>
            <Badge variant="outline" className="text-[10px]">
              {PROJECT.funder}
            </Badge>
            <Badge variant="secondary" className="text-[10px] font-mono">
              {PROJECT.grantId}
            </Badge>
          </div>
          <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight leading-snug">
            {PROJECT.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {PROJECT.description}
          </p>
        </div>
      </div>

      {/* Stats Row */}
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

      {/* Overall Progress */}
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
      <TabsComponent
        tabs={tabs}
        defaultValue="milestones"
        namespace="project"
      />
    </div>
  );
}
