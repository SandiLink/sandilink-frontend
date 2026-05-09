"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Building,
  CalendarDays,
  Clock,
  Download,
  MapPin,
  MessageSquare,
  RotateCcw,
  Star,
  Video,
  X,
} from "lucide-react";
import { toast } from "sonner";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const BOOKING = {
  id: "bk-001",
  confirmationId: "SL-2026-04821",
  provider: "Dr. Sarah Johnson",
  specialty: "General Practice",
  initials: "SJ",
  date: "Apr 2, 2026",
  time: "10:00 AM",
  duration: "30 min",
  type: "Virtual",
  location: "Downtown Medical Center",
  address: "123 Main St, Suite 200, New York, NY 10001",
  status: "upcoming",
  price: 120,
  serviceFee: 5,
  total: 125,
  bookedOn: "Mar 30, 2026",
  paymentMethod: "Visa ending in 4242",
};

const statusConfig = {
  upcoming: { label: "Upcoming", variant: "default" },
  pending: { label: "Pending", variant: "secondary" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

export function BookingDetails({ bookingId }) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(BOOKING.status);
  const t = useTranslations("serviceUserDetail.bookingDetails");
  const status = statusConfig[bookingStatus];
  const isVirtual = BOOKING.type === "Virtual";
  const isUpcoming = bookingStatus === "upcoming";
  const isCompleted = bookingStatus === "completed";

  function handleDownloadReceipt() {
    toast.success("Receipt downloading", {
      description: `${BOOKING.confirmationId}.pdf — your bank statement will show "SandiLink ${BOOKING.confirmationId}"`,
    });
  }

  function handleConfirmReschedule() {
    setRescheduleOpen(false);
    toast.success("Reschedule request sent", {
      description: `${BOOKING.provider} has been notified. You'll get a response within 1 business day.`,
    });
  }

  function handleConfirmCancel() {
    setCancelOpen(false);
    setBookingStatus("cancelled");
    toast.success("Booking cancelled", {
      description: "A refund will appear on your card within 3–5 business days.",
    });
  }

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href="/dashboard/engagements">
          <ArrowLeft className="size-4" data-icon="inline-start" />
          {t("backToBookings")}
        </Link>
      </Button>

      <div className="grid gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {BOOKING.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {BOOKING.provider}
              </h2>
              <p className="text-sm text-muted-foreground">
                {BOOKING.specialty}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={status.variant} className="text-sm">
              {status.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {BOOKING.confirmationId}
            </span>
          </div>
        </div>

        {/* Appointment info */}
        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
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

            {isUpcoming && isVirtual && (
              <div className="mt-4">
                <Button className="gap-1.5">
                  <Video className="size-4" />
                  Join virtual session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment info */}
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
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
                <span>${BOOKING.total}.00</span>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Paid with</span>
                <span>{BOOKING.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Booked on</span>
                <span>{BOOKING.bookedOn}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/messages/dr-sarah-johnson`}>
                  <MessageSquare className="size-4" data-icon="inline-start" />
                  Message provider
                </Link>
              </Button>
              <Button variant="outline" onClick={handleDownloadReceipt}>
                <Download className="size-4" data-icon="inline-start" />
                Download receipt
              </Button>

              {isUpcoming && (
                <>
                  {/* Reschedule */}
                  <Dialog
                    open={rescheduleOpen}
                    onOpenChange={setRescheduleOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <RotateCcw
                          className="size-4"
                          data-icon="inline-start"
                        />
                        Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reschedule Appointment</DialogTitle>
                        <DialogDescription>
                          Select a new date and time for your appointment with{" "}
                          {BOOKING.provider}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-2">
                        <div className="grid gap-1.5">
                          <Label htmlFor="newDate">New date</Label>
                          <Input id="newDate" type="date" className="h-10" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="newTime">Preferred time</Label>
                          <Input id="newTime" type="time" className="h-10" />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="rescheduleReason">
                            Reason (optional)
                          </Label>
                          <Textarea
                            id="rescheduleReason"
                            placeholder="Let the provider know why you're rescheduling..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setRescheduleOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleConfirmReschedule}>
                          Request reschedule
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Cancel */}
                  <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <X className="size-4" data-icon="inline-start" />
                        Cancel booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cancel Booking</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to cancel your appointment with{" "}
                          {BOOKING.provider} on {BOOKING.date} at {BOOKING.time}
                          ?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-muted-foreground">
                        <p className="font-medium text-destructive">
                          Cancellation Policy
                        </p>
                        <p className="mt-1">
                          Cancellations made more than 24 hours before the
                          appointment receive a full refund. Late cancellations
                          may incur a fee.
                        </p>
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="cancelReason">
                          Reason for cancellation
                        </Label>
                        <Textarea
                          id="cancelReason"
                          placeholder="Please let us know why you're cancelling..."
                          rows={3}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setCancelOpen(false)}
                        >
                          Keep booking
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleConfirmCancel}
                        >
                          Yes, cancel booking
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              {isCompleted && (
                <>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/engagements/${bookingId}/summary`}>
                      View summary
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/engagements/${bookingId}/review`}>
                      <Star className="size-4" data-icon="inline-start" />
                      Leave a review
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
