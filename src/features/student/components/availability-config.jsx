"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { availabilitySchema } from "./schema/availabilitySchema";

const DAYS = [
  { day: "Monday", enabled: true, start: "7:00 AM", end: "3:00 PM" },
  { day: "Tuesday", enabled: true, start: "7:00 AM", end: "3:00 PM" },
  { day: "Wednesday", enabled: true, start: "7:00 AM", end: "3:00 PM" },
  { day: "Thursday", enabled: true, start: "7:00 AM", end: "3:00 PM" },
  { day: "Friday", enabled: true, start: "7:00 AM", end: "12:00 PM" },
  { day: "Saturday", enabled: false, start: "", end: "" },
  { day: "Sunday", enabled: false, start: "", end: "" },
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
  "7:00 PM",
];
const defaultValues = {
  days: DAYS,
  startDate: "2026-04-15",
  endDate: "2026-12-15",
  hoursPerWeek: "24-32",
  shift: "day",
};
export function AvailabilityConfig() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    console.log(data);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {" "}
      {/* Weekly schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>
            Set your recurring schedule for clinical rotations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {DAYS.map((d, index) => {
              const enabled = watch(`days.${index}.enabled`);

              return (
                <div
                  key={d.day}
                  className="flex items-center gap-4 rounded-lg border p-3.5"
                >
                  {/* Switch */}
                  <Controller
                    control={control}
                    name={`days.${index}.enabled`}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  <span className="w-24 text-sm font-medium">{d.day}</span>

                  {enabled ? (
                    <div className="flex items-center gap-2 text-sm">
                      {/* Start */}
                      <Controller
                        control={control}
                        name={`days.${index}.start`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
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

                      {/* End */}
                      <Controller
                        control={control}
                        name={`days.${index}.end`}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
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
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Date range */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Period</CardTitle>
          <CardDescription>
            When you're available to start and end a placement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Earliest start date</Label>
              <Input type="date" className="h-10" {...register("startDate")} />
            </div>
            <div className="grid gap-1.5">
              <Label>Latest end date</Label>
              <Input type="date" className="h-10" {...register("endDate")} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Hours per week */}
      <Card>
        <CardHeader>
          <CardTitle>Hours Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Preferred hours per week</Label>
              <Controller
                control={control}
                name="hoursPerWeek"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8-16">8 — 16 hours</SelectItem>
                      <SelectItem value="16-24">16 — 24 hours</SelectItem>
                      <SelectItem value="24-32">24 — 32 hours</SelectItem>
                      <SelectItem value="32-40">32 — 40 hours</SelectItem>
                      <SelectItem value="40+">40+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Shift preference</Label>
              <Controller
                control={control}
                name="shift"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any shift</SelectItem>
                      <SelectItem value="day">Day shift</SelectItem>
                      <SelectItem value="evening">Evening shift</SelectItem>
                      <SelectItem value="night">Night shift</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" data-icon="inline-start" />
              Save availability
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
