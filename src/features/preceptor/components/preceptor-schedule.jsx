"use client";

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
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleSchema } from "./schema/scheduleSchema";

const DAYS = [
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
  { day: "Sunday" },
];
const TIMES = [
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];
const defaultAvailability = DAYS.map((d) => ({
  day: d.day,
  enabled: true,
  start: "8:00 AM",
  end: "4:00 PM",
}));
export function PreceptorSchedule() {
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      availability: defaultAvailability,
    },
  });
  const availability = watch("availability");
  const onSubmit = (data) => {
    console.log("Saved availability:", data);
  };
  return (
    <div className="grid gap-6">
      {/* WEEKLY AVAILABILITY */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>
            Set your recurring hours for student rotations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              {availability.map((d, index) => (
                <div
                  key={d.day}
                  className="flex items-center gap-4 rounded-lg border p-3.5"
                >
                  {/* SWITCH */}
                  <Controller
                    control={control}
                    name={`availability.${index}.enabled`}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={(val) => {
                          field.onChange(val);
                        }}
                      />
                    )}
                  />
                  <span className="w-24 text-sm font-medium">{d.day}</span>
                  {availability[index].enabled ? (
                    <div className="flex items-center gap-2 text-sm">
                      {/* START TIME */}
                      <Controller
                        control={control}
                        name={`availability.${index}.start`}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-8 w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TIMES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <span className="text-muted-foreground">to</span>
                      {/* END TIME */}
                      <Controller
                        control={control}
                        name={`availability.${index}.end`}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-8 w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TIMES.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not available
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Button type="submit" className="mt-4">
              Save availability
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* BLOCKED DATES (UNCHANGED) */}
      <Card>
        <CardHeader>
          <CardTitle>Blocked Dates</CardTitle>
          <CardDescription>
            Mark specific dates as unavailable (vacation, conferences, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {[
              {
                from: "Apr 14, 2026",
                to: "Apr 18, 2026",
                reason: "Medical conference",
              },
              { from: "May 25, 2026", to: "May 30, 2026", reason: "Vacation" },
            ].map((b) => (
              <div
                key={b.from}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {b.from} — {b.to}
                  </p>
                  <p className="text-xs text-muted-foreground">{b.reason}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3">
            Add blocked dates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
