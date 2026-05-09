"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, PenTool, Search, Star, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const WRITERS = [
  {
    id: "gw-001",
    name: "Dr. Lisa Nguyen",
    initials: "LN",
    location: "Boston, MA",
    country: "United States",
    successRate: 78,
    grantsWon: 42,
    rating: 4.9,
    reviews: 36,
    funders: ["NIH", "NSF", "Gates Foundation"],
    headline: "NIH & NSF proposals · 10+ years of biomedical funding wins",
    languages: ["English", "Vietnamese"],
    tags: ["Top rated", "Verified"],
  },
  {
    id: "gw-002",
    name: "Mark Patterson, PhD",
    initials: "MP",
    location: "San Francisco, CA",
    country: "United States",
    successRate: 72,
    grantsWon: 31,
    rating: 4.8,
    reviews: 28,
    funders: ["NSF", "DOE", "DARPA"],
    headline: "STEM and applied-research grants for early-career PIs",
    languages: ["English"],
    tags: ["Verified"],
  },
  {
    id: "gw-003",
    name: "Dr. Fatima Al-Rashidi",
    initials: "FR",
    location: "Washington, DC",
    country: "United States",
    successRate: 82,
    grantsWon: 55,
    rating: 5.0,
    reviews: 49,
    funders: ["WHO", "Gates Foundation", "USAID"],
    headline: "Global health funding — strong on multilateral partnerships",
    languages: ["English", "Arabic", "French"],
    tags: ["Top rated", "Verified"],
  },
  {
    id: "gw-004",
    name: "Sarah Chen, MPH",
    initials: "SC",
    location: "Chicago, IL",
    country: "United States",
    successRate: 68,
    grantsWon: 19,
    rating: 4.7,
    reviews: 22,
    funders: ["RWJF", "PCORI"],
    headline: "Health-equity and patient-centered outcomes specialist",
    languages: ["English", "Mandarin"],
    tags: ["Verified"],
  },
  {
    id: "gw-005",
    name: "Dr. James Okonkwo",
    initials: "JO",
    location: "Atlanta, GA",
    country: "United States",
    successRate: 75,
    grantsWon: 38,
    rating: 4.8,
    reviews: 31,
    funders: ["NIH", "CDC"],
    headline: "Clinical trial proposals and infectious-disease funding",
    languages: ["English"],
    tags: ["Verified"],
  },
  {
    id: "gw-006",
    name: "Emily Torres, PhD",
    initials: "ET",
    location: "Austin, TX",
    country: "United States",
    successRate: 70,
    grantsWon: 24,
    rating: 4.6,
    reviews: 18,
    funders: ["NSF", "NIH", "Sloan Foundation"],
    headline: "Research-development funding for academic departments",
    languages: ["English", "Spanish"],
    tags: ["Verified"],
  },
];

const FUNDERS = ["NIH", "NSF", "Gates Foundation", "WHO", "RWJF", "PCORI", "DOE", "USAID", "CDC", "Sloan Foundation", "DARPA"];

export function PublicGrantWriterDirectory() {
  const [search, setSearch] = useState("");
  const [funderFilter, setFunderFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const q = search.trim().toLowerCase();
  let filtered = WRITERS.filter((w) => {
    const matchesFunder =
      funderFilter === "all" || w.funders.includes(funderFilter);
    const matchesSearch =
      !q ||
      w.name.toLowerCase().includes(q) ||
      w.headline.toLowerCase().includes(q) ||
      w.location.toLowerCase().includes(q) ||
      w.funders.some((f) => f.toLowerCase().includes(q));
    return matchesFunder && matchesSearch;
  });

  if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "success") filtered = [...filtered].sort((a, b) => b.successRate - a.successRate);
  else if (sortBy === "wins") filtered = [...filtered].sort((a, b) => b.grantsWon - a.grantsWon);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search writers, funders, or specialties…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={funderFilter} onValueChange={setFunderFilter}>
          <SelectTrigger className="h-10 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All funders</SelectItem>
            {FUNDERS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-10 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest rated</SelectItem>
            <SelectItem value="success">Best success rate</SelectItem>
            <SelectItem value="wins">Most grants won</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{filtered.length}</span> grant writers
      </p>

      <div className="grid gap-3">
        {filtered.map((w) => (
          <Card key={w.id} className="transition-colors hover:bg-muted/30">
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar className="size-14 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {w.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.headline}</p>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/login?redirect=/researcher/find-grant-writers/${w.id}`}>
                        Sign in to contact
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{w.rating}</span>
                      <span>({w.reviews} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="size-3" />
                      {w.grantsWon} grants won
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      {w.successRate}% success rate
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {w.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {w.funders.map((f) => (
                      <Badge key={f} variant="secondary" className="text-[10px]">
                        {f}
                      </Badge>
                    ))}
                    {w.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <PenTool className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              No grant writers match your search.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setSearch("");
                setFunderFilter("all");
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
