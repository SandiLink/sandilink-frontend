"use client";

import { Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";

const REPORTS = [
  {
    student: "Jane Smith",
    initials: "JS",
    program: "BSN",
    preceptor: "Dr. Williams",
    specialty: "Family Medicine",
    hours: 320,
    required: 640,
    evaluation: "Excellent",
    onTrack: true,
  },
  {
    student: "Sara Kim",
    initials: "SK",
    program: "MSN",
    preceptor: "Dr. Park",
    specialty: "Emergency Medicine",
    hours: 180,
    required: 480,
    evaluation: "Good",
    onTrack: true,
  },
  {
    student: "Tom Lee",
    initials: "TL",
    program: "BSN",
    preceptor: "Dr. Garcia",
    specialty: "Pediatrics",
    hours: 0,
    required: 640,
    evaluation: "Pending",
    onTrack: null,
  },
  {
    student: "Mike Brown",
    initials: "MB",
    program: "BSN",
    preceptor: "Dr. Chen",
    specialty: "Internal Medicine",
    hours: 0,
    required: 480,
    evaluation: "Pending",
    onTrack: null,
  },
  {
    student: "Priya Patel",
    initials: "PP",
    program: "MSN",
    preceptor: "Dr. Thompson",
    specialty: "Internal Medicine",
    hours: 480,
    required: 480,
    evaluation: "Excellent",
    onTrack: true,
  },
];

export function StudentReports() {
  const reportColumns = [
    {
      header: "Student",
      accessorKey: "student",
      cell: (r) => (
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {r.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{r.student}</span>
        </div>
      ),
    },
    {
      header: "Program",
      accessorKey: "program",
      cellClassName: "text-sm",
    },
    {
      header: "Preceptor",
      accessorKey: "preceptor",
      cellClassName: "text-sm text-muted-foreground",
    },
    {
      header: "Hours",
      accessorKey: "hours",
      cell: (r) => (
        <span className="text-sm">
          {r.hours}/{r.required}
        </span>
      ),
    },
    {
      header: "Progress",
      accessorKey: "progress",
      cell: (r) => {
        const pct = r.required ? Math.round((r.hours / r.required) * 100) : 0;

        return (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{pct}%</span>
          </div>
        );
      },
    },
    {
      header: "Evaluation",
      accessorKey: "evaluation",
      cell: (r) => (
        <Badge
          variant={r.evaluation === "Pending" ? "secondary" : "outline"}
          className="text-xs"
        >
          {r.evaluation}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (r) => {
        if (r.onTrack === true)
          return (
            <Badge
              variant="outline"
              className="text-xs text-emerald-600 dark:text-emerald-400"
            >
              On track
            </Badge>
          );
        else if (r.onTrack === false)
          return (
            <Badge
              variant="outline"
              className="text-xs text-rose-600 dark:text-rose-400"
            >
              Behind
            </Badge>
          );
        else if (r.onTrack === null)
          return (
            <Badge variant="outline" className="text-xs">
              Pending
            </Badge>
          );
      },
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Select defaultValue="all">
          <SelectTrigger className="h-9 w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All programs</SelectItem>
            <SelectItem value="bsn">BSN</SelectItem>
            <SelectItem value="msn">MSN</SelectItem>
            <SelectItem value="dnp">DNP</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Download className="size-3.5" data-icon="inline-start" />
          Export report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>
            Hours completed and evaluation status for all students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={reportColumns}
            data={REPORTS}
            emptyMessage="No reports found."
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
