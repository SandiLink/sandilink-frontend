"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  DollarSign,
  Filter,
  Globe,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { LocalizedText } from "@/components/shared/localized-text";
import { localizedHaystack } from "@/lib/localized-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GRANTS = [
  { id: "g-001", title: "NIH R21 — Exploratory/Developmental Research", funder: "NIH", amount: "Up to $275,000", deadline: "Apr 15, 2026", daysLeft: 9, field: "Biomedical", region: "US", clients: 1 },
  { id: "g-002", title: { en: "Gates Foundation — Global Health Innovation", es: "Fundación Gates — Innovación en Salud Global", fr: "Fondation Gates — Innovation en santé mondiale" }, funder: "Gates Foundation", amount: "Up to $1,000,000", deadline: "May 1, 2026", daysLeft: 25, field: "Global Health", region: "Global", clients: 0 },
  { id: "g-003", title: "NSF CAREER — Faculty Early Career Development", funder: "NSF", amount: "Up to $600,000", deadline: "Jul 15, 2026", daysLeft: 100, field: "STEM", region: "US", clients: 1 },
  { id: "g-004", title: { en: "WHO — Health Systems Strengthening", es: "OMS — Fortalecimiento de los Sistemas de Salud", fr: "OMS — Renforcement des systèmes de santé" }, funder: "WHO", amount: "$50K – $200K", deadline: "Jun 30, 2026", daysLeft: 85, field: "Public Health", region: "Global", clients: 0 },
  { id: "g-005", title: "PCORI — Patient-Centered Outcomes", funder: "PCORI", amount: "Up to $500,000", deadline: "May 15, 2026", daysLeft: 39, field: "Clinical", region: "US", clients: 1 },
  { id: "g-006", title: "RWJF — Health Equity", funder: "RWJF", amount: "Up to $350,000", deadline: "Aug 1, 2026", daysLeft: 117, field: "Health Equity", region: "US", clients: 1 },
  { id: "g-007", title: "ERC Starting Grant", funder: "ERC", amount: "Up to €1,500,000", deadline: "Oct 22, 2026", daysLeft: 199, field: "All Fields", region: "Europe", clients: 0 },
  { id: "g-008", title: "DOD — PTSD Treatment Innovation", funder: "DOD", amount: "Up to $1,800,000", deadline: "Sep 1, 2026", daysLeft: 148, field: "Mental Health", region: "US", clients: 0 },
];

export function GrantDirectory() {
  const [search, setSearch] = useState("");
  const [funderFilter, setFunderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("deadline");

  const q = search.toLowerCase();
  let filtered = GRANTS.filter((g) => {
    const matchesSearch =
      !search ||
      localizedHaystack(g.title).includes(q) ||
      g.funder.toLowerCase().includes(q);
    const matchesFunder = funderFilter === "all" || g.funder === funderFilter;
    return matchesSearch && matchesFunder;
  });

  const titleHaystack = (g) => localizedHaystack(g.title);
  if (sortBy === "deadline") filtered.sort((a, b) => a.daysLeft - b.daysLeft);
  else if (sortBy === "amount") filtered.sort((a, b) => titleHaystack(b).localeCompare(titleHaystack(a)));
  else if (sortBy === "clients") filtered.sort((a, b) => b.clients - a.clients);

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Grant Directory</h2>
        <p className="text-sm text-muted-foreground">Browse upcoming grants to identify opportunities for your clients.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search grants or funders..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
        </div>
        <Select value={funderFilter} onValueChange={setFunderFilter}>
          <SelectTrigger className="h-9 w-[140px]"><Filter className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Funders</SelectItem>
            <SelectItem value="NIH">NIH</SelectItem>
            <SelectItem value="NSF">NSF</SelectItem>
            <SelectItem value="Gates Foundation">Gates Foundation</SelectItem>
            <SelectItem value="PCORI">PCORI</SelectItem>
            <SelectItem value="RWJF">RWJF</SelectItem>
            <SelectItem value="WHO">WHO</SelectItem>
            <SelectItem value="ERC">ERC</SelectItem>
            <SelectItem value="DOD">DOD</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-9 w-[160px]"><TrendingUp className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">Soonest Deadline</SelectItem>
            <SelectItem value="clients">My Clients First</SelectItem>
            <SelectItem value="amount">Funding Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} grants found</p>

      {filtered.length > 0 ? (
        <div className="grid gap-3">
          {filtered.map((g) => (
            <Link key={g.id} href={`/grant-writer/grants/${g.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <Award className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold leading-snug"><LocalizedText value={g.title} /></p>
                        {g.clients > 0 && <Badge className="text-[10px] gap-1"><Users className="size-2.5" />{g.clients} client{g.clients > 1 ? "s" : ""}</Badge>}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{g.funder}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{g.amount}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />{g.deadline}
                          <span className={g.daysLeft <= 14 ? "text-destructive font-medium" : ""}>({g.daysLeft}d)</span>
                        </span>
                        <span className="flex items-center gap-1"><MapPin className="size-3" />{g.region}</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-[10px]">{g.field}</Badge>
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
          <Search className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No grants match your search.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setSearch(""); setFunderFilter("all"); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
