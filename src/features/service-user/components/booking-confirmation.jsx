"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building,
  CalendarDays,
  Clock,
  MapPin,
  Video,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const BOOKING = {
  provider: "Dr. Sarah Johnson",
  specialty: "General Practice",
  initials: "SJ",
  date: "Apr 2, 2026",
  time: "10:00 AM",
  duration: "30 min",
  type: "Virtual",
  location: "Downtown Medical Center",
  address: "123 Main St, Suite 200, New York, NY 10001",
  price: 120,
  serviceFee: 5,
};

export function BookingConfirmation({ bookingId }) {
  const total = BOOKING.price + BOOKING.serviceFee;
  const isVirtual = BOOKING.type === "Virtual";

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6 grid gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step 2 of 3 — Review & Confirm</span>
          <span>66%</span>
        </div>
        <Progress value={66} />
      </div>

      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/dashboard/engagements/${bookingId}/intake`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to intake form
        </Link>
      </Button>

      <div className="grid gap-6">
        {/* Appointment details */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Review your booking before proceeding to payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5">
              {/* Provider */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {BOOKING.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{BOOKING.provider}</p>
                  <p className="text-xs text-muted-foreground">
                    {BOOKING.specialty}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Details grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">{BOOKING.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">
                      {BOOKING.time} ({BOOKING.duration})
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  {isVirtual ? (
                    <Video className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Building className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Visit Type</p>
                    <p className="text-sm font-medium">{BOOKING.type}</p>
                  </div>
                </div>
                {!isVirtual && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{BOOKING.location}</p>
                      <p className="text-xs text-muted-foreground">
                        {BOOKING.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost summary */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultation fee</span>
                <span>${BOOKING.price}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service fee</span>
                <span>${BOOKING.serviceFee}.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>${total}.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policies */}
        <Card size="sm">
          <CardContent className="pt-3">
            <div className="grid gap-2 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Cancellation Policy:
                </span>{" "}
                Free cancellation up to 24 hours before the appointment.
                Cancellations within 24 hours may incur a fee.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Rescheduling:
                </span>{" "}
                You can reschedule up to 12 hours before the appointment at no
                extra cost.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/dashboard/engagements/${bookingId}/intake`}>Back</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href={`/dashboard/engagements/${bookingId}/payment`}>
              Proceed to payment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
