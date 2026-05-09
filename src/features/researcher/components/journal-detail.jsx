"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  Send,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const JOURNAL = {
  id: "jrnl-001",
  name: "The Lancet Digital Health",
  publisher: "Elsevier",
  issn: "2589-7500",
  impactFactor: 36.6,
  hIndex: 89,
  citescore: 42.3,
  field: "Digital Health",
  frequency: "Monthly",
  accessType: "Open Access",
  reviewType: "Double-blind peer review",
  reviewTime: "6–8 weeks",
  acceptanceRate: "8%",
  firstDecision: "4 weeks",
  apc: "$5,200 USD",
  scope: "The Lancet Digital Health publishes important, innovative, and practice-changing research on any topic connected to digital technology in clinical medicine, public health, and global health. The journal covers digital health innovations including artificial intelligence, machine learning, mobile health, telemedicine, wearable devices, electronic health records, and health informatics.",
  aims: [
    "Advance digital health research from concept to clinical implementation",
    "Promote equitable access to digital health tools globally",
    "Bridge the gap between technology development and patient outcomes",
    "Support evidence-based digital health policy and practice",
  ],
  articleTypes: [
    { type: "Original Research", maxWords: "4,500", maxRefs: "40" },
    { type: "Review Article", maxWords: "6,000", maxRefs: "100" },
    { type: "Comment", maxWords: "1,500", maxRefs: "15" },
    { type: "Correspondence", maxWords: "500", maxRefs: "5" },
    { type: "Health Policy", maxWords: "4,000", maxRefs: "40" },
    { type: "Digital Health Innovation", maxWords: "3,000", maxRefs: "30" },
  ],
  guidelines: [
    "Manuscripts must follow ICMJE recommendations",
    "CONSORT, STROBE, PRISMA checklists as applicable",
    "All studies involving human subjects require ethics approval",
    "Data availability statement required",
    "Competing interests must be declared",
    "Cover letter with statement of novelty required",
  ],
  recentArticles: [
    { title: "AI-Driven Triage in Emergency Departments: A Randomized Controlled Trial", date: "Mar 2026", citations: 8 },
    { title: "Federated Learning for Multi-Institutional Clinical Prediction Models", date: "Mar 2026", citations: 5 },
    { title: "Digital Biomarkers for Early Detection of Parkinson's Disease", date: "Feb 2026", citations: 22 },
  ],
  url: "https://www.thelancet.com/digital-health",
  matchScore: 94,
};

export function JournalDetail() {
  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild><Link href="/researcher/journals"><ArrowLeft className="size-4" /></Link></Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>Open Access</Badge>
            <Badge variant="outline" className="text-[10px]">{JOURNAL.field}</Badge>
            <Badge variant="secondary" className="text-[10px]">{JOURNAL.frequency}</Badge>
          </div>
          <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight">{JOURNAL.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{JOURNAL.publisher} · ISSN: {JOURNAL.issn}</p>
        </div>
        <Button size="sm" asChild><Link href="/researcher/submissions/new"><Send className="size-4" />Submit Manuscript</Link></Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 grid gap-6">
          {/* Scope */}
          <Card>
            <CardHeader><CardTitle>Scope & Aims</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{JOURNAL.scope}</p>
              <ul className="mt-4 grid gap-2">
                {JOURNAL.aims.map((aim, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />{aim}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Article Types */}
          <Card>
            <CardHeader>
              <CardTitle>Article Types</CardTitle>
              <CardDescription>Accepted manuscript types and requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {JOURNAL.articleTypes.map((at) => (
                  <div key={at.type} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400"><FileText className="size-3.5" /></div>
                      <p className="text-sm font-medium">{at.type}</p>
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>Max {at.maxWords} words</span>
                      <span>Max {at.maxRefs} refs</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Guidelines */}
          <Card>
            <CardHeader><CardTitle>Submission Guidelines</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {JOURNAL.guidelines.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">{i + 1}</div>
                    {g}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Recently Published</CardTitle>
              <CardDescription>Latest articles in this journal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {JOURNAL.recentArticles.map((a) => (
                  <div key={a.title} className="flex items-start gap-3 rounded-lg border p-3.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"><FileText className="size-3.5 text-muted-foreground" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-snug">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.date} · {a.citations} citations</p>
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
                <span className="text-xl font-bold">{JOURNAL.matchScore}%</span>
              </div>
              <p className="mt-2 text-sm font-medium">Match Score</p>
              <p className="text-xs text-muted-foreground">Based on your research profile</p>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card>
            <CardHeader><CardTitle>Journal Metrics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Star className="size-4" />Impact Factor</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">{JOURNAL.impactFactor}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="size-4" />h-index</span><span className="font-semibold">{JOURNAL.hIndex}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="size-4" />CiteScore</span><span className="font-semibold">{JOURNAL.citescore}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Users className="size-4" />Acceptance Rate</span><span className="font-semibold">{JOURNAL.acceptanceRate}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardHeader><CardTitle>Submission Info</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Review Time</p><p className="font-medium">{JOURNAL.reviewTime}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><Calendar className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">First Decision</p><p className="font-medium">{JOURNAL.firstDecision}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><BookOpen className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">Review Type</p><p className="font-medium">{JOURNAL.reviewType}</p></div></div>
                <Separator />
                <div className="flex items-center gap-2"><DollarSign className="size-4 text-muted-foreground" /><div><p className="text-muted-foreground">APC</p><p className="font-medium">{JOURNAL.apc}</p></div></div>
              </div>
            </CardContent>
          </Card>

          {/* External Link */}
          <Button variant="outline" className="w-full" asChild>
            <a href={JOURNAL.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="size-4" />Visit Journal Website</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
