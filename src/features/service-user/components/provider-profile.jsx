"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Languages,
  MapPin,
  MessageSquare,
  Star,
  Video,
} from "lucide-react";
import { TrustBadges, VerifiedName } from "@/components/shared/trust-badges";
import { LocalizedText } from "@/components/shared/localized-text";
import { useLocalizedText } from "@/lib/localized-text";
import { getLocaleConfig } from "@/i18n/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsComponent } from "@/components/shared/TabsComponent";

const PROVIDER = {
  id: "dr-sarah-johnson",
  name: "Dr. Sarah Johnson",
  profession: { en: "Physician", es: "Médica", fr: "Médecin" },
  specialty: { en: "General Practice", es: "Medicina General", fr: "Médecine générale" },
  initials: "SJ",
  avatar: "",
  rating: 4.9,
  reviews: 124,
  price: 120,
  // Localized bio — keys map to locale codes from `src/i18n/config.js`. Any
  // missing locale falls back to the default (en).
  bio: {
    en: "Board-certified family medicine physician with over 15 years of experience. Passionate about preventive care and building lasting patient relationships. I take a holistic approach to healthcare, considering each patient's unique needs and lifestyle.",
    es: "Médica de familia certificada con más de 15 años de experiencia. Apasionada por el cuidado preventivo y por construir relaciones duraderas con sus pacientes. Adopto un enfoque holístico de la salud, considerando las necesidades y el estilo de vida únicos de cada persona.",
    fr: "Médecin de famille certifiée avec plus de 15 ans d'expérience. Passionnée par les soins préventifs et par la création de relations durables avec mes patients. J'adopte une approche holistique de la santé, en tenant compte des besoins et du mode de vie de chacun.",
  },
  services: [
    {
      name: "Annual Physical",
      description: {
        en: "Comprehensive yearly check-up including vitals, labs review, and lifestyle counseling.",
        es: "Examen anual completo con signos vitales, revisión de laboratorios y orientación de estilo de vida.",
        fr: "Bilan annuel complet incluant signes vitaux, examen des analyses et conseils sur le mode de vie.",
      },
    },
    {
      name: "Telehealth Follow-up",
      description: {
        en: "30-minute virtual visit to review symptoms, refill prescriptions, or check on chronic conditions.",
        es: "Visita virtual de 30 minutos para revisar síntomas, renovar recetas o seguir condiciones crónicas.",
      },
    },
  ],
  location: "Downtown Medical Center",
  address: "123 Main St, Suite 200, New York, NY 10001",
  country: "United States",
  distance: "2.3 mi",
  virtual: true,
  inPerson: true,
  projectBased: false,
  responseTime: "< 1 hour",
  verified: true,
  languages: ["English", "Spanish"],
  education: [
    "MD — Johns Hopkins University School of Medicine",
    "Residency — Massachusetts General Hospital",
  ],
  certifications: [
    "Board Certified, Family Medicine",
    "ACLS Certified",
    "DEA Licensed",
  ],
  yearsExp: 15,
};

const TIME_SLOTS = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
  afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "3:00 PM", "3:30 PM"],
  evening: ["5:00 PM", "5:30 PM"],
};

const REVIEWS = [
  {
    id: "1",
    name: "Alice M.",
    rating: 5,
    date: "Mar 25, 2026",
    text: "Dr. Johnson was incredibly thorough and took the time to explain everything. Felt very comfortable during my visit.",
  },
  {
    id: "2",
    name: "Tom R.",
    rating: 5,
    date: "Mar 18, 2026",
    text: "Best experience I've had with a doctor. She listens carefully and provides clear guidance. Highly recommend!",
  },
  {
    id: "3",
    name: "Maria S.",
    rating: 4,
    date: "Mar 10, 2026",
    text: "Very professional and knowledgeable. The virtual visit was seamless. Would definitely book again.",
  },
];

const DATES = [
  { day: "Mon", date: "Apr 2", available: true },
  { day: "Tue", date: "Apr 3", available: true },
  { day: "Wed", date: "Apr 4", available: false },
  { day: "Thu", date: "Apr 5", available: true },
  { day: "Fri", date: "Apr 6", available: true },
  { day: "Sat", date: "Apr 7", available: true },
  { day: "Sun", date: "Apr 8", available: false },
];

function LocalizedDescription({ value }) {
  const localized = useLocalizedText(value);
  if (!localized.text) return null;
  const fallbackName = localized.fallback
    ? getLocaleConfig(localized.source).native
    : null;
  return (
    <>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {localized.text}
      </p>
      {localized.fallback ? (
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
          <Languages className="size-2.5" />
          Translated from {fallbackName}
        </p>
      ) : null}
    </>
  );
}

function ServicesCard({ services }) {
  if (!services?.length) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Services</CardTitle>
        <CardDescription>
          What this provider offers, shown in your selected language when
          available.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-lg border bg-muted/20 p-4"
          >
            <p className="text-sm font-medium">{service.name}</p>
            <div className="mt-1.5">
              <LocalizedDescription value={service.description} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ProviderProfile() {
  const [selectedDate, setSelectedDate] = useState("Apr 2");
  const [selectedTime, setSelectedTime] = useState(null);
  const [visitType, setVisitType] = useState("virtual");

  const localizedBio = useLocalizedText(PROVIDER.bio);
  const fallbackLanguageName = localizedBio.fallback
    ? getLocaleConfig(localizedBio.source).native
    : null;

  const tabs = [
    {
      value: "about",
      label: "About",
      content: (
        <div className="mt-4 grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {localizedBio.text}
              </p>
              {localizedBio.fallback ? (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
                  <Languages className="size-3" />
                  Translated from {fallbackLanguageName} — provider hasn't
                  added a version in your language yet.
                </p>
              ) : null}
            </CardContent>
          </Card>

          <ServicesCard services={PROVIDER.services} />

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Education & Credentials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium">Education</p>
                  <div className="grid gap-2">
                    {PROVIDER.education.map((edu) => (
                      <div
                        key={edu}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <GraduationCap className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {edu}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-sm font-medium">Certifications</p>
                  <div className="grid gap-2">
                    {PROVIDER.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-500" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="mb-2 text-sm font-medium">Languages</p>
                  <div className="flex gap-1.5">
                    {PROVIDER.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
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
      label: `Reviews (${PROVIDER.reviews})`,
      content: (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Patient Reviews</CardTitle>
              <CardDescription>
                {PROVIDER.rating} out of 5 — {PROVIDER.reviews} reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg border p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {review.name}
                        </span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-3 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.text}
                    </p>
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
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Office Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{PROVIDER.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {PROVIDER.address}
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
      {/* Back */}
      <Button variant="ghost" size="sm" className="w-fit" asChild>
        <Link href="/dashboard/experts">
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to search
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left — profile info */}
        <div className="grid gap-6">
          {/* Header card */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar className="size-20 shrink-0">
                  <AvatarImage src={PROVIDER.avatar} alt={PROVIDER.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {PROVIDER.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div>
                    <VerifiedName
                      verified={PROVIDER.verified}
                      className="font-heading text-lg font-semibold"
                    >
                      {PROVIDER.name}
                    </VerifiedName>
                    <p className="text-sm text-muted-foreground">
                      <LocalizedText value={PROVIDER.profession} /> ·{" "}
                      <LocalizedText value={PROVIDER.specialty} /> ·{" "}
                      {PROVIDER.yearsExp} years experience
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">
                      {PROVIDER.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({PROVIDER.reviews} reviews)
                    </span>
                  </div>

                  <TrustBadges
                    location={PROVIDER.location}
                    distance={PROVIDER.distance}
                    country={PROVIDER.country}
                    responseTime={PROVIDER.responseTime}
                    languages={PROVIDER.languages}
                    virtual={PROVIDER.virtual}
                    inPerson={PROVIDER.inPerson}
                  />

                  <Badge variant="secondary" className="text-xs">
                    Accepting new patients
                  </Badge>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-semibold">${PROVIDER.price}</p>
                  <p className="text-xs text-muted-foreground">per visit</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <TabsComponent
            tabs={tabs}
            defaultValue="about"
            namespace="provider"
          />
        </div>

        {/* Right — booking sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Book Appointment</CardTitle>
              <CardDescription>Select a date and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {/* Visit type toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType("virtual")}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-sm transition-colors ${
                      visitType === "virtual"
                        ? "border-primary bg-primary/5 font-medium text-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Video className="size-3.5" />
                    Virtual
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitType("in-person")}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border p-2.5 text-sm transition-colors ${
                      visitType === "in-person"
                        ? "border-primary bg-primary/5 font-medium text-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Building className="size-3.5" />
                    In-person
                  </button>
                </div>

                {/* Date picker row */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">April 2026</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-xs">
                        <ChevronLeft className="size-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <ChevronRight className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {DATES.map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        disabled={!d.available}
                        onClick={() => {
                          setSelectedDate(d.date);
                          setSelectedTime(null);
                        }}
                        className={`flex flex-col items-center rounded-lg p-1.5 text-xs transition-colors disabled:opacity-30 ${
                          selectedDate === d.date
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span className="text-[10px] font-medium opacity-60">
                          {d.day}
                        </span>
                        <span className="font-medium">
                          {d.date.split(" ")[1]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Time slots */}
                <div className="grid gap-3">
                  {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                    <div key={period}>
                      <p className="mb-1.5 text-xs font-medium capitalize text-muted-foreground">
                        {period}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {slots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                              selectedTime === time
                                ? "border-primary bg-primary text-primary-foreground"
                                : "hover:border-primary/40 hover:bg-muted/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Summary & book */}
                {selectedTime && (
                  <div className="rounded-lg bg-muted/50 p-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedDate}, 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">
                        {visitType}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${PROVIDER.price}.00</span>
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  disabled={!selectedTime}
                  asChild={!!selectedTime}
                >
                  {selectedTime ? (
                    <Link href={`/dashboard/engagements/${PROVIDER.id}/intake`}>
                      Continue to intake form
                    </Link>
                  ) : (
                    "Select a time slot"
                  )}
                </Button>

                <Button variant="outline" className="w-full gap-1.5">
                  <MessageSquare className="size-3.5" />
                  Message provider
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
