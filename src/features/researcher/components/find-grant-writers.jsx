"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  DollarSign,
  Filter,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { TrustBadges, VerifiedName } from "@/components/shared/trust-badges";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GRANT_WRITERS = [
  {
    id: "gw-001",
    name: "Dr. Lisa Nguyen",
    initials: "LN",
    title: "Senior Grant Writer & Research Consultant",
    expertise: ["NIH", "NSF", "Health Disparities", "Clinical Research"],
    successRate: 78, grantsWon: 42, totalFunded: "$18.5M",
    rating: 4.9, reviews: 36, location: "Boston, MA", country: "United States",
    responseTime: "< 1 hour", languages: ["English", "Vietnamese"], verified: true,
    rate: "$150–250/hr", availability: "Available", matchScore: 96,
    bio: "15+ years of experience in biomedical and public health grant writing with a focus on NIH R01, R21, and K-series awards.",
  },
  {
    id: "gw-002",
    name: "Mark Patterson, PhD",
    initials: "MP",
    title: "Freelance Grant Writer — STEM & Health Sciences",
    expertise: ["NSF CAREER", "DOD", "Translational Medicine", "AI/ML"],
    successRate: 72, grantsWon: 31, totalFunded: "$12.8M",
    rating: 4.8, reviews: 28, location: "San Francisco, CA", country: "United States",
    responseTime: "< 2 hours", languages: ["English"], verified: true,
    rate: "$125–200/hr", availability: "Available", matchScore: 91,
    bio: "Specialized in technology-driven research proposals, particularly AI/ML applications in healthcare.",
  },
  {
    id: "gw-003",
    name: "Dr. Fatima Al-Rashidi",
    initials: "FA",
    title: "Grant Writing Specialist — Global Health",
    expertise: ["WHO", "Gates Foundation", "Global Health", "Epidemiology"],
    successRate: 82, grantsWon: 55, totalFunded: "$24.2M",
    rating: 5.0, reviews: 47, location: "Washington, DC", country: "United States",
    responseTime: "< 4 hours", languages: ["English", "Arabic", "French"], verified: true,
    rate: "$175–300/hr", availability: "Limited", matchScore: 88,
    bio: "Former WHO consultant with deep expertise in global health funding from international organizations.",
  },
  {
    id: "gw-004",
    name: "Sarah Chen, MPH",
    initials: "SC",
    title: "Grant Writer — Community Health & Equity",
    expertise: ["PCORI", "RWJF", "Community Health", "Health Equity"],
    successRate: 68,
    grantsWon: 19,
    totalFunded: "$6.4M",
    rating: 4.7,
    reviews: 15,
    location: "Chicago, IL",
    rate: "$100–175/hr",
    availability: "Available",
    matchScore: 85,
    bio: "Passionate about health equity research with expertise in community-based participatory research grants.",
  },
  {
    id: "gw-005",
    name: "Dr. James Okonkwo",
    initials: "JO",
    title: "Academic Grant Consultant",
    expertise: ["NIH", "ERC", "Biomedical", "Clinical Trials"],
    successRate: 75,
    grantsWon: 38,
    totalFunded: "$16.1M",
    rating: 4.8,
    reviews: 31,
    location: "Atlanta, GA",
    rate: "$140–225/hr",
    availability: "Available",
    matchScore: 82,
    bio: "Dual expertise in US and European funding agencies, specializing in large-scale clinical trial proposals.",
  },
  {
    id: "gw-006",
    name: "Emily Torres, PhD",
    initials: "ET",
    title: "Research Development Officer",
    expertise: ["NSF", "NIH", "Data Science", "Digital Health"],
    successRate: 70,
    grantsWon: 24,
    totalFunded: "$9.7M",
    rating: 4.6,
    reviews: 20,
    location: "Austin, TX",
    rate: "$120–190/hr",
    availability: "Unavailable",
    matchScore: 79,
    bio: "Background in data science and digital health innovation with experience across federal funding agencies.",
  },
];

export function FindGrantWriters() {
  const [search, setSearch] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");

  let filtered = GRANT_WRITERS.filter((gw) => {
    const matchesSearch = !search || gw.name.toLowerCase().includes(search.toLowerCase()) || gw.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()));
    const matchesExpertise = expertiseFilter === "all" || gw.expertise.includes(expertiseFilter);
    return matchesSearch && matchesExpertise;
  });

  if (sortBy === "match") filtered.sort((a, b) => b.matchScore - a.matchScore);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "success") filtered.sort((a, b) => b.successRate - a.successRate);

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">Find Grant Writers</h2>
        <p className="text-sm text-muted-foreground">Search for experienced grant writers matched to your research profile.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or expertise..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
        </div>
        <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
          <SelectTrigger className="h-9 w-[160px]"><Filter className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Expertise</SelectItem>
            <SelectItem value="NIH">NIH</SelectItem>
            <SelectItem value="NSF">NSF</SelectItem>
            <SelectItem value="Gates Foundation">Gates Foundation</SelectItem>
            <SelectItem value="WHO">WHO</SelectItem>
            <SelectItem value="PCORI">PCORI</SelectItem>
            <SelectItem value="Clinical Research">Clinical Research</SelectItem>
            <SelectItem value="Global Health">Global Health</SelectItem>
            <SelectItem value="Health Equity">Health Equity</SelectItem>
            <SelectItem value="AI/ML">AI/ML</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-9 w-[160px]"><TrendingUp className="size-3.5 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best Match</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="success">Success Rate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} grant writers found</p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-3">
          {filtered.map((gw) => (
            <Link key={gw.id} href={`/researcher/grant-writers/${gw.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-11 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-sm">{gw.initials}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <VerifiedName verified={gw.verified} className="text-sm font-semibold">{gw.name}</VerifiedName>
                        <Badge variant={gw.availability === "Available" ? "default" : gw.availability === "Limited" ? "secondary" : "outline"} className="text-[10px]">{gw.availability}</Badge>
                        <Badge variant="outline" className="text-[10px] gap-1"><Star className="size-2.5 fill-current" />{gw.rating} ({gw.reviews})</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{gw.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{gw.bio}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><CheckCircle2 className="size-3" />{gw.successRate}% success</span>
                        <span className="flex items-center gap-1"><Award className="size-3" />{gw.grantsWon} grants won</span>
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{gw.totalFunded} funded</span>
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{gw.rate}</span>
                      </div>
                      <TrustBadges location={gw.location} country={gw.country} responseTime={gw.responseTime} languages={gw.languages} virtual projectBased />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {gw.expertise.map((e) => <Badge key={e} variant="secondary" className="text-[10px]">{e}</Badge>)}
                      </div>
                    </div>
                    <div className="shrink-0 text-center">
                      <div className={`flex size-11 items-center justify-center rounded-full ${gw.matchScore >= 90 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"}`}>
                        <span className="text-sm font-bold">{gw.matchScore}%</span>
                      </div>
                      <p className="mt-1 text-[10px] text-muted-foreground">match</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Users className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No grant writers match your search.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => { setSearch(""); setExpertiseFilter("all"); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
