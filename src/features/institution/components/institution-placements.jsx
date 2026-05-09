"use client";

import Link from "next/link";
import { CalendarDays, Eye, MapPin, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PLACEMENTS = [
  {
    id: "ip-001",
    student: "Jane Smith",
    sInitials: "JS",
    preceptor: "Dr. Williams",
    specialty: "Family Medicine",
    location: "City Health Clinic",
    start: "Jan 15",
    end: "May 15",
    hours: "320/640",
    status: "active",
  },
  {
    id: "ip-002",
    student: "Sara Kim",
    sInitials: "SK",
    preceptor: "Dr. Park",
    specialty: "Emergency Medicine",
    location: "Metro General ER",
    start: "Feb 1",
    end: "Jun 1",
    hours: "180/480",
    status: "active",
  },
  {
    id: "ip-003",
    student: "Tom Lee",
    sInitials: "TL",
    preceptor: "Dr. Garcia",
    specialty: "Pediatrics",
    location: "Children's Hospital",
    start: null,
    end: null,
    hours: null,
    status: "pending",
  },
  {
    id: "ip-004",
    student: "Mike Brown",
    sInitials: "MB",
    preceptor: "Dr. Chen",
    specialty: "Internal Medicine",
    location: "University Medical Center",
    start: null,
    end: null,
    hours: null,
    status: "pending",
  },
  {
    id: "ip-005",
    student: "Priya Patel",
    sInitials: "PP",
    preceptor: "Dr. Thompson",
    specialty: "Internal Medicine",
    location: "University Medical Center",
    start: "Sep 1",
    end: "Dec 15",
    hours: "480/480",
    status: "completed",
  },
];

const statusConfig = {
  active: { label: "Active", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
};

function PlacementCard({ placement }) {
  const s = statusConfig[placement.status];
  const pct = placement.hours
    ? Math.round(
        (Number.parseInt(placement.hours) /
          Number.parseInt(placement.hours.split("/")[1])) *
          100,
      )
    : 0;

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {placement.sInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{placement.student}</p>
                <p className="text-xs text-muted-foreground">
                  {placement.preceptor} — {placement.specialty}
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
                      <Link href={`/institution/placements/${placement.id}`}>
                        <Eye className="size-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Message preceptor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {placement.location}
              </span>
              {placement.start && (
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {placement.start} — {placement.end}
                </span>
              )}
            </div>
            {placement.hours && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Hours</span>
                  <span className="font-medium">{placement.hours}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function InstitutionPlacements() {
  const active = PLACEMENTS.filter((p) => p.status === "active");
  const pending = PLACEMENTS.filter((p) => p.status === "pending");
  const completed = PLACEMENTS.filter((p) => p.status === "completed");
  const tabs = [
    {
      value: "active",
      label: `Active (${active.length})`,
      content: (
        <div className="mt-4 grid gap-3">
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
        <div className="mt-4 grid gap-3">
          {pending.map((p) => (
            <PlacementCard key={p.id} placement={p} />
          ))}
        </div>
      ),
    },
    {
      value: "completed",
      label: `Completed (${completed.length})`,
      content: (
        <div className="mt-4 grid gap-3">
          {completed.map((p) => (
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
