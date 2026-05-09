"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Send,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GRANT = {
  id: "grant-001",
  title: "NIH R21 — Exploratory/Developmental Research Grant",
  funder: "National Institutes of Health",
  program: "National Institute on Minority Health and Health Disparities (NIMHD)",
  amount: "Up to $275,000",
  duration: "Up to 2 years",
  deadline: "Apr 15, 2026",
  daysLeft: 9,
  type: "Research Grant",
  field: "Biomedical / Public Health",
  region: "United States",
  eligibility: [
    "Principal Investigators at accredited institutions",
    "Postdoctoral researchers with institutional support",
    "U.S.-based institutions only",
    "No citizenship requirement for PI",
  ],
  description: "The NIH R21 mechanism supports exploratory and developmental research projects. These studies may involve considerable risk but may lead to a breakthrough in a particular area, or to the development of novel techniques, agents, methodologies, models, or applications that could have a major impact on a field of biomedical, behavioral, or clinical research.",
  objectives: [
    "Support innovative, high-risk/high-reward research ideas",
    "Fund preliminary studies that may lead to larger R01 applications",
    "Encourage new research directions from established investigators",
    "Foster development of novel methodologies and approaches",
  ],
  requirements: [
    "Project narrative (6 pages maximum)",
    "Specific aims (1 page)",
    "Budget justification",
    "Biographical sketches for all key personnel",
    "Letters of support (if applicable)",
    "Human subjects or animal protocols (if applicable)",
  ],
  reviewCriteria: [
    { criterion: "Significance", weight: "High", description: "Does the project address an important problem?" },
    { criterion: "Innovation", weight: "High", description: "Does the project employ novel concepts or approaches?" },
    { criterion: "Approach", weight: "High", description: "Are the methods well-designed and feasible?" },
    { criterion: "Investigators", weight: "Medium", description: "Are the investigators appropriately trained?" },
    { criterion: "Environment", weight: "Medium", description: "Does the institution provide adequate support?" },
  ],
  keyDates: [
    { label: "Application opens", date: "Jan 15, 2026" },
    { label: "Letter of intent (optional)", date: "Mar 15, 2026" },
    { label: "Application deadline", date: "Apr 15, 2026" },
    { label: "Peer review", date: "Jun–Jul 2026" },
    { label: "Award notification", date: "Sep 2026" },
    { label: "Earliest start date", date: "Dec 1, 2026" },
  ],
  url: "https://grants.nih.gov/grants/guide/pa-files/PA-20-195.html",
  matchScore: 92,
};

export function GrantDetail() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3 flex-wrap gap-4">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" asChild><Link href="/researcher/grants/search"><ArrowLeft className="size-4" /></Link></Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-[10px]">{GRANT.type}</Badge>
            <Badge variant="outline" className="text-[10px]">{GRANT.field}</Badge>
            {GRANT.daysLeft <= 14 && <Badge variant="destructive" className="text-[10px]">{GRANT.daysLeft} days left</Badge>}
          </div>
          <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight leading-snug">{GRANT.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{GRANT.funder} · {GRANT.program}</p>
        </div>
        </div>
        <div className="flex gap-2 shrink-0 ms-auto">
          <Button variant="outline" size="sm" onClick={() => setIsSaved(!isSaved)}>
            {isSaved ? <BookmarkCheck className="size-4 text-primary" /> : <Bookmark className="size-4" />}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="sm" asChild><Link href="/researcher/grants/apply/grant-001"><Send className="size-4" />Apply</Link></Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 grid gap-6">
          {/* Description */}
          <Card>
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{GRANT.description}</p>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card>
            <CardHeader><CardTitle>Objectives</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {GRANT.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {obj}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader><CardTitle>Eligibility Requirements</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {GRANT.eligibility.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Users className="mt-0.5 size-4 shrink-0 text-blue-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Application Requirements</CardTitle>
              <CardDescription>Documents and materials needed for submission</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {GRANT.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">{i + 1}</div>
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Review Criteria */}
          <Card>
            <CardHeader><CardTitle>Review Criteria</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {GRANT.reviewCriteria.map((rc) => (
                  <div key={rc.criterion} className="flex items-start gap-3 rounded-lg border p-3.5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{rc.criterion}</p>
                        <Badge variant={rc.weight === "High" ? "default" : "secondary"} className="text-[10px]">{rc.weight}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{rc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="grid gap-6 content-start">
          {/* Match Score */}
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <span className="text-xl font-bold">{GRANT.matchScore}%</span>
              </div>
              <p className="mt-2 text-sm font-medium">Match Score</p>
              <p className="text-xs text-muted-foreground">Based on your research profile</p>
            </CardContent>
          </Card>

          {/* Key Details */}
          <Card>
            <CardHeader><CardTitle>Key Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2"><DollarSign className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Funding</p><p className="font-medium">{GRANT.amount}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Duration</p><p className="font-medium">{GRANT.duration}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><Calendar className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Deadline</p><p className={`font-medium ${GRANT.daysLeft <= 14 ? "text-destructive" : ""}`}>{GRANT.deadline}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Region</p><p className="font-medium">{GRANT.region}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><Globe className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Funder</p><p className="font-medium">{GRANT.funder}</p></div></div>
              </div>
            </CardContent>
          </Card>

          {/* Key Dates */}
          <Card>
            <CardHeader><CardTitle>Key Dates</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
                <div className="grid gap-4">
                  {GRANT.keyDates.map((d, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 top-1.5 size-[7px] rounded-full ring-2 ring-background ${i === 2 ? "bg-destructive" : "bg-border"}`} />
                      <p className="text-xs font-medium">{d.label}</p>
                      <p className="text-[11px] text-muted-foreground">{d.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Link */}
          <Button variant="outline" className="w-full" asChild>
            <a href={GRANT.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" />View on Funder Website</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
