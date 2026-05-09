"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
  UserPlus,
} from "lucide-react";
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

const STUDENTS = [
  { id: "s1", name: "Jane Smith", initials: "JS", email: "jsmith@uni.edu", phone: "+1 (555) 010-2010", program: "BSN", year: "3rd", placement: "Dr. Williams — Family Medicine", status: "placed", advisor: "Dr. Patricia Adams", gpa: "3.78", joinedYear: 2023 },
  { id: "s2", name: "Tom Lee", initials: "TL", email: "tlee@uni.edu", phone: "+1 (555) 010-2011", program: "BSN", year: "3rd", placement: "Pending — Dr. Garcia", status: "pending", advisor: "Dr. Patricia Adams", gpa: "3.62", joinedYear: 2023 },
  { id: "s3", name: "Sara Kim", initials: "SK", email: "skim@uni.edu", phone: "+1 (555) 010-2012", program: "MSN", year: "2nd", placement: "Dr. Park — ER", status: "placed", advisor: "John Rivera", gpa: "3.91", joinedYear: 2024 },
  { id: "s4", name: "Mike Brown", initials: "MB", email: "mbrown@uni.edu", phone: "+1 (555) 010-2013", program: "BSN", year: "4th", placement: "Pending — Dr. Chen", status: "pending", advisor: "Dr. Patricia Adams", gpa: "3.45", joinedYear: 2022 },
  { id: "s5", name: "Emily Davis", initials: "ED", email: "edavis@uni.edu", phone: "+1 (555) 010-2014", program: "DNP", year: "1st", placement: "Not assigned", status: "unplaced", advisor: "John Rivera", gpa: "—", joinedYear: 2025 },
  { id: "s6", name: "Alex Wong", initials: "AW", email: "awong@uni.edu", phone: "+1 (555) 010-2015", program: "BSN", year: "3rd", placement: "Not assigned", status: "unplaced", advisor: "Dr. Patricia Adams", gpa: "3.55", joinedYear: 2023 },
  { id: "s7", name: "Priya Patel", initials: "PP", email: "ppatel@uni.edu", phone: "+1 (555) 010-2016", program: "MSN", year: "2nd", placement: "Pending — Dr. Mitchell", status: "pending", advisor: "John Rivera", gpa: "3.84", joinedYear: 2024 },
];

const PLACEMENT_HISTORY = {
  s1: [
    { id: "ph-1", preceptor: "Dr. Robert Williams", site: "City Health Clinic", specialty: "Family Medicine", start: "Mar 2026", end: "Jun 2026", hours: "240/240", status: "Active" },
    { id: "ph-2", preceptor: "Dr. Anna Chen", site: "Women's Health Clinic", specialty: "OB/GYN", start: "Sep 2025", end: "Dec 2025", hours: "180/180", status: "Completed" },
  ],
  s2: [],
  s3: [
    { id: "ph-3", preceptor: "Dr. Kevin Park", site: "Metro General ER", specialty: "Emergency Medicine", start: "Jan 2026", end: "Apr 2026", hours: "120/180", status: "Active" },
  ],
};

const statusConfig = {
  placed: {
    label: "Placed",
    variant: "default",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  pending: {
    label: "Pending placement",
    variant: "secondary",
    icon: Clock,
    className: "text-amber-600 dark:text-amber-400",
  },
  unplaced: {
    label: "Unplaced",
    variant: "outline",
    icon: Clock,
    className: "text-rose-600 dark:text-rose-400",
  },
};

export function StudentProfileView({ studentId }) {
  const student = STUDENTS.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="mx-auto grid max-w-2xl gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          We couldn't find that student.
        </p>
        <Button asChild variant="outline" size="sm" className="mx-auto">
          <Link href="/institution/students">
            <ArrowLeft className="size-4" data-icon="inline-start" />
            Back to roster
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[student.status];
  const history = PLACEMENT_HISTORY[student.id] ?? [];
  const completedHours = history
    .filter((h) => h.status === "Completed")
    .reduce((acc, h) => acc + parseInt(h.hours.split("/")[0] || 0, 10), 0);

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      {/* Back nav */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/institution/students" aria-label="Back to roster">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Student profile
          </h2>
          <p className="text-sm text-muted-foreground">
            View placement history, credentials, and contact details.
          </p>
        </div>
      </div>

      {/* Identity card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarFallback className="bg-primary/10 text-primary text-base">
                  {student.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {student.name}
                  </h3>
                  <Badge variant={status.variant} className="gap-1">
                    <status.icon className="size-3" />
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {student.program} · {student.year} year · Joined{" "}
                  {student.joinedYear}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/institution/messages?contact=${student.id}`}>
                  <MessageSquare className="size-3.5" />
                  Message
                </Link>
              </Button>
              <Button size="sm">
                <UserPlus className="size-3.5" />
                Assign placement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact + program */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Contact &amp; program</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <Field icon={Mail} label="Email" value={student.email} href={`mailto:${student.email}`} />
            <Field icon={Phone} label="Phone" value={student.phone} href={`tel:${student.phone}`} />
            <Field icon={GraduationCap} label="Program" value={`${student.program} · ${student.year} year`} />
            <Field icon={BookOpen} label="Advisor" value={student.advisor} />
            <Field icon={CheckCircle2} label="GPA" value={student.gpa} />
          </CardContent>
        </Card>

        {/* Placement summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Placement</CardTitle>
            <CardDescription>{student.placement}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <Stat label="Total placements" value={history.length.toString()} />
            <Stat
              label="Hours completed"
              value={completedHours > 0 ? completedHours.toString() : "—"}
            />
            <Stat
              label="Active rotations"
              value={history.filter((h) => h.status === "Active").length.toString()}
            />
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Placement history</CardTitle>
          <CardDescription>
            All clinical rotations linked to this student.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No placements yet.
            </p>
          ) : (
            <div className="grid gap-3">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{h.preceptor}</p>
                    <p className="text-xs text-muted-foreground">
                      {h.specialty} · {h.site}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="size-3" />
                      {h.start} — {h.end}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {h.hours} hours
                    </span>
                    <Badge
                      variant={h.status === "Active" ? "default" : "outline"}
                      className="text-[10px]"
                    >
                      {h.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/20">
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">Remove student from roster</p>
            <p className="text-xs text-muted-foreground">
              They will lose access to the institution dashboard. Past placements stay on record.
            </p>
          </div>
          <Button variant="destructive" size="sm">
            <Trash2 className="size-3.5" />
            Remove
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ icon: Icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="block truncate text-sm text-foreground underline-offset-4 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border bg-muted/20 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-heading text-xl font-semibold">{value}</p>
    </div>
  );
}
