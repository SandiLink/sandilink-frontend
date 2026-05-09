"use client";

import { CalendarDays, Check, Clock, GraduationCap, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsComponent } from "@/components/shared/TabsComponent";

const REQUESTS = [
  {
    id: "r1",
    student: "Emily Davis",
    initials: "ED",
    program: "BSN — 1st Year",
    institution: "State University",
    email: "edavis@uni.edu",
    requestDate: "Apr 1, 2026",
    startDate: "Apr 15, 2026",
    duration: "8 weeks",
    hours: "24-32/week",
    message:
      "I'm a first-year nursing student passionate about family medicine. I'd love the opportunity to learn from your clinic's diverse patient population.",
    status: "pending",
  },
  {
    id: "r2",
    student: "Alex Wong",
    initials: "AW",
    program: "BSN — 3rd Year",
    institution: "State University",
    email: "awong@uni.edu",
    requestDate: "Apr 2, 2026",
    startDate: "May 1, 2026",
    duration: "12 weeks",
    hours: "32-40/week",
    message:
      "Third-year student with strong interest in chronic disease management. Previous rotation in internal medicine.",
    status: "pending",
  },
  {
    id: "r3",
    student: "Chris Taylor",
    initials: "CT",
    program: "PA — 2nd Year",
    institution: "Medical College",
    email: "ctaylor@mc.edu",
    requestDate: "Apr 3, 2026",
    startDate: "Apr 20, 2026",
    duration: "6 weeks",
    hours: "24-32/week",
    message:
      "PA student looking for primary care exposure. Very interested in preventive medicine and patient education.",
    status: "pending",
  },
  {
    id: "r4",
    student: "Priya Patel",
    initials: "PP",
    program: "MSN — 2nd Year",
    institution: "State University",
    email: "ppatel@uni.edu",
    requestDate: "Mar 15, 2026",
    startDate: "Sep 1, 2025",
    duration: "16 weeks",
    hours: "32-40/week",
    message: "",
    status: "accepted",
  },
  {
    id: "r5",
    student: "David Kim",
    initials: "DK",
    program: "BSN — 4th Year",
    institution: "City College",
    email: "dkim@cc.edu",
    requestDate: "Mar 10, 2026",
    startDate: null,
    duration: null,
    hours: null,
    message: "",
    status: "declined",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" },
  accepted: { label: "Accepted", variant: "default" },
  declined: { label: "Declined", variant: "destructive" },
};

function RequestCard({ request }) {
  const s = statusConfig[request.status];
  const isPending = request.status === "pending";

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {request.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{request.student}</p>
                <p className="text-xs text-muted-foreground">
                  {request.program} — {request.institution}
                </p>
              </div>
            </div>
            <Badge variant={s.variant}>{s.label}</Badge>
          </div>

          {isPending && (
            <>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  Start: {request.startDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {request.duration} — {request.hours}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-3" />
                  Sent {request.requestDate}
                </span>
              </div>
              {request.message && (
                <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground italic">
                  "{request.message}"
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Check className="size-3.5" data-icon="inline-start" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <X className="size-3.5" data-icon="inline-start" />
                  Decline
                </Button>
                <Button size="sm" variant="ghost">
                  View profile
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function PlacementRequests() {
  const pending = REQUESTS.filter((r) => r.status === "pending");
  const responded = REQUESTS.filter((r) => r.status !== "pending");
  const tabs = [
    {
      value: "pending",
      label: `Pending (${pending.length})`,
      content: (
        <div className="grid gap-3">
          {pending.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      ),
    },
    {
      value: "responded",
      label: `Responded (${responded.length})`,
      content: (
        <div className="grid gap-3">
          {responded.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      ),
    },
  ];
  return (
    <TabsComponent tabs={tabs} defaultValue="pending" namespace="requests" />
  );
}
