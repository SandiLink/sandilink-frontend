import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  MoreHorizontal,
  Video,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bookings = [
  {
    id: "1",
    provider: "Dr. Sarah Johnson",
    specialty: "General Practice",
    avatar: "",
    initials: "SJ",
    date: "Apr 2, 2026",
    time: "10:00 AM",
    location: "Virtual",
    status: "confirmed",
  },
  {
    id: "2",
    provider: "Dr. Michael Chen",
    specialty: "Physical Therapy",
    avatar: "",
    initials: "MC",
    date: "Apr 5, 2026",
    time: "2:30 PM",
    location: "In-person",
    status: "confirmed",
  },
  {
    id: "3",
    provider: "Dr. Emily Davis",
    specialty: "Mental Health",
    avatar: "",
    initials: "ED",
    date: "Apr 8, 2026",
    time: "11:00 AM",
    location: "Virtual",
    status: "pending",
  },
];

const statusConfig = {
  confirmed: { variant: "default", label: "Confirmed" },
  pending: { variant: "secondary", label: "Pending" },
  cancelled: { variant: "destructive", label: "Cancelled" },
};

export function UpcomingBookings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Engagements</CardTitle>
        <CardDescription>Your next scheduled appointments</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/engagements">View all</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {bookings.map((booking, i) => {
            const status = statusConfig[booking.status];
            const isVirtual = booking.location === "Virtual";
            return (
              <div
                key={booking.id}
                className="group flex items-start gap-3 rounded-xl border p-3.5 transition-colors hover:bg-muted/50"
              >
                <Avatar className="mt-0.5">
                  <AvatarImage src={booking.avatar} alt={booking.provider} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {booking.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {booking.provider}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {booking.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Cancel booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {isVirtual ? (
                        <Video className="size-3" />
                      ) : (
                        <Building className="size-3" />
                      )}
                      {booking.location}
                    </span>
                  </div>
                  {i === 0 && booking.status === "confirmed" && isVirtual && (
                    <Button size="sm" className="mt-1.5 h-7 text-xs">
                      <Video className="size-3" data-icon="inline-start" />
                      Join session
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
