"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Bookmark,
  BookmarkCheck,
  Calendar,
  DollarSign,
  Filter,
  Globe,
  MapPin,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GRANTS = [
  {
    id: "grant-001",
    title: "NIH R21 — Exploratory/Developmental Research",
    funder: "National Institutes of Health",
    amount: "Up to $275,000",
    deadline: "Apr 15, 2026",
    daysLeft: 9,
    field: "Biomedical",
    region: "United States",
    eligibility: "Faculty, Postdocs",
    type: "Research Grant",
    saved: false,
  },
  {
    id: "grant-002",
    title: "Gates Foundation — Global Health Innovation",
    funder: "Bill & Melinda Gates Foundation",
    amount: "Up to $1,000,000",
    deadline: "May 1, 2026",
    daysLeft: 25,
    field: "Global Health",
    region: "Global",
    eligibility: "All Researchers",
    type: "Innovation Grant",
    saved: true,
  },
  {
    id: "grant-003",
    title: "NSF CAREER — Faculty Early Career Development",
    funder: "National Science Foundation",
    amount: "Up to $600,000",
    deadline: "Jul 15, 2026",
    daysLeft: 100,
    field: "STEM",
    region: "United States",
    eligibility: "Junior Faculty",
    type: "Career Award",
    saved: false,
  },
  {
    id: "grant-004",
    title: "WHO Research Grants — Health Systems Strengthening",
    funder: "World Health Organization",
    amount: "$50,000 – $200,000",
    deadline: "Jun 30, 2026",
    daysLeft: 85,
    field: "Public Health",
    region: "Global",
    eligibility: "All Researchers",
    type: "Research Grant",
    saved: false,
  },
  {
    id: "grant-005",
    title: "Wellcome Trust — Discovery Research",
    funder: "Wellcome Trust",
    amount: "Up to £3,000,000",
    deadline: "Rolling",
    daysLeft: null,
    field: "Biomedical",
    region: "Global",
    eligibility: "All Researchers",
    type: "Research Grant",
    saved: true,
  },
  {
    id: "grant-006",
    title: "PCORI — Patient-Centered Outcomes Research",
    funder: "PCORI",
    amount: "Up to $500,000",
    deadline: "May 15, 2026",
    daysLeft: 39,
    field: "Clinical Research",
    region: "United States",
    eligibility: "Faculty, Clinicians",
    type: "Research Grant",
    saved: false,
  },
  {
    id: "grant-007",
    title: "European Research Council — Starting Grant",
    funder: "European Research Council",
    amount: "Up to €1,500,000",
    deadline: "Oct 22, 2026",
    daysLeft: 199,
    field: "All Fields",
    region: "Europe",
    eligibility: "2-7 years post-PhD",
    type: "Research Grant",
    saved: false,
  },
  {
    id: "grant-008",
    title: "Robert Wood Johnson Foundation — Health Equity",
    funder: "RWJF",
    amount: "Up to $350,000",
    deadline: "Aug 1, 2026",
    daysLeft: 117,
    field: "Health Equity",
    region: "United States",
    eligibility: "All Researchers",
    type: "Research Grant",
    saved: false,
  },
];

export function GrantSearch() {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [savedItems, setSavedItems] = useState(GRANTS.reduce((acc, g) => ({ ...acc, [g.id]: g.saved }), {}));

  const filtered = GRANTS.filter((g) => {
    const matchesSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.funder.toLowerCase().includes(search.toLowerCase());
    const matchesField = fieldFilter === "all" || g.field === fieldFilter;
    const matchesRegion = regionFilter === "all" || g.region === regionFilter;
    return matchesSearch && matchesField && matchesRegion;
  });

  function toggleSave(id) {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Find Grants</h2>
        <p className="text-sm text-muted-foreground">Search and discover funding opportunities from global sources.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search grants, funders..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
        </div>
        <Select value={fieldFilter} onValueChange={setFieldFilter}>
          <SelectTrigger className="h-9 w-[150px]"><Filter className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fields</SelectItem>
            <SelectItem value="Biomedical">Biomedical</SelectItem>
            <SelectItem value="Clinical Research">Clinical Research</SelectItem>
            <SelectItem value="Global Health">Global Health</SelectItem>
            <SelectItem value="Public Health">Public Health</SelectItem>
            <SelectItem value="Health Equity">Health Equity</SelectItem>
            <SelectItem value="STEM">STEM</SelectItem>
            <SelectItem value="All Fields">Multidisciplinary</SelectItem>
          </SelectContent>
        </Select>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="h-9 w-[160px]"><Globe className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
            <SelectItem value="Global">Global</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} grants found</p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-3">
          {filtered.map((grant) => (
            <Card key={grant.id} className="transition-colors hover:bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Award className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/researcher/grants/${grant.id}`} className="hover:underline">
                      <p className="text-sm font-semibold leading-snug">{grant.title}</p>
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">{grant.funder}</p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><DollarSign className="size-3" />{grant.amount}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {grant.deadline}
                        {grant.daysLeft !== null && (
                          <span className={grant.daysLeft <= 14 ? "text-destructive font-medium" : ""}>
                            ({grant.daysLeft}d left)
                          </span>
                        )}
                      </span>
                      <span className="flex items-center gap-1"><MapPin className="size-3" />{grant.region}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-[10px]">{grant.field}</Badge>
                      <Badge variant="outline" className="text-[10px]">{grant.type}</Badge>
                      <Badge variant="secondary" className="text-[10px]">{grant.eligibility}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={() => toggleSave(grant.id)}>
                    {savedItems[grant.id] ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Search className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No grants match your search criteria.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setSearch(""); setFieldFilter("all"); setRegionFilter("all"); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
