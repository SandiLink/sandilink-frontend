"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GRANT = {
  id: "g-001",
  title: "NIH R21 — Exploratory/Developmental Research Grant",
  funder: "National Institutes of Health",
  program: "NIMHD",
  amount: "Up to $275,000",
  duration: "Up to 2 years",
  deadline: "Apr 15, 2026",
  daysLeft: 9,
  field: "Biomedical / Public Health",
  region: "United States",
  type: "Research Grant",
  description: "The NIH R21 mechanism supports exploratory and developmental research projects. These studies may involve considerable risk but may lead to a breakthrough in a particular area, or to the development of novel techniques, agents, methodologies, models, or applications.",
  eligibility: [
    "Principal Investigators at accredited institutions",
    "Postdoctoral researchers with institutional support",
    "U.S.-based institutions only",
  ],
  requirements: [
    "Project narrative (6 pages maximum)",
    "Specific aims (1 page)",
    "Budget justification",
    "Biographical sketches for all key personnel",
    "Letters of support (if applicable)",
  ],
  keyDates: [
    { label: "Application opens", date: "Jan 15, 2026" },
    { label: "Application deadline", date: "Apr 15, 2026" },
    { label: "Peer review", date: "Jun–Jul 2026" },
    { label: "Award notification", date: "Sep 2026" },
    { label: "Earliest start date", date: "Dec 1, 2026" },
  ],
};

const MY_CLIENTS = [
  { name: "Dr. Amira Rashid", initials: "AR", institution: "University Medical Center", projectStatus: "In Progress — 60%" },
];

export function GrantDetailView() {
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild><Link href="/grant-writer/grants"><ArrowLeft className="size-4" /></Link></Button>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{GRANT.description}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Eligibility</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {GRANT.eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />{e}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Application Requirements</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {GRANT.requirements.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">{i + 1}</div>{r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* My Clients on this Grant */}
          {MY_CLIENTS.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>My Clients</CardTitle>
                <CardDescription>Researchers you're helping with this grant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {MY_CLIENTS.map((c) => (
                    <div key={c.name} className="flex items-center gap-3 rounded-lg border p-3.5">
                      <Avatar><AvatarFallback className="bg-primary/10 text-primary text-xs">{c.initials}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.institution}</p>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{c.projectStatus}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="grid gap-6 content-start">
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

          <Card>
            <CardHeader><CardTitle>Key Dates</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
                <div className="grid gap-4">
                  {GRANT.keyDates.map((d, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 top-1.5 size-[7px] rounded-full ring-2 ring-background ${i === 1 ? "bg-destructive" : "bg-border"}`} />
                      <p className="text-xs font-medium">{d.label}</p>
                      <p className="text-[11px] text-muted-foreground">{d.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
