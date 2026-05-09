"use client";

import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  Eye,
  FileText,
  MapPin,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
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

const STUDENTS = [
  {
    id: "jane-smith",
    name: "Jane Smith",
    initials: "JS",
    program: "BSN — 3rd Year",
    institution: "State University",
    location: "New York, NY",
    start: "Jan 15, 2026",
    end: "May 15, 2026",
    hours: 320,
    required: 640,
    status: "active",
    lastActive: "Today",
    verified: true,
  },
  {
    id: "sara-kim",
    name: "Sara Kim",
    initials: "SK",
    program: "MSN — 2nd Year",
    institution: "State University",
    location: "New York, NY",
    start: "Feb 1, 2026",
    end: "Jun 1, 2026",
    hours: 180,
    required: 480,
    status: "active",
    lastActive: "Yesterday",
    verified: true,
  },
  {
    id: "tom-lee",
    name: "Tom Lee",
    initials: "TL",
    program: "BSN — 3rd Year",
    institution: "City College",
    location: "Brooklyn, NY",
    start: "Mar 1, 2026",
    end: "Jun 30, 2026",
    hours: 90,
    required: 320,
    status: "active",
    lastActive: "2 days ago",
    verified: true,
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    initials: "PP",
    program: "MSN — 2nd Year",
    institution: "State University",
    location: "New York, NY",
    start: "Sep 1, 2025",
    end: "Dec 15, 2025",
    hours: 480,
    required: 480,
    status: "completed",
    lastActive: "Dec 15, 2025",
    verified: true,
  },
];

function StudentCard({ student }) {
  const pct = Math.round((student.hours / student.required) * 100);
  const isActive = student.status === "active";

  return (
    <Card className="transition-colors hover:bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="mt-0.5">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {student.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/preceptor/students/${student.id}`}
                    className="text-sm font-medium hover:text-primary hover:underline"
                  >
                    {student.name}
                  </Link>
                  {student.verified && (
                    <BadgeCheck className="size-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {student.program} — {student.institution}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant={isActive ? "default" : "outline"}>
                  {isActive ? "Active" : "Completed"}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs">
                      <MoreHorizontal className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/preceptor/students/${student.id}`}>
                        <Eye className="size-4" />
                        View details
                      </Link>
                    </DropdownMenuItem>
                    {isActive && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/preceptor/students/${student.id}/progress`}
                          >
                            <ClipboardList className="size-4" />
                            Track progress
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/preceptor/students/${student.id}/evaluate`}
                          >
                            <FileText className="size-4" />
                            Evaluate
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/preceptor/messages/${student.id}`}>
                            <MessageSquare className="size-4" />
                            Message
                          </Link>
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
                {student.location}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="size-3" />
                {student.start} — {student.end}
              </span>
              <span>Last active: {student.lastActive}</span>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Hours</span>
                <span className="font-medium">
                  {student.hours}/{student.required} ({pct}%)
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            {isActive && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  asChild
                >
                  <Link href={`/preceptor/students/${student.id}/progress`}>
                    Review hours
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  asChild
                >
                  <Link href={`/preceptor/students/${student.id}/evaluate`}>
                    Evaluate
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActiveStudents() {
  const active = STUDENTS.filter((s) => s.status === "active");
  const completed = STUDENTS.filter((s) => s.status === "completed");
  const tabs = [
    {
      value: "active",
      label: `Active (${active.length})`,
      content: (
        <div className="grid gap-3">
          {active.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      ),
    },
    {
      value: "completed",
      label: `Completed (${completed.length})`,
      content: (
        <div className="grid gap-3">
          {completed.map((s) => (
            <StudentCard key={s.id} student={s} />
          ))}
        </div>
      ),
    },
  ];
  return (
    <TabsComponent tabs={tabs} defaultValue="active" namespace="students" />
  );
}
