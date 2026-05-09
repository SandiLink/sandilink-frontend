"use client";

import { Building, ChevronLeft, ChevronRight, Plus, Video } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SCHEDULE = [
  {
    time: "9:00 AM",
    patient: "John Doe",
    initials: "JD",
    type: "Virtual",
    reason: "Check-up",
  },
  {
    time: "10:00 AM",
    patient: "Alice Martin",
    initials: "AM",
    type: "In-person",
    reason: "Follow-up",
  },
  {
    time: "11:30 AM",
    patient: "Bob Williams",
    initials: "BW",
    type: "Virtual",
    reason: "New patient",
  },
  { time: "1:00 PM", patient: null },
  {
    time: "2:00 PM",
    patient: "Carol Taylor",
    initials: "CT",
    type: "In-person",
    reason: "Consultation",
  },
  {
    time: "3:30 PM",
    patient: "David Lee",
    initials: "DL",
    type: "Virtual",
    reason: "Follow-up",
  },
];

export function CalendarViewTab() {
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm">
                <ChevronLeft className="size-4" />
              </Button>

              <CardTitle className="text-base">
                Wednesday, April 1, 2026
              </CardTitle>

              <Button variant="ghost" size="icon-sm">
                <ChevronRight className="size-4" />
              </Button>
            </div>

            <Select defaultValue="day">
              <SelectTrigger className="h-8 w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1">
            {SCHEDULE.map((slot, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  slot.patient
                    ? "hover:bg-muted/50"
                    : "border-dashed bg-muted/20"
                }`}
              >
                <div className="w-20 shrink-0">
                  <p className="text-sm font-medium">{slot.time}</p>
                </div>

                <div className="h-8 w-px bg-border" />

                {slot.patient ? (
                  <>
                    <Avatar size="sm">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {slot.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{slot.patient}</p>
                      <p className="text-xs text-muted-foreground">
                        {slot.reason}
                      </p>
                    </div>

                    <Badge variant="outline" className="gap-1 text-xs">
                      {slot.type === "Virtual" ? (
                        <Video className="size-3" />
                      ) : (
                        <Building className="size-3" />
                      )}
                      {slot.type}
                    </Badge>
                  </>
                ) : (
                  <div className="flex flex-1 items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Available
                    </span>

                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Plus className="size-3" />
                      Block slot
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
