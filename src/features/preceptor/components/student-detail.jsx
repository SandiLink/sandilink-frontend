"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, ClipboardList, FileText, GraduationCap, MapPin, MessageSquare, StickyNote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STUDENT = {
  name: "Jane Smith", initials: "JS", program: "BSN — 3rd Year", institution: "State University",
  email: "jsmith@uni.edu", phone: "+1 (555) 234-5678", start: "Jan 15, 2026", end: "May 15, 2026",
  hours: 320, required: 640, bio: "Third-year nursing student passionate about family medicine and community health.",
  preferences: ["Family Medicine", "Pediatrics", "Emergency Medicine"],
  credentials: ["Official Transcript — Verified", "CPR Certification — Verified", "Background Check — Verified", "Immunization Records — Verified"],
};

export function StudentDetail({ studentId }) {
  const pct = Math.round((STUDENT.hours / STUDENT.required) * 100);

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild><Link href="/preceptor/students"><ArrowLeft className="size-4" data-icon="inline-start" />Back to students</Link></Button>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-14"><AvatarFallback className="bg-primary/10 text-primary text-lg">{STUDENT.initials}</AvatarFallback></Avatar>
            <div>
              <h2 className="font-heading text-lg font-semibold">{STUDENT.name}</h2>
              <p className="text-sm text-muted-foreground">{STUDENT.program} — {STUDENT.institution}</p>
              <p className="text-xs text-muted-foreground">{STUDENT.email}</p>
            </div>
          </div>
          <Badge className="w-fit">Active</Badge>
        </div>

        <Card>
          <CardHeader><CardTitle>About</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{STUDENT.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{STUDENT.preferences.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Placement Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 mb-4">
              <div className="flex items-start gap-2.5"><CalendarDays className="mt-0.5 size-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Duration</p><p className="text-sm font-medium">{STUDENT.start} — {STUDENT.end}</p></div></div>
              <div className="flex items-start gap-2.5"><GraduationCap className="mt-0.5 size-4 text-muted-foreground" /><div><p className="text-xs text-muted-foreground">Institution</p><p className="text-sm font-medium">{STUDENT.institution}</p></div></div>
            </div>
            <div><div className="flex items-center justify-between text-sm mb-2"><span className="text-muted-foreground">Clinical hours</span><span className="font-semibold">{STUDENT.hours}/{STUDENT.required} ({pct}%)</span></div>
              <div className="h-3 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
              <p className="mt-1 text-xs text-muted-foreground">{STUDENT.required - STUDENT.hours} hours remaining</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Verified Credentials</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-2">{STUDENT.credentials.map(c => (
              <div key={c} className="flex items-center gap-2 text-sm"><Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">Verified</Badge>{c.split(" — ")[0]}</div>
            ))}</div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link href={`/preceptor/students/${studentId}/progress`}><ClipboardList className="size-4" data-icon="inline-start" />Review hours</Link></Button>
          <Button variant="outline" asChild><Link href={`/preceptor/students/${studentId}/evaluate`}><FileText className="size-4" data-icon="inline-start" />Evaluate student</Link></Button>
          <Button variant="outline" asChild><Link href={`/preceptor/students/${studentId}/notes`}><StickyNote className="size-4" data-icon="inline-start" />Performance notes</Link></Button>
          <Button variant="outline" asChild><Link href={`/preceptor/messages/${studentId}`}><MessageSquare className="size-4" data-icon="inline-start" />Message student</Link></Button>
        </div>
      </div>
    </div>
  );
}
