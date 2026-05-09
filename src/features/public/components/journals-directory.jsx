"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Globe, Search, TrendingUp, Unlock } from "lucide-react";
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

const JOURNALS = [
  { id: "j-001", name: "The Lancet Digital Health", publisher: "Elsevier", impactFactor: 36.6, field: "Digital Health", access: "Open Access", scopeNote: "Digital interventions, health AI, telemedicine evidence." },
  { id: "j-002", name: "Nature Medicine", publisher: "Springer Nature", impactFactor: 82.9, field: "Biomedical", access: "Hybrid", scopeNote: "Translational and clinical research with broad biomedical relevance." },
  { id: "j-003", name: "AJPH (American Journal of Public Health)", publisher: "APHA", impactFactor: 12.4, field: "Public Health", access: "Subscription", scopeNote: "Public health policy, epidemiology, and population health." },
  { id: "j-004", name: "JAMA Network Open", publisher: "AMA", impactFactor: 13.8, field: "General Medicine", access: "Open Access", scopeNote: "Open-access general medical research across specialties." },
  { id: "j-005", name: "Journal of Biomedical Informatics", publisher: "Elsevier", impactFactor: 8.0, field: "Health Informatics", access: "Hybrid", scopeNote: "Computational methods, EHR analytics, biomedical NLP." },
  { id: "j-006", name: "BMC Public Health", publisher: "Springer Nature", impactFactor: 4.5, field: "Public Health", access: "Open Access", scopeNote: "Open-access public-health research, global scope." },
  { id: "j-007", name: "Health Affairs", publisher: "Project HOPE", impactFactor: 8.6, field: "Health Policy", access: "Hybrid", scopeNote: "Health policy, economics, and reform." },
  { id: "j-008", name: "BMJ Open", publisher: "BMJ Publishing", impactFactor: 3.0, field: "General Medicine", access: "Open Access", scopeNote: "Open-access general medical research." },
];

const FIELDS = ["Digital Health", "Biomedical", "Public Health", "General Medicine", "Health Informatics", "Health Policy"];
const ACCESS_TYPES = ["Open Access", "Hybrid", "Subscription"];

const ACCESS_BADGE = {
  "Open Access": "default",
  "Hybrid": "secondary",
  "Subscription": "outline",
};

export function PublicJournalsDirectory() {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const [sortBy, setSortBy] = useState("impact");

  const q = search.trim().toLowerCase();
  let filtered = JOURNALS.filter((j) => {
    const matchesField = fieldFilter === "all" || j.field === fieldFilter;
    const matchesAccess = accessFilter === "all" || j.access === accessFilter;
    const matchesSearch =
      !q ||
      j.name.toLowerCase().includes(q) ||
      j.publisher.toLowerCase().includes(q) ||
      j.field.toLowerCase().includes(q) ||
      (j.scopeNote ?? "").toLowerCase().includes(q);
    return matchesField && matchesAccess && matchesSearch;
  });

  if (sortBy === "impact") filtered = [...filtered].sort((a, b) => b.impactFactor - a.impactFactor);
  else if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "publisher") filtered = [...filtered].sort((a, b) => a.publisher.localeCompare(b.publisher));

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search journal name, publisher, or field…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={fieldFilter} onValueChange={setFieldFilter}>
          <SelectTrigger className="h-10 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All fields</SelectItem>
            {FIELDS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={accessFilter} onValueChange={setAccessFilter}>
          <SelectTrigger className="h-10 w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any access</SelectItem>
            {ACCESS_TYPES.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-10 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="impact">Highest impact</SelectItem>
            <SelectItem value="name">Journal A→Z</SelectItem>
            <SelectItem value="publisher">Publisher A→Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{filtered.length}</span> journals
      </p>

      <div className="grid gap-3">
        {filtered.map((j) => (
          <Card key={j.id} className="transition-colors hover:bg-muted/30">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold leading-snug">{j.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{j.publisher}</p>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/login?redirect=/researcher/journals/${j.id}`}>
                        Sign in to submit
                      </Link>
                    </Button>
                  </div>
                  {j.scopeNote && (
                    <p className="mt-2 text-xs text-muted-foreground">{j.scopeNote}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      Impact factor <span className="font-medium text-foreground">{j.impactFactor}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="size-3" />
                      {j.field}
                    </span>
                    <span className="flex items-center gap-1">
                      <Unlock className="size-3" />
                      {j.access}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Badge variant={ACCESS_BADGE[j.access]} className="text-[10px]">
                      {j.access}
                    </Badge>
                    <Badge variant="outline" className="ml-1.5 text-[10px]">
                      {j.field}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No journals match your search.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setSearch("");
                setFieldFilter("all");
                setAccessFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
