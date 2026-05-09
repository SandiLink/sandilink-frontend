"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  MapPin,
  MessageSquare,
  Send,
  Star,
  Users,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PRECEPTOR = {
  name: "Dr. Robert Williams",
  initials: "RW",
  specialty: "Family Medicine",
  location: "City Health Clinic",
  address: "456 Health Ave, New York, NY 10002",
  distance: "3.2 mi",
  rating: 4.9,
  reviews: 42,
  experience: "20 years",
  students: 3,
  maxStudents: 4,
  bio: "Board-certified family medicine physician with a passion for medical education. I've mentored over 50 students throughout my career and believe in hands-on, patient-centered learning. My clinic sees a diverse patient population, offering excellent exposure to a wide range of conditions.",
  education: ["MD — Columbia University", "Residency — NYU Langone"],
  certifications: [
    "Board Certified, Family Medicine",
    "Clinical Preceptor Certification",
  ],
  languages: ["English", "French"],
  acceptingStudents: true,
  programs: ["BSN", "MSN", "PA"],
  schedule: "Monday — Friday, 8:00 AM — 4:00 PM",
};

const REVIEWS = [
  {
    id: "1",
    name: "Alex T.",
    rating: 5,
    date: "Mar 20, 2026",
    text: "Dr. Williams is an incredible mentor. He takes time to explain clinical reasoning and lets you take the lead when ready.",
  },
  {
    id: "2",
    name: "Sam K.",
    rating: 5,
    date: "Mar 10, 2026",
    text: "Best preceptor experience I've had. The clinic has great variety and Dr. Williams is always available for questions.",
  },
  {
    id: "3",
    name: "Priya M.",
    rating: 4,
    date: "Feb 28, 2026",
    text: "Very educational rotation. Learned a lot about outpatient family medicine. Would definitely recommend.",
  },
];

export function PreceptorProfile({ preceptorId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasSlots = PRECEPTOR.students < PRECEPTOR.maxStudents;

  async function handleRequest(e) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  const tabs = [
    {
      value: "about",
      label: "About",
      content: (
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {PRECEPTOR.bio}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Education</p>
                  <div className="grid gap-2">
                    {PRECEPTOR.education.map((e) => (
                      <div
                        key={e}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-sm font-medium">Certifications</p>
                  <div className="grid gap-2">
                    {PRECEPTOR.certifications.map((c) => (
                      <div
                        key={c}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-sm font-medium">Languages</p>
                  <div className="flex gap-1.5">
                    {PRECEPTOR.languages.map((l) => (
                      <Badge key={l} variant="secondary">
                        {l}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-2 text-sm font-medium">Accepted Programs</p>
                  <div className="flex gap-1.5">
                    {PRECEPTOR.programs.map((p) => (
                      <Badge key={p} variant="outline">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "reviews",
      label: `Reviews (${PRECEPTOR.reviews})`,
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Student Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {REVIEWS.map((r) => (
                  <div key={r.id} className="rounded-lg border p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{r.name}</span>
                        <div className="flex">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-3 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {r.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "location",
      label: "Location",
      content: (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clinic Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{PRECEPTOR.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {PRECEPTOR.address}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {PRECEPTOR.schedule}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex h-48 items-center justify-center rounded-xl border bg-muted/30">
                <p className="text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-6">
      <Button variant="ghost" size="sm" className="w-fit" asChild>
        <Link href="/student/preceptors">
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to search
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left — profile */}
        <div className="grid gap-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar className="size-20 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {PRECEPTOR.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h2 className="font-heading text-lg font-semibold">
                      {PRECEPTOR.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {PRECEPTOR.specialty} — {PRECEPTOR.experience}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">
                      {PRECEPTOR.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({PRECEPTOR.reviews} student reviews)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      {PRECEPTOR.distance} — {PRECEPTOR.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5" />
                      {PRECEPTOR.students}/{PRECEPTOR.maxStudents} students
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hasSlots && <Badge>Accepting students</Badge>}
                    {!hasSlots && (
                      <Badge variant="outline" className="text-destructive">
                        Full
                      </Badge>
                    )}
                    {PRECEPTOR.programs.map((p) => (
                      <Badge key={p} variant="secondary">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <TabsComponent
            tabs={tabs}
            defaultValue="about"
            namespace="preceptor"
          />
        </div>

        {/* Right — placement request */}
        <div className="lg:sticky lg:top-0 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Request Placement</CardTitle>
              <CardDescription>
                Send a placement request to {PRECEPTOR.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="grid gap-4 text-center py-4">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                    <CheckCircle2 className="size-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Request sent!</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      You'll be notified when {PRECEPTOR.name} responds.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/student/placements">View my placements</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRequest} className="grid gap-4">
                  <div className="grid gap-1.5">
                    <Label>Preferred start date</Label>
                    <Input type="date" required className="h-10" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Preferred duration</Label>
                    <Select defaultValue="8">
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 weeks</SelectItem>
                        <SelectItem value="6">6 weeks</SelectItem>
                        <SelectItem value="8">8 weeks</SelectItem>
                        <SelectItem value="12">12 weeks</SelectItem>
                        <SelectItem value="16">16 weeks</SelectItem>
                        <SelectItem value="semester">Full semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Hours per week</Label>
                    <Select defaultValue="24-32">
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-16">8 — 16 hours</SelectItem>
                        <SelectItem value="16-24">16 — 24 hours</SelectItem>
                        <SelectItem value="24-32">24 — 32 hours</SelectItem>
                        <SelectItem value="32-40">32 — 40 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Message to preceptor</Label>
                    <Textarea
                      placeholder="Introduce yourself, mention your interests and goals..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!hasSlots || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" data-icon="inline-start" />
                        Send request
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full gap-1.5">
                    <MessageSquare className="size-3.5" />
                    Message preceptor
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
