"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building,
  CalendarDays,
  Check,
  Clock,
  Eye,
  FileText,
  MoreHorizontal,
  PenTool,
  Video,
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
import { ScrollableButtonGroup } from "@/components/shared/ScrollableButtonGroup";
import { TabsComponent } from "@/components/shared/TabsComponent";

const WORK_ITEMS = [
  // Appointments
  {
    id: "pb-001",
    client: "Emma Garcia",
    initials: "EG",
    date: "Apr 3, 2026",
    time: "10:00 AM",
    delivery: "Virtual",
    status: "pending",
    reason: "Annual check-up",
    type: "appointment",
  },
  {
    id: "pb-002",
    client: "Frank Brown",
    initials: "FB",
    date: "Apr 4, 2026",
    time: "2:30 PM",
    delivery: "In-person",
    status: "pending",
    reason: "New health issue",
    type: "appointment",
  },
  {
    id: "pb-003",
    client: "Grace Kim",
    initials: "GK",
    date: "Apr 5, 2026",
    time: "9:00 AM",
    delivery: "Virtual",
    status: "pending",
    reason: "Follow-up",
    type: "appointment",
  },
  {
    id: "pb-004",
    client: "Henry Liu",
    initials: "HL",
    date: "Apr 6, 2026",
    time: "11:00 AM",
    delivery: "In-person",
    status: "pending",
    reason: "Consultation",
    type: "appointment",
  },
  {
    id: "pb-005",
    client: "John Doe",
    initials: "JD",
    date: "Apr 1, 2026",
    time: "9:00 AM",
    delivery: "Virtual",
    status: "confirmed",
    reason: "Check-up",
    type: "appointment",
  },
  {
    id: "pb-006",
    client: "Alice Martin",
    initials: "AM",
    date: "Apr 1, 2026",
    time: "10:00 AM",
    delivery: "In-person",
    status: "confirmed",
    reason: "Follow-up",
    type: "appointment",
  },
  // Projects (for providers who also consult)
  {
    id: "pj-001",
    client: "Dr. Helen Park",
    initials: "HP",
    date: "May 1, 2026",
    time: null,
    delivery: "Project-based",
    status: "confirmed",
    reason: "Clinical review for PCORI proposal",
    type: "project",
    progress: 40,
  },
  // Past
  {
    id: "pb-007",
    client: "Bob Williams",
    initials: "BW",
    date: "Mar 28, 2026",
    time: "11:00 AM",
    delivery: "Virtual",
    status: "completed",
    reason: "New patient",
    type: "appointment",
  },
  {
    id: "pb-008",
    client: "Carol Taylor",
    initials: "CT",
    date: "Mar 25, 2026",
    time: "2:00 PM",
    delivery: "In-person",
    status: "completed",
    reason: "Consultation",
    type: "appointment",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" },
  confirmed: { label: "Confirmed", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  declined: { label: "Declined", variant: "destructive" },
};

const typeIcons = { appointment: CalendarDays, project: Briefcase };

function WorkCard({ item }) {
  const status = statusConfig[item.status];
  const isPending = item.status === "pending";
  const isCompleted = item.status === "completed";
  const isProject = item.type === "project";
  const TypeIcon = typeIcons[item.type];

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {item.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/provider/work/${item.id}`}
                  className="text-sm font-medium hover:text-primary hover:underline"
                >
                  {item.client}
                </Link>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
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
                      <Link href={`/provider/work/${item.id}`}>
                        <Eye className="size-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    {isPending && (
                      <>
                        <DropdownMenuItem>
                          <Check className="size-4" />
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <X className="size-4" />
                          Decline
                        </DropdownMenuItem>
                      </>
                    )}
                    {isCompleted && (
                      <DropdownMenuItem>
                        <FileText className="size-4" />
                        Write summary
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3" />
                {isProject ? `Deadline: ${item.date}` : item.date}
              </span>
              {item.time && (
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {item.time}
                </span>
              )}
              <span className="flex items-center gap-1">
                {item.delivery === "Virtual" ? (
                  <Video className="size-3" />
                ) : item.delivery === "In-person" ? (
                  <Building className="size-3" />
                ) : (
                  <PenTool className="size-3" />
                )}
                {item.delivery}
              </span>
            </div>
            {isProject && item.progress > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{item.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}
            {isPending && (
              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs">
                  <Check className="size-3" data-icon="inline-start" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <X className="size-3" data-icon="inline-start" />
                  Decline
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  asChild
                >
                  <Link href={`/provider/work/${item.id}`}>View intake</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProviderBookings() {
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = WORK_ITEMS.filter(
    (w) => typeFilter === "all" || w.type === typeFilter,
  );
  const pending = filtered.filter((b) => b.status === "pending");
  const confirmed = filtered.filter((b) => b.status === "confirmed");
  const past = filtered.filter(
    (b) => b.status === "completed" || b.status === "declined",
  );
  const typeItems = [
    { id: "all", label: "All Work", icon: Briefcase },
    { id: "appointment", label: "Appointments", icon: CalendarDays },
    { id: "project", label: "Projects", icon: PenTool },
  ];
  const tabs = [
    {
      value: "pending",
      label: `Pending (${pending.length})`,
      content: (
        <div>
          <div className="grid gap-3">
            {pending.map((b) => (
              <WorkCard key={b.id} item={b} />
            ))}
          </div>

          {pending.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No pending items.
            </p>
          )}
        </div>
      ),
    },
    {
      value: "confirmed",
      label: `Confirmed (${confirmed.length})`,
      content: (
        <div>
          <div className="grid gap-3">
            {confirmed.map((b) => (
              <WorkCard key={b.id} item={b} />
            ))}
          </div>

          {confirmed.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No confirmed items.
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
            {past.map((b) => (
              <WorkCard key={b.id} item={b} />
            ))}
          </div>

          {past.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No past items.
            </p>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="grid gap-4">
      <ScrollableButtonGroup
        items={typeItems}
        activeValue={typeFilter}
        onChange={setTypeFilter}
      />
      <TabsComponent tabs={tabs} defaultValue="pending" namespace="work" />
    </div>
  );
}
