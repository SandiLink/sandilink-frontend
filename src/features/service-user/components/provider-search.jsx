"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Filter,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  PenTool,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";
import { TrustBadges, VerifiedName } from "@/components/shared/trust-badges";
import { LocalizedText } from "@/components/shared/localized-text";
import { localizedHaystack } from "@/lib/localized-text";
import {
  SPECIALTIES,
  CREDENTIALS,
  DELIVERY_MODES,
  PROVIDER_CATEGORIES,
  activeOnly,
} from "@/lib/catalogs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ScrollableButtonGroup } from "@/components/shared/ScrollableButtonGroup";

const VERTICALS = [
  { id: "all", label: "All Experts", icon: Search },
  { id: "clinical", label: "Clinical Care", icon: Stethoscope },
  { id: "therapy", label: "Therapy & Rehab", icon: HeartPulse },
  { id: "nursing", label: "Nursing Support", icon: HeartPulse },
  { id: "research", label: "Research Support", icon: FlaskConical },
  { id: "grant-writing", label: "Grant Writing", icon: PenTool },
  { id: "mentorship", label: "Mentorship", icon: GraduationCap },
];

const EXPERTS = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    profession: { en: "Physician", es: "Médica", fr: "Médecin" },
    specialty: { en: "General Practice", es: "Medicina General", fr: "Médecine générale" },
    rating: 4.9,
    reviews: 124,
    initials: "SJ",
    location: "Downtown Medical Center",
    country: "United States",
    distance: "2.3 mi",
    virtual: true,
    inPerson: true,
    projectBased: false,
    nextAvailable: "Tomorrow, 10:00 AM",
    responseTime: "< 1 hour",
    price: 120,
    languages: ["English", "Spanish"],
    verified: true,
    tags: ["Accepting new patients", "Top rated"],
    vertical: "clinical",
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    profession: "Physical Therapist",
    specialty: "Sports Rehabilitation",
    rating: 4.8,
    reviews: 89,
    initials: "MC",
    location: "Wellness Clinic East",
    country: "United States",
    distance: "4.1 mi",
    virtual: false,
    inPerson: true,
    projectBased: false,
    nextAvailable: "Apr 5, 2:30 PM",
    responseTime: "< 2 hours",
    price: 150,
    languages: ["English", "Mandarin"],
    verified: true,
    tags: ["Accepting new patients"],
    vertical: "therapy",
  },
  {
    id: "dr-emily-davis",
    name: "Dr. Emily Davis",
    profession: "Psychologist",
    specialty: "Mental Health",
    rating: 5.0,
    reviews: 67,
    initials: "ED",
    location: "Telehealth Only",
    country: "United States",
    distance: null,
    virtual: true,
    inPerson: false,
    projectBased: false,
    nextAvailable: "Today, 4:00 PM",
    responseTime: "< 30 min",
    price: 100,
    languages: ["English"],
    verified: true,
    tags: ["Top rated", "Same-day available"],
    vertical: "therapy",
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    profession: "Cardiologist",
    specialty: "Cardiology",
    rating: 4.7,
    reviews: 203,
    initials: "JW",
    location: "Heart Health Center",
    country: "United States",
    distance: "7.8 mi",
    virtual: true,
    inPerson: true,
    projectBased: false,
    nextAvailable: "Apr 7, 9:00 AM",
    responseTime: "< 4 hours",
    price: 200,
    languages: ["English"],
    verified: true,
    tags: [],
    vertical: "clinical",
  },
  {
    id: "dr-lisa-nguyen",
    name: "Dr. Lisa Nguyen",
    profession: "Grant Writer",
    specialty: "NIH & NSF Proposals",
    rating: 4.9,
    reviews: 36,
    initials: "LN",
    location: "Boston, MA",
    country: "United States",
    distance: null,
    virtual: true,
    inPerson: false,
    projectBased: true,
    nextAvailable: "Available now",
    responseTime: "< 1 hour",
    price: 150,
    languages: ["English", "Vietnamese"],
    verified: true,
    tags: ["78% success rate", "Top rated"],
    vertical: "grant-writing",
  },
  {
    id: "dr-amira-rashid",
    name: "Dr. Amira Rashid",
    profession: "Researcher",
    specialty: "Public Health / AI",
    rating: 4.8,
    reviews: 12,
    initials: "AR",
    location: "University Medical Center",
    country: "United States",
    distance: null,
    virtual: true,
    inPerson: true,
    projectBased: true,
    nextAvailable: "Available for collaboration",
    responseTime: "< 24 hours",
    price: 0,
    languages: ["English", "Arabic"],
    verified: true,
    tags: ["h-index: 18", "NIH funded"],
    vertical: "research",
  },
  {
    id: "dr-robert-williams",
    name: "Dr. Robert Williams",
    profession: "Preceptor",
    specialty: "Family Medicine",
    rating: 4.9,
    reviews: 45,
    initials: "RW",
    location: "City Health Clinic",
    country: "United States",
    distance: "3.2 mi",
    virtual: false,
    inPerson: true,
    projectBased: false,
    nextAvailable: "Accepting students",
    responseTime: "< 12 hours",
    price: 0,
    languages: ["English"],
    verified: true,
    tags: ["15+ years experience", "Mentoring 3 students"],
    vertical: "mentorship",
  },
  {
    id: "nurse-patricia-gomez",
    name: "Patricia Gomez, RN",
    profession: { en: "Registered Nurse", es: "Enfermera Registrada", fr: "Infirmière diplômée" },
    specialty: { en: "Home Health Care", es: "Atención Domiciliaria", fr: "Soins à domicile" },
    rating: 4.7,
    reviews: 34,
    initials: "PG",
    location: "Mobile — Metro Area",
    country: "United States",
    distance: "5.0 mi",
    virtual: false,
    inPerson: true,
    projectBased: false,
    nextAvailable: "Apr 5, 8:00 AM",
    responseTime: "< 2 hours",
    price: 85,
    languages: ["English", "Spanish"],
    verified: true,
    tags: ["Home visits"],
    vertical: "nursing",
  },
];

function FilterPanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Role / Category</Label>
        <Select>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="All roles" /></SelectTrigger>
          <SelectContent>
            {activeOnly(PROVIDER_CATEGORIES).map((c) => (
              <SelectItem key={c.id} value={c.id}><LocalizedText value={c.label} /></SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Specialty</Label>
        <Select>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="All specialties" /></SelectTrigger>
          <SelectContent>
            {activeOnly(SPECIALTIES).map((s) => (
              <SelectItem key={s.id} value={s.id}><LocalizedText value={s.label} /></SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Credential</Label>
        <Select>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Any credential" /></SelectTrigger>
          <SelectContent>
            {activeOnly(CREDENTIALS).map((c) => (
              <SelectItem key={c.id} value={c.id}>
                <LocalizedText value={c.label} />
                {c.country ? <span className="ml-1 text-xs text-muted-foreground">· {c.country}</span> : null}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Delivery Mode</Label>
        <div className="grid gap-2">
          {activeOnly(DELIVERY_MODES).map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              <Checkbox id={`filter-mode-${m.id}`} defaultChecked />
              <Label htmlFor={`filter-mode-${m.id}`} className="text-sm font-normal">
                <LocalizedText value={m.label} />
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-2"><Label className="text-sm font-medium">Distance</Label><Slider defaultValue={[25]} max={100} step={5} /><p className="text-xs text-muted-foreground">Within 25 miles</p></div>
      <div className="grid gap-2"><Label className="text-sm font-medium">Price Range</Label><div className="grid grid-cols-2 gap-2"><Input type="number" placeholder="Min" className="h-9" /><Input type="number" placeholder="Max" className="h-9" /></div></div>
      <div className="grid gap-2"><Label className="text-sm font-medium">Minimum Rating</Label>
        <Select defaultValue="4"><SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="any">Any rating</SelectItem><SelectItem value="3">3+ stars</SelectItem><SelectItem value="4">4+ stars</SelectItem><SelectItem value="4.5">4.5+ stars</SelectItem></SelectContent></Select>
      </div>
      <div className="grid gap-2"><Label className="text-sm font-medium">Language</Label>
        <Select><SelectTrigger className="h-10 w-full"><SelectValue placeholder="Any language" /></SelectTrigger><SelectContent><SelectItem value="english">English</SelectItem><SelectItem value="spanish">Spanish</SelectItem><SelectItem value="mandarin">Mandarin</SelectItem><SelectItem value="arabic">Arabic</SelectItem></SelectContent></Select>
      </div>
      <Button className="w-full">Apply filters</Button>
    </div>
  );
}

function ExpertCard({ expert }) {
  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex gap-4">
          <Avatar className="size-14 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-sm">{expert.initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <VerifiedName verified={expert.verified}>
                  <Link href={`/dashboard/experts/${expert.id}`} className="hover:text-primary hover:underline">{expert.name}</Link>
                </VerifiedName>
                <p className="text-xs text-muted-foreground">
                  <LocalizedText value={expert.profession} /> · <LocalizedText value={expert.specialty} />
                </p>
              </div>
              {expert.price > 0 && <span className="text-base font-semibold">${expert.price}<span className="text-xs font-normal text-muted-foreground">/hr</span></span>}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{expert.rating}</span>
              <span className="text-xs text-muted-foreground">({expert.reviews} reviews)</span>
            </div>

            {/* Trust signals + delivery model */}
            <TrustBadges
              location={expert.location}
              distance={expert.distance}
              country={expert.country}
              responseTime={expert.responseTime}
              languages={expert.languages}
              virtual={expert.virtual}
              inPerson={expert.inPerson}
              projectBased={expert.projectBased}
            />

            {/* Tags */}
            {expert.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {expert.tags.map((tag) => (<Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>))}
              </div>
            )}

            {/* Availability + action */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-muted-foreground">
                {expert.nextAvailable.includes("Available") ? "" : "Next: "}
                <span className="font-medium text-foreground">{expert.nextAvailable}</span>
              </p>
              <Button size="sm" asChild>
                <Link href={`/dashboard/experts/${expert.id}`}>
                  {expert.projectBased ? "View Profile" : "Book now"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProviderSearch() {
  const [search, setSearch] = useState("");
  const [activeVertical, setActiveVertical] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const filtered = EXPERTS.filter((e) => {
    const matchesVertical = activeVertical === "all" || e.vertical === activeVertical;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(q) ||
      localizedHaystack(e.specialty).includes(q) ||
      localizedHaystack(e.profession).includes(q);
    return matchesVertical && matchesSearch;
  });

  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <ScrollableButtonGroup
          items={VERTICALS}
          activeValue={activeVertical}
          onChange={setActiveVertical}
        />
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search experts, specialties, skills..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 pl-9" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 lg:hidden">
                <Filter className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>
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
              <SelectItem value="price-low">Price: low to high</SelectItem>
              <SelectItem value="price-high">Price: high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <Card>
            <CardHeader><CardTitle className="text-base">Filters</CardTitle></CardHeader>
            <CardContent><FilterPanel /></CardContent>
          </Card>
        </aside>

        {/* Results */}
        <div className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filtered.length}</span> experts found
          </p>

          <div className="grid gap-3">
            {filtered.map((expert) => (<ExpertCard key={expert.id} expert={expert} />))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <Search className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm text-muted-foreground">No experts match your search.</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => { setSearch(""); setActiveVertical("all"); }}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
