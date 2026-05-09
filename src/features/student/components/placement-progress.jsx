"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Loader2, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const LOGS = [
  { id: "1", date: "Mar 31, 2026", hours: 8, activity: "Patient assessments & care plans", supervisor: "Dr. Williams", status: "approved" },
  { id: "2", date: "Mar 28, 2026", hours: 8, activity: "Chronic disease management clinic", supervisor: "Dr. Williams", status: "approved" },
  { id: "3", date: "Mar 27, 2026", hours: 6, activity: "Pediatric well-child visits", supervisor: "Dr. Williams", status: "approved" },
  { id: "4", date: "Mar 26, 2026", hours: 8, activity: "Patient intake and assessments", supervisor: "Dr. Williams", status: "approved" },
  { id: "5", date: "Mar 25, 2026", hours: 4, activity: "EMR documentation training", supervisor: "Dr. Williams", status: "pending" },
];

const WEEKLY = [
  { week: "Mar 24 — 30", hours: 34, target: 32 },
  { week: "Mar 17 — 23", hours: 32, target: 32 },
  { week: "Mar 10 — 16", hours: 28, target: 32 },
  { week: "Mar 3 — 9", hours: 36, target: 32 },
];

export function PlacementProgress({ placementId }) {
  const [isLogging, setIsLogging] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/student/placements/${placementId}`}><ArrowLeft className="size-4" data-icon="inline-start" />Back to placement</Link>
      </Button>

      <div className="grid gap-6">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card size="sm"><CardContent className="pt-4 text-center">
            <p className="text-2xl font-semibold font-heading">320</p>
            <p className="text-sm text-muted-foreground">Hours completed</p>
          </CardContent></Card>
          <Card size="sm"><CardContent className="pt-4 text-center">
            <p className="text-2xl font-semibold font-heading">320</p>
            <p className="text-sm text-muted-foreground">Hours remaining</p>
          </CardContent></Card>
          <Card size="sm"><CardContent className="pt-4 text-center">
            <p className="text-2xl font-semibold font-heading">~10</p>
            <p className="text-sm text-muted-foreground">Weeks to go</p>
          </CardContent></Card>
        </div>

        {/* Weekly breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>Hours logged per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {WEEKLY.map((w) => (
                <div key={w.week} className="flex items-center gap-3 rounded-lg border p-3">
                  <span className="w-32 text-sm text-muted-foreground">{w.week}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min((w.hours / w.target) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${w.hours >= w.target ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                    {w.hours}/{w.target} hrs
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Log form */}
        <Card>
          <CardHeader>
            <CardTitle>Log Hours</CardTitle>
            <CardDescription>Record your clinical hours for preceptor approval</CardDescription>
            <CardAction>{!showForm && <Button size="sm" onClick={() => setShowForm(true)}><Plus className="size-3.5" data-icon="inline-start" />New entry</Button>}</CardAction>
          </CardHeader>
          {showForm && (
            <CardContent>
              <form onSubmit={async (e) => { e.preventDefault(); setIsLogging(true); await new Promise(r => setTimeout(r, 1000)); setIsLogging(false); setShowForm(false); }} className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5"><Label>Date</Label><Input type="date" required className="h-10" /></div>
                  <div className="grid gap-1.5"><Label>Hours</Label><Input type="number" min="0.5" max="16" step="0.5" placeholder="8" required className="h-10" /></div>
                </div>
                <div className="grid gap-1.5"><Label>Activity description</Label><Textarea placeholder="Describe what you did during this session..." rows={3} required /></div>
                <div className="grid gap-1.5">
                  <Label>Supervising preceptor</Label>
                  <Select defaultValue="dr-williams"><SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dr-williams">Dr. Robert Williams</SelectItem></SelectContent></Select>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLogging}>{isLogging ? <><Loader2 className="size-4 animate-spin" />Logging...</> : "Log hours"}</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Hour log history */}
        <Card>
          <CardHeader><CardTitle>Hour Log</CardTitle><CardDescription>All recorded clinical hours</CardDescription></CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {LOGS.map((log) => (
                <div key={log.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="w-24 shrink-0">
                    <p className="text-sm font-medium">{log.date}</p>
                    <p className="text-xs text-muted-foreground">{log.hours} hours</p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex-1">
                    <p className="text-sm">{log.activity}</p>
                    <p className="text-xs text-muted-foreground">Supervisor: {log.supervisor}</p>
                  </div>
                  <Badge variant={log.status === "approved" ? "outline" : "secondary"} className={`text-xs ${log.status === "approved" ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                    {log.status === "approved" ? "Approved" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
