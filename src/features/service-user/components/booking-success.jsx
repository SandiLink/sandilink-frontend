"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CalendarCheck2,
  CalendarDays,
  Clock,
  Download,
  Home,
  MessageSquare,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BOOKING = {
  confirmationId: "SL-2026-04821",
  provider: "Dr. Sarah Johnson",
  specialty: "General Practice",
  initials: "SJ",
  date: "Apr 2, 2026",
  time: "10:00 AM",
  duration: "30 min",
  type: "Virtual",
  total: 125,
};

export function BookingSuccess() {
  const t = useTranslations("serviceUserDetail.bookingSuccess");
  function handleDownloadReceipt() {
    toast.success("Receipt downloading", {
      description: `${BOOKING.confirmationId}.pdf — your bank statement will show "SandiLink ${BOOKING.confirmationId}"`,
    });
  }
  return (
    <div className="mx-auto max-w-lg py-8">
      {/* Success icon */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <CalendarCheck2 className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("heading")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("body")}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("confirmationIdLabel")}{" "}
          <span className="font-mono font-medium text-foreground">
            {BOOKING.confirmationId}
          </span>
        </p>
      </div>

      {/* Booking summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Appointment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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

            <div className="grid gap-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  Date
                </span>
                <span className="font-medium">{BOOKING.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-3.5" />
                  Time
                </span>
                <span className="font-medium">
                  {BOOKING.time} ({BOOKING.duration})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Video className="size-3.5" />
                  Type
                </span>
                <span className="font-medium">{BOOKING.type}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total paid</span>
                <span>${BOOKING.total}.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's next */}
      <Card className="mb-6" size="sm">
        <CardHeader>
          <CardTitle className="text-base">What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2.5 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                1
              </span>
              You'll receive a confirmation email with your appointment details.
            </li>
            <li className="flex gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                2
              </span>
              A reminder will be sent 24 hours before your appointment.
            </li>
            <li className="flex gap-2">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
              {BOOKING.type === "Virtual"
                ? "A link to join the virtual session will be available on your bookings page."
                : "Please arrive 10 minutes early to your in-person appointment."}
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid gap-2">
        <Button size="lg" className="w-full" asChild>
          <Link href="/dashboard/engagements">
            <CalendarDays className="size-4" data-icon="inline-start" />
            View my bookings
          </Link>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/dashboard/messages">
              <MessageSquare className="size-4" data-icon="inline-start" />
              Message provider
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={handleDownloadReceipt}>
            <Download className="size-4" data-icon="inline-start" />
            Download receipt
          </Button>
        </div>
        <Button
          variant="ghost"
          size="lg"
          className="w-full text-muted-foreground"
          asChild
        >
          <Link href="/dashboard">
            <Home className="size-4" data-icon="inline-start" />
            Back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
