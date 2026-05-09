"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings2, Save } from "lucide-react";

import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    specialtyWeight: z.array(z.number()),
    distanceWeight: z.array(z.number()),
    ratingWeight: z.array(z.number()),
    availabilityWeight: z.array(z.number()),
    maxDistance: z.string(),
    minRating: z.string(),
    matchThreshold: z.string(),
  })
  .refine(
    (data) => {
      const total =
        data.specialtyWeight[0] +
        data.distanceWeight[0] +
        data.ratingWeight[0] +
        data.availabilityWeight[0];
      return total === 100;
    },
    {
      message: "Total weight must equal 100%",
      path: ["specialtyWeight"],
    },
  );

export default function MatchingConfig() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      specialtyWeight: [40],
      distanceWeight: [25],
      ratingWeight: [20],
      availabilityWeight: [15],
      maxDistance: "50",
      minRating: "3.0",
      matchThreshold: "60",
    },
  });

  const values = useWatch({ control });

  const totalWeight =
    values.specialtyWeight?.[0] +
    values.distanceWeight?.[0] +
    values.ratingWeight?.[0] +
    values.availabilityWeight?.[0];

  const onSubmit = (data) => {
    console.log("Config saved:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
          <Settings2 className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Matching Algorithm
          </h1>
          <p className="text-muted-foreground">
            Configure matching parameters and weights for provider-student
            pairing
          </p>
        </div>
      </div>

      {/* WEIGHTS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Matching Weights</span>
            <span
              className={`text-sm font-normal ${
                totalWeight === 100 ? "text-green-600" : "text-red-600"
              }`}
            >
              Total: {totalWeight}% {totalWeight !== 100 && "(must equal 100%)"}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* SPECIALTY */}
          <Controller
            control={control}
            name="specialtyWeight"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Specialty Match</Label>
                  <span className="text-sm font-medium">{field.value[0]}%</span>
                </div>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  How closely the provider's specialty matches the student's
                  needs.
                </p>
              </div>
            )}
          />

          {/* DISTANCE */}
          <Controller
            control={control}
            name="distanceWeight"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Distance / Proximity</Label>
                  <span className="text-sm font-medium">{field.value[0]}%</span>
                </div>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Geographic proximity between provider and student.
                </p>
              </div>
            )}
          />

          {/* RATING */}
          <Controller
            control={control}
            name="ratingWeight"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Rating</Label>
                  <span className="text-sm font-medium">{field.value[0]}%</span>
                </div>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Provider's average review rating and feedback score.
                </p>
              </div>
            )}
          />

          {/* AVAILABILITY */}
          <Controller
            control={control}
            name="availabilityWeight"
            render={({ field }) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Availability</Label>
                  <span className="text-sm font-medium">{field.value[0]}%</span>
                </div>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={100}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  Whether the provider has open slots matching the student's
                  schedule.
                </p>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* PARAMETERS */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Parameters</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MAX DISTANCE */}
            <Controller
              control={control}
              name="maxDistance"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Maximum Distance (miles)</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                      <SelectItem value="100">100 miles</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* MIN RATING */}
            <Controller
              control={control}
              name="minRating"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Minimum Provider Rating</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No minimum</SelectItem>
                      <SelectItem value="2.0">2.0 stars</SelectItem>
                      <SelectItem value="3.0">3.0 stars</SelectItem>
                      <SelectItem value="3.5">3.5 stars</SelectItem>
                      <SelectItem value="4.0">4.0 stars</SelectItem>
                      <SelectItem value="4.5">4.5 stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* MATCH THRESHOLD */}
            <Controller
              control={control}
              name="matchThreshold"
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Match Score Threshold (%)</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40">40% (Lenient)</SelectItem>
                      <SelectItem value="50">50%</SelectItem>
                      <SelectItem value="60">60% (Default)</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="80">80% (Strict)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <Button type="submit" className="gap-2" disabled={totalWeight !== 100}>
          <Save className="h-4 w-4" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
}
