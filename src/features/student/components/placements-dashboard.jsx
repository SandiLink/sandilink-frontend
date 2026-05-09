"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PLACEMENTS = [
  {
    id: "pl-001",
    preceptor: "Dr. Robert Williams",
    initials: "RW",
    specialty: "Family Medicine",
    location: "City Health Clinic",
    startDate: "Jan 15, 2026",
    endDate: "May 15, 2026",
    hoursCompleted: 320,
    hoursRequired: 640,
    status: "active",
  },
  {
    id: "pl-002",
    preceptor: "Dr. Maria Garcia",
    initials: "MG",
    specialty: "Pediatrics",
    location: "Children's Hospital",
    requestDate: "Mar 28, 2026",
    status: "pending",
  },
  {
    id: "pl-003",
    preceptor: "Dr. Kevin Park",
    initials: "KP",
    specialty: "Emergency Medicine",
    location: "Metro General ER",
    requestDate: "Mar 30, 2026",
    status: "pending",
  },
  {
    id: "pl-004",
    preceptor: "Dr. Anna Chen",
    initials: "AC",
    specialty: "OB/GYN",
    location: "Women's Health Clinic",
    requestDate: "Mar 25, 2026",
    status: "declined",
    declineReason: "No available slots for the requested period",
  },
  {
    id: "pl-005",
    preceptor: "Dr. Lisa Park",
    initials: "LP",
    specialty: "Dermatology",
    location: "Skin Care Associates",
    startDate: "Sep 1, 2025",
    endDate: "Dec 15, 2025",
    hoursCompleted: 280,
    hoursRequired: 280,
    status: "completed",
  },
];

const statusConfig = {
  active: { label: "Active", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  declined: { label: "Declined", variant: "destructive" },
  completed: { label: "Completed", variant: "outline" },
};

function PlacementCard({ placement }) {
  const s = statusConfig[placement.status];
  const isActive = placement.status === "active";
  const isPending = placement.status === "pending";
  const pct = placement.hoursRequired
    ? Math.round((placement.hoursCompleted / placement.hoursRequired) * 100)
    : 0;

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {placement.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/student/placements/${placement.id}`}
                  className="text-sm font-medium hover:text-primary hover:underline"
                >
                  {placement.preceptor}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {placement.specialty}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant={s.variant}>{s.label}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/student/placements/${placement.id}`}>
                        <Eye className="size-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    {isActive && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/student/placements/${placement.id}/progress`}
                        >
                          Track progress
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isActive && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/student/placements/${placement.id}/documents`}
                        >
                          Upload documents
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isPending && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <X className="size-4" />
                          Withdraw request
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {placement.location}
              </span>
              {placement.startDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {placement.startDate} — {placement.endDate}
                </span>
              )}
              {placement.requestDate && (
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  Requested {placement.requestDate}
                </span>
              )}
            </div>

            {(isActive || placement.status === "completed") && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Clinical hours</span>
                  <span className="font-medium">
                    {placement.hoursCompleted}/{placement.hoursRequired} hrs (
                    {pct}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}

            {placement.status === "declined" && placement.declineReason && (
              <p className="text-xs text-destructive">
                Reason: {placement.declineReason}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PlacementsDashboard() {
  const active = PLACEMENTS.filter((p) => p.status === "active");
  const pending = PLACEMENTS.filter((p) => p.status === "pending");
  const past = PLACEMENTS.filter(
    (p) => p.status === "completed" || p.status === "declined",
  );
  const tabs = [
    {
      value: "active",
      label: `Active (${active.length})`,
      content: (
        <div className="grid gap-3">
          {active.map((p) => (
            <PlacementCard key={p.id} placement={p} />
          ))}
        </div>
      ),
    },
    {
      value: "pending",
      label: `Pending (${pending.length})`,
      content: (
        <div className="grid gap-3">
          {pending.map((p) => (
            <PlacementCard key={p.id} placement={p} />
          ))}
        </div>
      ),
    },
    {
      value: "past",
      label: `Past (${past.length})`,
      content: (
        <div className="grid gap-3">
          {past.map((p) => (
            <PlacementCard key={p.id} placement={p} />
          ))}
        </div>
      ),
    },
  ];
  return (
    <TabsComponent tabs={tabs} defaultValue="active" namespace="placements" />
  );
}
