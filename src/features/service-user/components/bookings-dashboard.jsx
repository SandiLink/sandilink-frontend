"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building,
  CalendarDays,
  Clock,
  Eye,
  MoreHorizontal,
  PenTool,
  Star,
  Video,
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
import { ScrollableButtonGroup } from "@/components/shared/ScrollableButtonGroup";

const ENGAGEMENTS = [
  // Appointments
  {
    id: "bk-001",
    expert: "Dr. Sarah Johnson",
    specialty: "General Practice",
    initials: "SJ",
    date: "Apr 2, 2026",
    time: "10:00 AM",
    delivery: "Virtual",
    status: "upcoming",
    price: 120,
    type: "appointment",
  },
  {
    id: "bk-002",
    expert: "Dr. Michael Chen",
    specialty: "Physical Therapy",
    initials: "MC",
    date: "Apr 5, 2026",
    time: "2:30 PM",
    delivery: "In-person",
    status: "upcoming",
    price: 150,
    type: "appointment",
  },
  {
    id: "bk-003",
    expert: "Dr. Emily Davis",
    specialty: "Mental Health",
    initials: "ED",
    date: "Apr 8, 2026",
    time: "11:00 AM",
    delivery: "Virtual",
    status: "pending",
    price: 100,
    type: "appointment",
  },
  {
    id: "bk-004",
    expert: "Dr. Sarah Johnson",
    specialty: "General Practice",
    initials: "SJ",
    date: "Mar 28, 2026",
    time: "9:00 AM",
    delivery: "Virtual",
    status: "completed",
    price: 120,
    type: "appointment",
    rated: true,
  },
  // Projects
  {
    id: "pr-001",
    expert: "Dr. Lisa Nguyen",
    specialty: "Grant Writing — NIH R21",
    initials: "LN",
    date: "Apr 15, 2026",
    time: null,
    delivery: "Project-based",
    status: "in-progress",
    price: 5000,
    type: "project",
    progress: 60,
  },
  {
    id: "pr-002",
    expert: "Dr. Amira Rashid",
    specialty: "Research Collaboration — AI Diagnostics",
    initials: "AR",
    date: "Jun 30, 2026",
    time: null,
    delivery: "Virtual",
    status: "pending",
    price: 0,
    type: "project",
  },
  {
    id: "bk-005",
    expert: "Dr. James Wilson",
    specialty: "Cardiology",
    initials: "JW",
    date: "Mar 20, 2026",
    time: "3:00 PM",
    delivery: "In-person",
    status: "completed",
    price: 200,
    type: "appointment",
    rated: false,
  },
  {
    id: "bk-006",
    expert: "Dr. Lisa Park",
    specialty: "Dermatology",
    initials: "LP",
    date: "Mar 15, 2026",
    time: "10:30 AM",
    delivery: "Virtual",
    status: "cancelled",
    price: 175,
    type: "appointment",
  },
];

const statusConfig = {
  upcoming: { label: "Upcoming", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  "in-progress": { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const typeIcons = {
  appointment: CalendarDays,
  project: Briefcase,
};

function EngagementCard({ engagement }) {
  const status = statusConfig[engagement.status];
  const isVirtual = engagement.delivery === "Virtual";
  const isUpcoming = engagement.status === "upcoming";
  const isCompleted = engagement.status === "completed";
  const isProject = engagement.type === "project";
  const TypeIcon = typeIcons[engagement.type];

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {engagement.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/dashboard/engagements/${engagement.id}`}
                  className="text-sm font-medium hover:text-primary hover:underline"
                >
                  {engagement.expert}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {engagement.specialty}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="outline" className="text-[10px] gap-1">
                  <TypeIcon className="size-2.5" />
                  {isProject ? "Project" : "Appointment"}
                </Badge>
                <Badge variant={status.variant}>{status.label}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/engagements/${engagement.id}`}>
                        <Eye className="size-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    {isUpcoming && (
                      <>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Cancel
                        </DropdownMenuItem>
                      </>
                    )}
                    {isCompleted && !engagement.rated && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/engagements/${engagement.id}/review`}
                        >
                          <Star className="size-4" />
                          Leave a review
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isCompleted && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/engagements/${engagement.id}/summary`}
                        >
                          View summary
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3" />
                {isProject ? `Deadline: ${engagement.date}` : engagement.date}
              </span>
              {engagement.time && (
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {engagement.time}
                </span>
              )}
              <span className="flex items-center gap-1">
                {engagement.delivery === "Virtual" ? (
                  <Video className="size-3" />
                ) : engagement.delivery === "In-person" ? (
                  <Building className="size-3" />
                ) : (
                  <PenTool className="size-3" />
                )}
                {engagement.delivery}
              </span>
              {engagement.price > 0 && (
                <span className="font-medium text-foreground">
                  ${engagement.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Project progress */}
            {isProject && engagement.progress > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{engagement.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${engagement.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action row */}
            {isUpcoming && isVirtual && (
              <Button size="sm" className="h-7 text-xs">
                <Video className="size-3" data-icon="inline-start" />
                Join session
              </Button>
            )}
            {isCompleted && !engagement.rated && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                asChild
              >
                <Link href={`/dashboard/engagements/${engagement.id}/review`}>
                  <Star className="size-3" data-icon="inline-start" />
                  Leave a review
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BookingsDashboard() {
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = ENGAGEMENTS.filter((e) => {
    const matchesType = typeFilter === "all" || e.type === typeFilter;
    return matchesType;
  });

  const upcoming = filtered.filter((e) =>
    ["upcoming", "pending", "in-progress"].includes(e.status),
  );
  const past = filtered.filter((e) =>
    ["completed", "cancelled"].includes(e.status),
  );
  const tabs = [
    {
      value: "upcoming",
      label: `Active (${upcoming.length})`,
      content: (
        <div>
          <div className="grid gap-3">
            {upcoming.map((e) => (
              <EngagementCard key={e.id} engagement={e} />
            ))}
          </div>

          {upcoming.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No active engagements.
            </p>
          )}
        </div>
      ),
    },
    {
      value: "past",
      label: `Past (${past.length})`,
      content: (
        <div>
          <div className="grid gap-3">
            {past.map((e) => (
              <EngagementCard key={e.id} engagement={e} />
            ))}
          </div>

          {past.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No past engagements.
            </p>
          )}
        </div>
      ),
    },
    {
      value: "all",
      label: `All (${filtered.length})`,
      content: (
        <div>
          <div className="grid gap-3">
            {filtered.map((e) => (
              <EngagementCard key={e.id} engagement={e} />
            ))}
          </div>
        </div>
      ),
    },
  ];
  const typesItems = [
    { id: "all", label: "All Engagements", icon: Briefcase },
    { id: "appointment", label: "Appointments", icon: CalendarDays },
    { id: "project", label: "Projects", icon: PenTool },
  ];
  return (
    <div className="grid gap-4">
      <ScrollableButtonGroup
        items={typesItems}
        activeValue={typeFilter}
        onChange={setTypeFilter}
      />
      <TabsComponent
        tabs={tabs}
        defaultValue="upcoming"
        namespace="engagements"
      />
    </div>
  );
}
