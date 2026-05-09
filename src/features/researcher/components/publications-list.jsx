"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  Filter,
  Plus,
  Quote,
  Search,
} from "lucide-react";
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
import { TabsComponent } from "@/components/shared/TabsComponent";
import { renderTabContent } from "./publications/renderTabContent";

const PUBLICATIONS = [
  {
    id: "pub-001",
    title:
      "Machine Learning Approaches to Early Disease Detection in Underserved Communities",
    journal: "The Lancet Digital Health",
    date: "Feb 2026",
    status: "Published",
    type: "Original Research",
    citations: 14,
    doi: "10.1016/j.landig.2026.01.004",
    coAuthors: ["Dr. J. Martinez", "Dr. S. Patel"],
  },
  {
    id: "pub-002",
    title:
      "Community-Based Participatory Research in Rural Healthcare Settings",
    journal: "American Journal of Public Health",
    date: "Mar 2026",
    status: "Under Review",
    type: "Original Research",
    citations: 0,
    doi: null,
    coAuthors: ["Dr. K. Okafor"],
  },
  {
    id: "pub-003",
    title: "AI-Driven Screening Tools for Low-Resource Clinical Environments",
    journal: "Nature Medicine",
    date: "Jan 2026",
    status: "Published",
    type: "Review Article",
    citations: 28,
    doi: "10.1038/s41591-026-0012-3",
    coAuthors: ["Dr. L. Nguyen", "Dr. R. Thompson", "Dr. M. Ali"],
  },
  {
    id: "pub-004",
    title: "Equity-Centered Frameworks for Digital Health Interventions",
    journal: "JAMA Network Open",
    date: "Dec 2025",
    status: "Published",
    type: "Commentary",
    citations: 9,
    doi: "10.1001/jamanetworkopen.2025.45678",
    coAuthors: ["Dr. S. Patel"],
  },
  {
    id: "pub-005",
    title: "Predictive Modeling of Chronic Disease Progression Using EHR Data",
    journal: "Journal of Biomedical Informatics",
    date: "Mar 2026",
    status: "Revision Requested",
    type: "Original Research",
    citations: 0,
    doi: null,
    coAuthors: ["Dr. H. Kim", "Dr. J. Martinez"],
  },
  {
    id: "pub-006",
    title:
      "Social Determinants of Health and Machine Learning: A Systematic Review",
    journal: "BMC Public Health",
    date: "Apr 2026",
    status: "Draft",
    type: "Systematic Review",
    citations: 0,
    doi: null,
    coAuthors: [],
  },
];

const STATUS_CONFIG = {
  Published: {
    variant: "default",
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  "Under Review": {
    variant: "secondary",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  "Revision Requested": {
    variant: "secondary",
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  Draft: { variant: "outline", color: "text-muted-foreground bg-muted" },
};

const STATS = [
  {
    label: "Total Publications",
    value: "12",
    icon: FileText,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    label: "Total Citations",
    value: "187",
    icon: Quote,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    label: "h-index",
    value: "18",
    icon: BookOpen,
    color:
      "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
  {
    label: "Under Review",
    value: "3",
    icon: Calendar,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
];

export function PublicationsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = PUBLICATIONS.filter((pub) => {
    const matchesSearch =
      !search ||
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.journal.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || pub.status === statusFilter;
    const matchesType = typeFilter === "all" || pub.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const published = filtered.filter((p) => p.status === "Published");
  const inProgress = filtered.filter((p) => p.status !== "Published");
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const publicationTabs = [
    {
      value: "all",
      label: `All (${filtered.length})`,
      content: renderTabContent({
        items: filtered,
        STATUS_CONFIG,
        onClearFilters: clearFilters,
      }),
    },
    {
      value: "published",
      label: `Published (${published.length})`,
      content: renderTabContent({
        items: published,
        STATUS_CONFIG,
        onClearFilters: clearFilters,
      }),
    },
    {
      value: "in-progress",
      label: `In Progress (${inProgress.length})`,
      content: renderTabContent({
        items: inProgress,
        STATUS_CONFIG,
        onClearFilters: clearFilters,
      }),
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            My Publications
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your papers, manuscripts, and submission status.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/researcher/publications/new">
            <Plus className="size-4" />
            New Manuscript
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-50 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search publications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-40">
            <Filter className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Revision Requested">
              Revision Requested
            </SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-9 w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Original Research">Original Research</SelectItem>
            <SelectItem value="Review Article">Review Article</SelectItem>
            <SelectItem value="Systematic Review">Systematic Review</SelectItem>
            <SelectItem value="Commentary">Commentary</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TabsComponent
        tabs={publicationTabs}
        defaultValue="all"
        namespace="publications"
      />
    </div>
  );
}
