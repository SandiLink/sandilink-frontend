"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Filter, Search, Star, Users, X,
} from "lucide-react";
import { TrustBadges, VerifiedName } from "@/components/shared/trust-badges";
import { LocalizedText } from "@/components/shared/localized-text";
import { localizedHaystack } from "@/lib/localized-text";
import { SPECIALTIES } from "@/lib/catalogs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

const PRECEPTORS = [
  {
    id: "dr-robert-williams", name: "Dr. Robert Williams", initials: "RW", specialty: "Family Medicine",
    location: "City Health Clinic", country: "United States", distance: "3.2 mi", rating: 4.9, reviews: 42,
    students: 3, maxStudents: 4, experience: "20 years", responseTime: "< 4 hours",
    languages: ["English"], verified: true, tags: ["Accepting students", "Top rated"], availability: "Apr 15, 2026",
  },
  {
    id: "dr-maria-garcia", name: "Dr. Maria Garcia", initials: "MG",
    specialty: { en: "Pediatrics", es: "Pediatría", fr: "Pédiatrie" },
    location: "Children's Hospital", country: "United States", distance: "5.8 mi", rating: 4.8, reviews: 36,
    students: 2, maxStudents: 3, experience: "15 years", responseTime: "< 6 hours",
    languages: ["English", "Spanish"], verified: true, tags: ["Accepting students"], availability: "Apr 20, 2026",
  },
  {
    id: "dr-kevin-park", name: "Dr. Kevin Park", initials: "KP", specialty: "Emergency Medicine",
    location: "Metro General ER", country: "United States", distance: "8.1 mi", rating: 4.7, reviews: 28,
    students: 1, maxStudents: 2, experience: "12 years", responseTime: "< 12 hours",
    languages: ["English", "Korean"], verified: true, tags: ["Accepting students", "Night shifts available"], availability: "May 1, 2026",
  },
  {
    id: "dr-linda-thompson", name: "Dr. Linda Thompson", initials: "LT", specialty: "Internal Medicine",
    location: "University Medical Center", country: "United States", distance: "2.1 mi", rating: 5.0, reviews: 18,
    students: 4, maxStudents: 4, experience: "25 years", responseTime: "< 2 hours",
    languages: ["English"], verified: true, tags: ["Top rated"], availability: null,
  },
  {
    id: "dr-james-martinez", name: "Dr. James Martinez", initials: "JM", specialty: "Surgery",
    location: "Regional Surgical Center", country: "United States", distance: "12.4 mi", rating: 4.6, reviews: 22,
    students: 1, maxStudents: 2, experience: "18 years", responseTime: "< 24 hours",
    languages: ["English", "Spanish"], verified: true, tags: ["Accepting students", "Paid stipend"], availability: "Apr 10, 2026",
  },
  {
    id: "dr-anna-chen", name: "Dr. Anna Chen", initials: "AC",
    specialty: { en: "OB/GYN", es: "Ginecología y Obstetricia", fr: "Gynéco-obstétrique" },
    location: "Women's Health Clinic", country: "United States", distance: "4.5 mi", rating: 4.9, reviews: 31,
    students: 2, maxStudents: 3, experience: "14 years", responseTime: "< 8 hours",
    languages: ["English", "Mandarin"], verified: true, tags: ["Accepting students", "Top rated"], availability: "Apr 12, 2026",
  },
];

function FilterPanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Specialty</Label>
        <Select>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="All specialties" /></SelectTrigger>
          <SelectContent>
            {SPECIALTIES.map((s) => <SelectItem key={s.id} value={s.id}><LocalizedText value={s.label} /></SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium">Distance</Label>
        <Slider defaultValue={[25]} max={100} step={5} />
        <p className="text-xs text-muted-foreground">Within 25 miles</p>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium">Availability</Label>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="f-accepting" defaultChecked />
            <Label htmlFor="f-accepting" className="text-sm font-normal">Accepting students</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="f-has-slots" />
            <Label htmlFor="f-has-slots" className="text-sm font-normal">Has open slots</Label>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium">Minimum Rating</Label>
        <Select defaultValue="4">
          <SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any rating</SelectItem>
            <SelectItem value="3">3+ stars</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-sm font-medium">Features</Label>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="f-stipend" />
            <Label htmlFor="f-stipend" className="text-sm font-normal">Paid stipend</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="f-night" />
            <Label htmlFor="f-night" className="text-sm font-normal">Night shifts available</Label>
          </div>
        </div>
      </div>

      <Button className="w-full">Apply filters</Button>
    </div>
  );
}

function PreceptorCard({ preceptor }) {
  const isFull = preceptor.students >= preceptor.maxStudents;

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex gap-4">
          <Avatar className="size-14 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">{preceptor.initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <VerifiedName verified={preceptor.verified}>
                  <Link href={`/student/preceptors/${preceptor.id}`} className="hover:text-primary hover:underline">
                    {preceptor.name}
                  </Link>
                </VerifiedName>
                <p className="text-xs text-muted-foreground">
                  <LocalizedText value={preceptor.specialty} /> — {preceptor.experience}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{preceptor.rating}</span>
              <span className="text-xs text-muted-foreground">({preceptor.reviews} reviews)</span>
            </div>

            <TrustBadges
              location={preceptor.location}
              distance={preceptor.distance}
              country={preceptor.country}
              responseTime={preceptor.responseTime}
              languages={preceptor.languages}
              inPerson
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="size-3" />{preceptor.students}/{preceptor.maxStudents} students
            </div>

            <div className="flex flex-wrap gap-1.5">
              {preceptor.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
              {isFull && <Badge variant="outline" className="text-xs text-destructive">Full</Badge>}
            </div>

            <div className="flex items-center justify-between pt-1">
              {preceptor.availability ? (
                <p className="text-xs text-muted-foreground">
                  Next opening: <span className="font-medium text-foreground">{preceptor.availability}</span>
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">No openings currently</p>
              )}
              <Button size="sm" disabled={isFull} asChild={!isFull}>
                {isFull ? "Full" : <Link href={`/student/preceptors/${preceptor.id}`}>View profile</Link>}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PreceptorSearch() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const q = search.trim().toLowerCase();
  const filtered = !q
    ? PRECEPTORS
    : PRECEPTORS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          localizedHaystack(p.specialty).includes(q) ||
          p.location.toLowerCase().includes(q),
      );

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      {/* Desktop filters */}
      <aside className="hidden lg:block">
        <Card className="sticky top-20">
          <div className="p-4 pb-0"><p className="text-base font-medium">Filters</p></div>
          <CardContent className="pt-4"><FilterPanel /></CardContent>
        </Card>
      </aside>

      {/* Results */}
      <div className="grid gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search preceptors, specialties, locations..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 pl-9" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 lg:hidden"><Filter className="size-4" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader><SheetTitle>Filters</SheetTitle><SheetDescription>Refine your search</SheetDescription></SheetHeader>
              <div className="mt-4"><FilterPanel /></div>
            </SheetContent>
          </Sheet>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="hidden h-10 w-44 sm:flex"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most relevant</SelectItem>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="distance">Nearest</SelectItem>
              <SelectItem value="availability">Soonest available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filtered.length}</span> preceptors found
          </p>
          <div className="flex gap-1.5">
            <Badge variant="secondary" className="gap-1 text-xs">
              Accepting students <button className="ml-0.5 hover:text-foreground"><X className="size-3" /></button>
            </Badge>
          </div>
        </div>

        <div className="grid gap-3">
          {filtered.map((p) => <PreceptorCard key={p.id} preceptor={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <Search className="mx-auto size-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">No preceptors match your search.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setSearch("")}>Clear search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
