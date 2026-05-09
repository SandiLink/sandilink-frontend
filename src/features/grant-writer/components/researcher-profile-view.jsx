"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe,
  MapPin,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RESEARCHER = {
  name: "Dr. Amira Rashid",
  initials: "AR",
  title: "Assistant Professor",
  institution: "University Medical Center",
  department: "Department of Public Health Sciences",
  location: "Boston, MA",
  degree: "Ph.D.",
  orcid: "0000-0002-1234-5678",
  primaryField: "Public Health",
  secondaryField: "Health Informatics",
  keywords: ["machine learning", "health disparities", "clinical diagnostics", "global health"],
  hIndex: 18,
  publications: 12,
  citations: 187,
  bio: "My research focuses on leveraging machine learning and community-based approaches to address health disparities in underserved populations. I specialize in translational research that bridges clinical diagnostics with public health interventions.",
  activeGrants: [
    { title: "NIH R01 — Community Health Disparities", amount: "$425,000", status: "Awarded" },
    { title: "NSF CAREER — AI in Clinical Diagnostics", amount: "$550,000", status: "Awarded" },
  ],
  recentPublications: [
    { title: "Machine Learning Approaches to Early Disease Detection in Underserved Communities", journal: "The Lancet Digital Health", year: "2026" },
    { title: "AI-Driven Screening Tools for Low-Resource Clinical Environments", journal: "Nature Medicine", year: "2026" },
  ],
};

const MY_PROJECTS = [
  { title: "NIH R21 — Mental Health Interventions", service: "Full Proposal", status: "In Progress", progress: 60 },
];

export function ResearcherProfileView() {
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild><Link href="/grant-writer/clients"><ArrowLeft className="size-4" /></Link></Button>
        <div className="flex items-start gap-4 flex-1">
          <Avatar className="size-16 shrink-0"><AvatarFallback className="bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-lg">{RESEARCHER.initials}</AvatarFallback></Avatar>
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">{RESEARCHER.name}</h2>
            <p className="text-sm text-muted-foreground">{RESEARCHER.title} · {RESEARCHER.degree}</p>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="size-3" />{RESEARCHER.location}</span>
              <span className="flex items-center gap-1"><Globe className="size-3" />{RESEARCHER.institution}</span>
              <span className="flex items-center gap-1"><BookOpen className="size-3" />{RESEARCHER.department}</span>
            </div>
          </div>
        </div>
      </div>
        <Button className="ms-auto" variant="outline" size="sm"><MessageSquare className="size-4" />Message</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 grid gap-6">
          <Card>
            <CardHeader><CardTitle>Research Summary</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{RESEARCHER.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {RESEARCHER.keywords.map((kw) => <Badge key={kw} variant="secondary">{kw}</Badge>)}
              </div>
            </CardContent>
          </Card>

          {/* My Projects with this Researcher */}
          {MY_PROJECTS.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Active engagements with this researcher</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {MY_PROJECTS.map((p) => (
                    <div key={p.title} className="rounded-lg border p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{p.service}</p>
                        </div>
                        <Badge>{p.status}</Badge>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{p.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Grants */}
          <Card>
            <CardHeader><CardTitle>Active Grants</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {RESEARCHER.activeGrants.map((g) => (
                  <div key={g.title} className="flex items-center justify-between rounded-lg border p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"><Award className="size-3.5" /></div>
                      <div>
                        <p className="text-sm font-medium">{g.title}</p>
                        <p className="text-xs text-muted-foreground">{g.amount}</p>
                      </div>
                    </div>
                    <Badge className="text-[10px]">{g.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Publications */}
          <Card>
            <CardHeader><CardTitle>Recent Publications</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {RESEARCHER.recentPublications.map((p) => (
                  <div key={p.title} className="flex items-start gap-3 rounded-lg border p-3.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400"><FileText className="size-3.5" /></div>
                    <div>
                      <p className="text-sm font-medium leading-snug">{p.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{p.journal} · {p.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="grid gap-6 content-start">
          <Card>
            <CardHeader><CardTitle>Research Metrics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="size-4" />h-index</span><span className="font-semibold">{RESEARCHER.hIndex}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><FileText className="size-4" />Publications</span><span className="font-semibold">{RESEARCHER.publications}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Star className="size-4" />Citations</span><span className="font-semibold">{RESEARCHER.citations}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><FlaskConical className="size-4" />Primary Field</span><span className="font-semibold">{RESEARCHER.primaryField}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><BookOpen className="size-4" />Secondary</span><span className="font-semibold">{RESEARCHER.secondaryField}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Identifiers</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <div><p className="text-muted-foreground">ORCID</p><p className="font-mono text-xs text-primary">{RESEARCHER.orcid}</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
