"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Download, FileText, MapPin, MessageSquare, Upload } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PLACEMENT = {
  id: "pl-001",
  preceptor: "Dr. Robert Williams",
  initials: "RW",
  specialty: "Family Medicine",
  location: "City Health Clinic",
  address: "456 Health Ave, New York, NY 10002",
  startDate: "Jan 15, 2026",
  endDate: "May 15, 2026",
  schedule: "Monday — Friday, 8:00 AM — 4:00 PM",
  hoursCompleted: 320,
  hoursRequired: 640,
  status: "active",
  objectives: [
    "Complete 640 clinical hours in outpatient family medicine",
    "Perform patient assessments under supervision",
    "Develop care plans for chronic disease management",
    "Participate in patient education and counseling",
    "Document patient encounters in EMR system",
  ],
  milestones: [
    { label: "Orientation completed", date: "Jan 15, 2026", done: true },
    { label: "Mid-rotation evaluation", date: "Mar 15, 2026", done: true },
    { label: "300 hours checkpoint", date: "Mar 20, 2026", done: true },
    { label: "Final evaluation", date: "May 10, 2026", done: false },
    { label: "Rotation complete", date: "May 15, 2026", done: false },
  ],
};

export function PlacementDetails({ placementId }) {
  const pct = Math.round((PLACEMENT.hoursCompleted / PLACEMENT.hoursRequired) * 100);

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href="/student/placements"><ArrowLeft className="size-4" data-icon="inline-start" />Back to placements</Link>
      </Button>

      <div className="grid gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12"><AvatarFallback className="bg-primary/10 text-primary">{PLACEMENT.initials}</AvatarFallback></Avatar>
            <div>
              <h2 className="font-heading text-lg font-semibold">{PLACEMENT.preceptor}</h2>
              <p className="text-sm text-muted-foreground">{PLACEMENT.specialty}</p>
            </div>
          </div>
          <Badge className="w-fit text-sm">Active</Badge>
        </div>

        {/* Details */}
        <Card>
          <CardHeader><CardTitle>Placement Details</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Location</p><p className="text-sm font-medium">{PLACEMENT.location}</p><p className="text-xs text-muted-foreground">{PLACEMENT.address}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Duration</p><p className="text-sm font-medium">{PLACEMENT.startDate} — {PLACEMENT.endDate}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Schedule</p><p className="text-sm font-medium">{PLACEMENT.schedule}</p></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader><CardTitle>Clinical Hours Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Hours completed</span>
                  <span className="font-semibold">{PLACEMENT.hoursCompleted} / {PLACEMENT.hoursRequired} hrs</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{pct}% complete — {PLACEMENT.hoursRequired - PLACEMENT.hoursCompleted} hours remaining</p>
              </div>

              <Separator />

              <div>
                <p className="mb-3 text-sm font-medium">Milestones</p>
                <div className="grid gap-2">
                  {PLACEMENT.milestones.map((m) => (
                    <div key={m.label} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className={`size-4 rounded-full border-2 ${m.done ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground/30"}`}>
                        {m.done && <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${m.done ? "font-medium" : "text-muted-foreground"}`}>{m.label}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning objectives */}
        <Card>
          <CardHeader><CardTitle>Learning Objectives</CardTitle></CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {PLACEMENT.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">{i + 1}</span>
                  {obj}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><Link href={`/student/placements/${placementId}/progress`}><FileText className="size-4" data-icon="inline-start" />Log hours</Link></Button>
          <Button variant="outline" asChild><Link href={`/student/placements/${placementId}/documents`}><Upload className="size-4" data-icon="inline-start" />Upload documents</Link></Button>
          <Button variant="outline" asChild><Link href={`/student/messages/dr-robert-williams`}><MessageSquare className="size-4" data-icon="inline-start" />Message preceptor</Link></Button>
          <Button variant="outline"><Download className="size-4" data-icon="inline-start" />Download summary</Button>
        </div>
      </div>
    </div>
  );
}
