"use client";

import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LOGS = [
  { id: "1", date: "Mar 31, 2026", hours: 8, activity: "Patient assessments & care plans", status: "approved" },
  { id: "2", date: "Mar 28, 2026", hours: 8, activity: "Chronic disease management clinic", status: "approved" },
  { id: "3", date: "Mar 27, 2026", hours: 6, activity: "Pediatric well-child visits", status: "approved" },
  { id: "4", date: "Mar 26, 2026", hours: 8, activity: "Patient intake and assessments", status: "pending" },
  { id: "5", date: "Mar 25, 2026", hours: 4, activity: "EMR documentation training", status: "pending" },
];

export function StudentProgressReview({ studentId }) {
  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild><Link href={`/preceptor/students/${studentId}`}><ArrowLeft className="size-4" data-icon="inline-start" />Back to student</Link></Button>

      <div className="grid gap-6">
        <div><h2 className="font-heading text-xl font-semibold tracking-tight">Progress Tracking — Jane Smith</h2><p className="text-sm text-muted-foreground">Review and approve student hour logs.</p></div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card size="sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-semibold font-heading">320</p><p className="text-sm text-muted-foreground">Hours approved</p></CardContent></Card>
          <Card size="sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-semibold font-heading text-amber-600 dark:text-amber-400">12</p><p className="text-sm text-muted-foreground">Hours pending</p></CardContent></Card>
          <Card size="sm"><CardContent className="pt-4 text-center"><p className="text-2xl font-semibold font-heading">50%</p><p className="text-sm text-muted-foreground">Overall progress</p></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Hour Logs</CardTitle><CardDescription>Approve or reject student-submitted hours</CardDescription></CardHeader>
          <CardContent><div className="grid gap-2">
            {LOGS.map((log) => {
              const isPending = log.status === "pending";
              return (
                <div key={log.id} className={`flex items-center gap-3 rounded-lg border p-3 ${isPending ? "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30" : ""}`}>
                  <div className="w-24 shrink-0"><p className="text-sm font-medium">{log.date}</p><p className="text-xs text-muted-foreground">{log.hours} hours</p></div>
                  <div className="h-8 w-px bg-border" />
                  <div className="flex-1"><p className="text-sm">{log.activity}</p></div>
                  {isPending ? (
                    <div className="flex gap-1.5">
                      <Button size="sm" className="h-7 text-xs"><Check className="size-3" data-icon="inline-start" />Approve</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs"><X className="size-3" data-icon="inline-start" />Reject</Button>
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">Approved</Badge>
                  )}
                </div>
              );
            })}
          </div></CardContent>
        </Card>
      </div>
    </div>
  );
}
