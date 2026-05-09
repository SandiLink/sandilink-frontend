"use client";

import Link from "next/link";
import {
  Award,
  CheckCircle2,
  DollarSign,
  MapPin,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MATCHED_WRITERS = [
  {
    id: "gw-001",
    name: "Dr. Lisa Nguyen",
    initials: "LN",
    title: "Senior Grant Writer & Research Consultant",
    matchScore: 96,
    matchReasons: ["NIH expertise aligns with your active R01", "Health disparities focus matches your research", "15 years experience in your field"],
    successRate: 78,
    grantsWon: 42,
    rating: 4.9,
    location: "Boston, MA",
    rate: "$150–250/hr",
    availability: "Available",
  },
  {
    id: "gw-002",
    name: "Mark Patterson, PhD",
    initials: "MP",
    title: "Freelance Grant Writer — STEM & Health Sciences",
    matchScore: 91,
    matchReasons: ["AI/ML expertise matches your research methodology", "NSF CAREER experience relevant to your career stage", "Track record in translational medicine"],
    successRate: 72,
    grantsWon: 31,
    rating: 4.8,
    location: "San Francisco, CA",
    rate: "$125–200/hr",
    availability: "Available",
  },
  {
    id: "gw-003",
    name: "Dr. Fatima Al-Rashidi",
    initials: "FA",
    title: "Grant Writing Specialist — Global Health",
    matchScore: 88,
    matchReasons: ["WHO and Gates Foundation expertise matches your pending applications", "Global health focus aligns with your vaccine research", "Strong epidemiology background"],
    successRate: 82,
    grantsWon: 55,
    rating: 5.0,
    location: "Washington, DC",
    rate: "$175–300/hr",
    availability: "Limited",
  },
];

export function MatchedGrantWriters() {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Matched Grant Writers</h2>
          <p className="text-sm text-muted-foreground">Grant writers recommended based on your research profile, active grants, and expertise.</p>
        </div>
        <Button variant="outline" size="sm" asChild><Link href="/researcher/grant-writers"><Users className="size-4" />Browse All</Link></Button>
      </div>

      {/* Top Matches */}
      <div className="grid gap-4">
        {MATCHED_WRITERS.map((gw, idx) => (
          <Card key={gw.id} className={idx === 0 ? "ring-1 ring-primary/30" : ""}>
            {idx === 0 && (
              <div className="bg-primary/5 border-b px-4 py-1.5">
                <p className="text-xs font-medium text-primary">Best Match — Recommended for your current research</p>
              </div>
            )}
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <div className="text-center shrink-0">
                  <Avatar className="size-14"><AvatarFallback className="bg-primary/10 text-primary text-base">{gw.initials}</AvatarFallback></Avatar>
                  <div className={`mt-2 flex size-10 mx-auto items-center justify-center rounded-full ${gw.matchScore >= 90 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"}`}>
                    <span className="text-sm font-bold">{gw.matchScore}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-base font-semibold">{gw.name}</p>
                    <Badge variant={gw.availability === "Available" ? "default" : "secondary"} className="text-[10px]">{gw.availability}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{gw.title}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" />{gw.rating}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="size-3" />{gw.successRate}% success</span>
                    <span className="flex items-center gap-1"><Award className="size-3" />{gw.grantsWon} grants</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3" />{gw.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="size-3" />{gw.rate}</span>
                  </div>

                  {/* Why matched */}
                  <div className="mt-3 rounded-lg bg-muted/50 p-3">
                    <p className="text-[11px] font-medium text-muted-foreground mb-1.5">Why this match:</p>
                    <ul className="grid gap-1">
                      {gw.matchReasons.map((reason) => (
                        <li key={reason} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 size-3 shrink-0 text-emerald-500" />{reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button size="sm" asChild><Link href={`/researcher/grant-writers/${gw.id}`}>View Profile</Link></Button>
                    <Button variant="outline" size="sm"><MessageSquare className="size-4" />Message</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
