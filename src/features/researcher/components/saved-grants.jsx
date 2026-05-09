"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookmarkX,
  Calendar,
  DollarSign,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const INITIAL_SAVED = [
  {
    id: "grant-002",
    title: "Gates Foundation — Global Health Innovation",
    funder: "Bill & Melinda Gates Foundation",
    amount: "Up to $1,000,000",
    deadline: "May 1, 2026",
    daysLeft: 25,
    field: "Global Health",
    region: "Global",
    type: "Innovation Grant",
    savedDate: "Mar 20, 2026",
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
    type: "Research Grant",
    savedDate: "Mar 15, 2026",
  },
  {
    id: "grant-009",
    title: "Canadian Institutes of Health Research — Project Grant",
    funder: "CIHR",
    amount: "CAD $100,000 – $750,000",
    deadline: "Sep 15, 2026",
    daysLeft: 162,
    field: "Health Research",
    region: "Canada",
    type: "Project Grant",
    savedDate: "Mar 5, 2026",
  },
  {
    id: "grant-010",
    title: "ARC Discovery — Health & Medical Sciences",
    funder: "Australian Research Council",
    amount: "AUD $150,000 – $500,000",
    deadline: "Nov 1, 2026",
    daysLeft: 209,
    field: "Health & Medical",
    region: "Australia",
    type: "Discovery Grant",
    savedDate: "Feb 28, 2026",
  },
];

export function SavedGrants() {
  const [grants, setGrants] = useState(INITIAL_SAVED);
  const [search, setSearch] = useState("");

  const filtered = grants.filter((g) =>
    !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.funder.toLowerCase().includes(search.toLowerCase())
  );

  function removeGrant(id) {
    setGrants(grants.filter((g) => g.id !== id));
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Saved Grants</h2>
        <p className="text-sm text-muted-foreground">Bookmarked funding opportunities for quick access.</p>
      </div>

      {grants.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search saved grants..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
        </div>
      )}

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
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{grant.field}</Badge>
                      <Badge variant="outline" className="text-[10px]">{grant.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">Saved {grant.savedDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="outline" asChild><Link href={`/researcher/grants/${grant.id}`}>View</Link></Button>
                    <Button size="icon" variant="ghost" className="size-8 text-destructive hover:text-destructive" onClick={() => removeGrant(grant.id)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : grants.length === 0 ? (
        <div className="py-12 text-center">
          <BookmarkX className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm font-medium">No saved grants</p>
          <p className="mt-1 text-xs text-muted-foreground">Browse the grants directory and bookmark opportunities you're interested in.</p>
          <Button variant="outline" size="sm" className="mt-3" asChild><Link href="/researcher/grants/search">Find Grants</Link></Button>
        </div>
      ) : (
        <div className="py-12 text-center">
          <Search className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No saved grants match your search.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setSearch("")}>Clear Search</Button>
        </div>
      )}
    </div>
  );
}
