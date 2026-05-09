"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Download,
  FileText,
  Pill,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SUMMARY = {
  provider: "Dr. Sarah Johnson",
  specialty: "General Practice",
  initials: "SJ",
  date: "Mar 28, 2026",
  time: "9:00 AM",
  duration: "30 min",
  diagnosis: "Seasonal allergies (Allergic rhinitis)",
  notes:
    "Patient presented with nasal congestion, sneezing, and itchy eyes for the past two weeks. Symptoms are consistent with seasonal allergies. No signs of infection. Recommended over-the-counter antihistamines and nasal spray. Advised to avoid known allergens and keep windows closed during high pollen days.",
  prescriptions: [
    {
      name: "Cetirizine (Zyrtec)",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "30 days",
    },
    {
      name: "Fluticasone Nasal Spray",
      dosage: "50mcg/spray",
      frequency: "2 sprays each nostril, once daily",
      duration: "30 days",
    },
  ],
  followUp: "Follow up in 4 weeks if symptoms persist or worsen.",
  vitals: {
    bloodPressure: "118/76 mmHg",
    heartRate: "72 bpm",
    temperature: "98.4°F",
    weight: "165 lbs",
  },
};

export function PostAppointmentSummary({ bookingId }) {
  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/dashboard/engagements/${bookingId}`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to booking
        </Link>
      </Button>

      {/* Security notice */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <span className="text-muted-foreground">
          This summary is encrypted and only visible to you and your provider.
        </span>
      </div>

      <div className="grid gap-6">
        {/* Header */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {SUMMARY.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{SUMMARY.provider}</p>
                  <p className="text-xs text-muted-foreground">
                    {SUMMARY.specialty}
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {SUMMARY.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {SUMMARY.time} ({SUMMARY.duration})
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Stethoscope className="size-4 text-primary" />
              <CardTitle>Diagnosis</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{SUMMARY.diagnosis}</p>
          </CardContent>
        </Card>

        {/* Provider notes */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <CardTitle>Provider Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SUMMARY.notes}
            </p>
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Pill className="size-4 text-primary" />
              <div>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>
                  Medications prescribed during this visit
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {SUMMARY.prescriptions.map((rx) => (
                <div key={rx.name} className="rounded-lg border p-3.5">
                  <p className="text-sm font-medium">{rx.name}</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground">Dosage</p>
                      <p>{rx.dosage}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Frequency</p>
                      <p>{rx.frequency}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Duration</p>
                      <p>{rx.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        <Card>
          <CardHeader>
            <CardTitle>Vitals Recorded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Object.entries({
                "Blood Pressure": SUMMARY.vitals.bloodPressure,
                "Heart Rate": SUMMARY.vitals.heartRate,
                Temperature: SUMMARY.vitals.temperature,
                Weight: SUMMARY.vitals.weight,
              }).map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Follow-up */}
        <Card>
          <CardHeader>
            <CardTitle>Follow-Up</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{SUMMARY.followUp}</p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Summary downloading", {
                description: `${SUMMARY.provider} · ${SUMMARY.date} — visit-summary.pdf`,
              })
            }
          >
            <Download className="size-4" data-icon="inline-start" />
            Download summary
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/engagements/${bookingId}/review`}>
              Leave a review
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
