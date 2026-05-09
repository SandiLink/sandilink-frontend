"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WEEK_DAYS = [
  { day: "Monday", enabled: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Tuesday", enabled: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Wednesday", enabled: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Thursday", enabled: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Friday", enabled: true, start: "9:00 AM", end: "3:00 PM" },
  { day: "Saturday", enabled: false, start: "10:00 AM", end: "1:00 PM" },
  { day: "Sunday", enabled: false, start: "", end: "" },
];

export function AvailabilityTab() {
  return (
    <div className="mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>Set your recurring available hours</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3">
            {WEEK_DAYS.map((day) => (
              <div
                key={day.day}
                className="flex items-center gap-4 rounded-lg border p-3.5"
              >
                <Switch defaultChecked={day.enabled} />

                <span className="w-24 text-sm font-medium">{day.day}</span>

                {day.enabled ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Select defaultValue={day.start}>
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"].map(
                          (t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>

                    <span className="text-muted-foreground">to</span>

                    <Select defaultValue={day.end}>
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "1:00 PM",
                          "3:00 PM",
                          "5:00 PM",
                          "6:00 PM",
                          "7:00 PM",
                        ].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Not available
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button className="mt-4">Save availability</Button>
        </CardContent>
      </Card>
    </div>
  );
}
