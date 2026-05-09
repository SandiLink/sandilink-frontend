"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building, CalendarDays, Check, Clock, FileText, Loader2, Lock, MessageSquare, ShieldCheck, Video, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const BOOKING = {
  id: "pb-001",
  patient: "Emma Garcia",
  initials: "EG",
  email: "emma.garcia@email.com",
  phone: "+1 (555) 234-5678",
  date: "Apr 3, 2026",
  time: "10:00 AM",
  duration: "30 min",
  type: "Virtual",
  status: "pending",
  reason: "Annual check-up",
  intake: {
    conditions: "No known chronic conditions",
    medications: "Multivitamin daily",
    allergies: "None known",
    symptoms: "Would like a routine annual check-up. No specific concerns at this time, just want to ensure everything is in order.",
    duration: "N/A — preventive visit",
  },
};

export function ProviderBookingDetail({ bookingId }) {
  const [summaryText, setSummaryText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPending = BOOKING.status === "pending";
  const isVirtual = BOOKING.type === "Virtual";

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href="/provider/work"><ArrowLeft className="size-4" data-icon="inline-start" />Back to bookings</Link>
      </Button>

      <div className="grid gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12"><AvatarFallback className="bg-primary/10 text-primary">{BOOKING.initials}</AvatarFallback></Avatar>
            <div>
              <h2 className="font-heading text-lg font-semibold">{BOOKING.patient}</h2>
              <p className="text-sm text-muted-foreground">{BOOKING.email}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm w-fit">Pending approval</Badge>
        </div>

        {/* Appointment info */}
        <Card>
          <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Date</p><p className="text-sm font-medium">{BOOKING.date}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Time</p><p className="text-sm font-medium">{BOOKING.time} ({BOOKING.duration})</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                {isVirtual ? <Video className="mt-0.5 size-4 shrink-0 text-muted-foreground" /> : <Building className="mt-0.5 size-4 shrink-0 text-muted-foreground" />}
                <div><p className="text-xs text-muted-foreground">Type</p><p className="text-sm font-medium">{BOOKING.type}</p></div>
              </div>
              <div className="flex items-start gap-2.5">
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div><p className="text-xs text-muted-foreground">Reason</p><p className="text-sm font-medium">{BOOKING.reason}</p></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intake form view */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <div>
                <CardTitle>Patient Intake Form</CardTitle>
                <CardDescription>Encrypted — only visible to you</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-xs">
              <ShieldCheck className="size-3.5 shrink-0 text-primary" />
              <span className="text-muted-foreground">This data is end-to-end encrypted. Only you and the patient can view it.</span>
            </div>
            <div className="grid gap-4">
              {[
                ["Existing Conditions", BOOKING.intake.conditions],
                ["Current Medications", BOOKING.intake.medications],
                ["Allergies", BOOKING.intake.allergies],
                ["Symptoms / Concerns", BOOKING.intake.symptoms],
                ["Duration", BOOKING.intake.duration],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accept / Decline */}
        {isPending && (
          <Card>
            <CardHeader><CardTitle>Accept or Decline</CardTitle><CardDescription>Respond to this booking request</CardDescription></CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label>Message to patient (optional)</Label>
                  <Textarea placeholder="Add a note for the patient..." rows={3} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1"><Check className="size-4" data-icon="inline-start" />Accept booking</Button>
                  <Button variant="destructive" className="flex-1"><X className="size-4" data-icon="inline-start" />Decline</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Post-appointment summary form */}
        {BOOKING.status === "completed" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-primary" />
                <div><CardTitle>Post-Appointment Summary</CardTitle><CardDescription>Write a summary visible to the patient</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label>Diagnosis</Label>
                  <Textarea placeholder="Enter diagnosis..." rows={2} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Visit notes</Label>
                  <Textarea value={summaryText} onChange={(e) => setSummaryText(e.target.value)} placeholder="Describe findings, recommendations..." rows={4} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Prescriptions</Label>
                  <Textarea placeholder="Medication name, dosage, frequency..." rows={3} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Follow-up instructions</Label>
                  <Textarea placeholder="e.g., Follow up in 4 weeks if symptoms persist..." rows={2} />
                </div>
                <Button disabled={isSubmitting} onClick={async () => { setIsSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setIsSubmitting(false); }}>
                  {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Saving...</> : "Save summary"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick actions */}
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/provider/messages/${bookingId}`}><MessageSquare className="size-4" data-icon="inline-start" />Message patient</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
