"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Loader2,
  MapPin,
  MessageSquare,
  Send,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WRITER = {
  id: "gw-001",
  name: "Dr. Lisa Nguyen",
  initials: "LN",
  title: "Senior Grant Writer & Research Consultant",
  location: "Boston, MA",
  availability: "Available",
  rate: "$150–250/hr",
  rating: 4.9,
  reviews: 36,
  successRate: 78,
  grantsWon: 42,
  totalFunded: "$18.5M",
  matchScore: 96,
  yearsExperience: 15,
  bio: "I bring over 15 years of experience in biomedical and public health grant writing, specializing in NIH R01, R21, and K-series awards. My approach combines rigorous scientific writing with strategic narrative construction to maximize funding success. I work closely with researchers to develop compelling proposals that align with funder priorities and clearly communicate the significance and innovation of their research.",
  expertise: ["NIH", "NSF", "Health Disparities", "Clinical Research", "Public Health", "Biostatistics"],
  services: [
    { name: "Full Proposal Writing", description: "End-to-end grant proposal development", price: "From $5,000" },
    { name: "Proposal Review & Editing", description: "Critical review with detailed feedback", price: "From $1,500" },
    { name: "Specific Aims Page", description: "Strategic aims development and writing", price: "From $800" },
    { name: "Budget Development", description: "Budget construction and justification", price: "From $600" },
    { name: "Resubmission Strategy", description: "Response to reviewer critiques and resubmission plan", price: "From $2,000" },
  ],
  recentGrants: [
    { title: "NIH R01 — Cardiovascular Disease Prevention", amount: "$2.1M", year: "2025", status: "Funded" },
    { title: "NSF — Health Informatics Infrastructure", amount: "$890K", year: "2025", status: "Funded" },
    { title: "PCORI — Patient-Centered Diabetes Management", amount: "$1.4M", year: "2024", status: "Funded" },
    { title: "NIH R21 — Mental Health Screening Tools", amount: "$275K", year: "2024", status: "Funded" },
  ],
  clientReviews: [
    { name: "Dr. R. Thompson", rating: 5, text: "Lisa was instrumental in securing our NIH R01. Her strategic approach and attention to detail made all the difference.", date: "Mar 2026" },
    { name: "Dr. K. Okafor", rating: 5, text: "Excellent communicator who understood our research vision immediately. The proposal was polished and competitive.", date: "Jan 2026" },
    { name: "Dr. M. Patel", rating: 4, text: "Very thorough and knowledgeable about NIH processes. Would highly recommend for complex federal grants.", date: "Nov 2025" },
  ],
};

export function GrantWriterProfile() {
  const [isRequesting, setIsRequesting] = useState(false);

  async function handleRequest() {
    setIsRequesting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsRequesting(false);
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild><Link href="/researcher/grant-writers"><ArrowLeft className="size-4" /></Link></Button>
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <Avatar className="size-16 shrink-0"><AvatarFallback className="bg-primary/10 text-primary text-lg">{WRITER.initials}</AvatarFallback></Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-heading text-xl font-semibold tracking-tight">{WRITER.name}</h2>
                <Badge>Available</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{WRITER.title}</p>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-3" />{WRITER.location}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" />{WRITER.yearsExperience} years experience</span>
                <span className="flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{WRITER.rating} ({WRITER.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm"><MessageSquare className="size-4" />Message</Button>
          <Button size="sm" onClick={handleRequest} disabled={isRequesting}>
            {isRequesting ? <><Loader2 className="size-4 animate-spin" />Sending...</> : <><Send className="size-4" />Request Collaboration</>}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 grid gap-6">
          {/* About */}
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{WRITER.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {WRITER.expertise.map((e) => <Badge key={e} variant="secondary">{e}</Badge>)}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
              <CardDescription>Available grant writing services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {WRITER.services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between rounded-lg border p-3.5">
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary shrink-0">{s.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Success */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Funded Grants</CardTitle>
              <CardDescription>Proposals written or co-written by this grant writer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {WRITER.recentGrants.map((g) => (
                  <div key={g.title} className="flex items-center justify-between rounded-lg border p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"><Award className="size-3.5" /></div>
                      <div>
                        <p className="text-sm font-medium">{g.title}</p>
                        <p className="text-xs text-muted-foreground">{g.amount} · {g.year}</p>
                      </div>
                    </div>
                    <Badge className="text-[10px]">{g.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Client Reviews</CardTitle>
              <CardDescription>{WRITER.reviews} total reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {WRITER.clientReviews.map((r) => (
                  <div key={r.name} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{r.name}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="size-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{r.text}</p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground/60">{r.date}</p>
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
                <span className="text-xl font-bold">{WRITER.matchScore}%</span>
              </div>
              <p className="mt-2 text-sm font-medium">Match Score</p>
              <p className="text-xs text-muted-foreground">Based on your research profile</p>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader><CardTitle>Track Record</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="size-4" />Success Rate</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">{WRITER.successRate}%</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Award className="size-4" />Grants Won</span><span className="font-semibold">{WRITER.grantsWon}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><DollarSign className="size-4" />Total Funded</span><span className="font-semibold">{WRITER.totalFunded}</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Star className="size-4" />Rating</span><span className="font-semibold">{WRITER.rating}/5</span></div>
                <Separator />
                <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-muted-foreground"><Users className="size-4" />Reviews</span><span className="font-semibold">{WRITER.reviews}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Rate */}
          <Card>
            <CardHeader><CardTitle>Rate</CardTitle></CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">{WRITER.rate}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Hourly rate · Project-based pricing also available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
