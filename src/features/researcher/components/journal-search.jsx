"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JOURNALS = [
  {
    id: "jrnl-001",
    name: "The Lancet Digital Health",
    publisher: "Elsevier",
    impactFactor: 36.6,
    hIndex: 89,
    field: "Digital Health",
    frequency: "Monthly",
    accessType: "Open Access",
    reviewTime: "6–8 weeks",
    acceptanceRate: "8%",
    scope: "Digital health innovations, AI in medicine, health informatics",
  },
  {
    id: "jrnl-002",
    name: "Nature Medicine",
    publisher: "Springer Nature",
    impactFactor: 82.9,
    hIndex: 456,
    field: "Biomedical",
    frequency: "Monthly",
    accessType: "Hybrid",
    reviewTime: "4–6 weeks",
    acceptanceRate: "5%",
    scope: "Translational and clinical research across all areas of medicine",
  },
  {
    id: "jrnl-003",
    name: "American Journal of Public Health",
    publisher: "APHA",
    impactFactor: 12.4,
    hIndex: 267,
    field: "Public Health",
    frequency: "Monthly",
    accessType: "Subscription",
    reviewTime: "8–12 weeks",
    acceptanceRate: "15%",
    scope: "Public health research, policy, and practice",
  },
  {
    id: "jrnl-004",
    name: "JAMA Network Open",
    publisher: "AMA",
    impactFactor: 13.8,
    hIndex: 142,
    field: "General Medicine",
    frequency: "Daily",
    accessType: "Open Access",
    reviewTime: "4–6 weeks",
    acceptanceRate: "12%",
    scope: "Clinical research, public health, health policy, global health",
  },
  {
    id: "jrnl-005",
    name: "Journal of Biomedical Informatics",
    publisher: "Elsevier",
    impactFactor: 8.0,
    hIndex: 148,
    field: "Health Informatics",
    frequency: "Monthly",
    accessType: "Hybrid",
    reviewTime: "8–10 weeks",
    acceptanceRate: "20%",
    scope: "Biomedical informatics, clinical decision support, EHR analytics",
  },
  {
    id: "jrnl-006",
    name: "BMC Public Health",
    publisher: "Springer Nature",
    impactFactor: 4.5,
    hIndex: 178,
    field: "Public Health",
    frequency: "Continuous",
    accessType: "Open Access",
    reviewTime: "6–10 weeks",
    acceptanceRate: "35%",
    scope: "Epidemiology, health services research, environmental health",
  },
  {
    id: "jrnl-007",
    name: "The Lancet Global Health",
    publisher: "Elsevier",
    impactFactor: 34.3,
    hIndex: 120,
    field: "Global Health",
    frequency: "Monthly",
    accessType: "Open Access",
    reviewTime: "4–8 weeks",
    acceptanceRate: "6%",
    scope: "Global health research from low- and middle-income countries",
  },
  {
    id: "jrnl-008",
    name: "PLOS Medicine",
    publisher: "PLOS",
    impactFactor: 15.8,
    hIndex: 265,
    field: "General Medicine",
    frequency: "Monthly",
    accessType: "Open Access",
    reviewTime: "6–8 weeks",
    acceptanceRate: "10%",
    scope: "Clinical, public health, and health policy research",
  },
];

function getIFColor(impactFactor) {
  if (impactFactor >= 30) return "text-emerald-600 dark:text-emerald-400";
  if (impactFactor >= 10) return "text-blue-600 dark:text-blue-400";
  return "text-muted-foreground";
}

export function JournalSearch() {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [sortBy, setSortBy] = useState("impact");

  let filtered = JOURNALS.filter((j) => {
    const matchesSearch = !search || j.name.toLowerCase().includes(search.toLowerCase()) || j.scope.toLowerCase().includes(search.toLowerCase());
    const matchesField = fieldFilter === "all" || j.field === fieldFilter;
    const matchesAccess = accessFilter === "all" || j.accessType === accessFilter;
    return matchesSearch && matchesField && matchesAccess;
  });

  if (sortBy === "impact") filtered.sort((a, b) => b.impactFactor - a.impactFactor);
  else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "acceptance") filtered.sort((a, b) => parseInt(b.acceptanceRate) - parseInt(a.acceptanceRate));

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Journal Directory</h2>
        <p className="text-sm text-muted-foreground">Browse journals by field, impact factor, and submission guidelines.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search journals by name or scope..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
        </div>
        <Select value={fieldFilter} onValueChange={setFieldFilter}>
          <SelectTrigger className="h-9 w-[160px]"><Filter className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="Biomedical">Biomedical</SelectItem>
            <SelectItem value="Digital Health">Digital Health</SelectItem>
            <SelectItem value="General Medicine">General Medicine</SelectItem>
            <SelectItem value="Global Health">Global Health</SelectItem>
            <SelectItem value="Health Informatics">Health Informatics</SelectItem>
            <SelectItem value="Public Health">Public Health</SelectItem>
          </SelectContent>
        </Select>
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="h-9 w-[150px]"><Globe className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Access</SelectItem>
            <SelectItem value="Open Access">Open Access</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Subscription">Subscription</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-9 w-[160px]"><TrendingUp className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="impact">Impact Factor ↓</SelectItem>
            <SelectItem value="name">Name A–Z</SelectItem>
            <SelectItem value="acceptance">Acceptance Rate ↓</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} journals found</p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-3">
          {filtered.map((journal) => (
            <Link key={journal.id} href={`/researcher/journals/${journal.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                      <BookOpen className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{journal.name}</p>
                        <Badge variant={journal.accessType === "Open Access" ? "default" : journal.accessType === "Hybrid" ? "secondary" : "outline"} className="text-[10px]">{journal.accessType}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{journal.publisher}</p>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{journal.scope}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="size-3" />
                          IF: <span className={`font-semibold ${getIFColor(journal.impactFactor)}`}>{journal.impactFactor}</span>
                        </span>
                        <span className="flex items-center gap-1"><TrendingUp className="size-3" />h-index: {journal.hIndex}</span>
                        <span className="flex items-center gap-1"><Clock className="size-3" />Review: {journal.reviewTime}</span>
                        <span className="flex items-center gap-1">Acceptance: {journal.acceptanceRate}</span>
                      </div>
                      <div className="mt-2 flex gap-1.5">
                        <Badge variant="outline" className="text-[10px]">{journal.field}</Badge>
                        <Badge variant="outline" className="text-[10px]">{journal.frequency}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <BookOpen className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No journals match your search.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setSearch(""); setFieldFilter("all"); setAccessFilter("all"); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
