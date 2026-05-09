"use client";

import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { researchMatchingSchema } from "./schema/researchMatchingSchema";

const WEIGHTS = [
  {
    key: "expertise",
    label: "Expertise Match",
    description: "Weight given to matching research fields and specializations",
    defaultValue: 35,
  },
  {
    key: "deadline",
    label: "Deadline Urgency",
    description: "Priority boost for grants with approaching deadlines",
    defaultValue: 20,
  },
  {
    key: "success",
    label: "Success Rate",
    description: "Weight given to grant writer's historical success rate",
    defaultValue: 20,
  },
  {
    key: "location",
    label: "Geographic Proximity",
    description: "Preference for same-region matches",
    defaultValue: 10,
  },
  {
    key: "rating",
    label: "Client Rating",
    description: "Weight given to grant writer's client review score",
    defaultValue: 15,
  },
];

export function ResearchMatchingConfig() {
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(researchMatchingSchema),
    defaultValues: {
      weights: WEIGHTS.reduce(
        (acc, w) => ({ ...acc, [w.key]: w.defaultValue }),
        {},
      ),
      rules: {
        auto: true,
        writers: true,
        journals: true,
        cross: true,
        international: false,
        notify: true,
      },
      thresholds: {
        minMatch: "60",
        minNotify: "85",
        maxMatches: "10",
      },
    },
  });

  const values = useWatch({ control });

  const total = Object.values(values.weights || {}).reduce((s, v) => s + v, 0);

  async function onSubmit(data) {
    setIsSaving(true);
    console.log("Saved:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Research Matching Config
          </h1>
          <p className="text-muted-foreground">
            Configure matching algorithm weights and rules for the research
            vertical.
          </p>
        </div>

        <div className="ms-auto">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* WEIGHTS */}
      <Card>
        <CardHeader>
          <CardTitle>Matching Weights</CardTitle>
          <CardDescription>
            Adjust how heavily each factor influences match scores. Weights
            should sum to 100%. Current: {total}%
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 max-w-2xl">
            {WEIGHTS.map((w) => (
              <Controller
                key={w.key}
                control={control}
                name={`weights.${w.key}`}
                render={({ field }) => (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>{w.label}</Label>
                        <p className="text-xs text-muted-foreground">
                          {w.description}
                        </p>
                      </div>
                      <span className="text-sm font-semibold w-12 text-right">
                        {field.value}%
                      </span>
                    </div>

                    <Slider
                      value={[field.value]}
                      onValueChange={(v) => field.onChange(v[0])}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                )}
              />
            ))}

            {total !== 100 && (
              <p className="text-xs text-destructive font-medium">
                Weights must sum to 100%. Current total: {total}%
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* RULES */}
      <Card>
        <CardHeader>
          <CardTitle>Matching Rules</CardTitle>
          <CardDescription>Toggle matching behavior settings</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-1 max-w-2xl">
            {[
              {
                name: "auto",
                label: "Auto-match researchers to grants",
                desc: "Automatically suggest grants matching researcher profiles",
              },
              {
                name: "writers",
                label: "Auto-match researchers to grant writers",
                desc: "Suggest grant writers based on expertise alignment",
              },
              {
                name: "journals",
                label: "Auto-match researchers to journals",
                desc: "Recommend journals based on research field and publication history",
              },
              {
                name: "cross",
                label: "Cross-institution matching",
                desc: "Allow matching between different institutions",
              },
              {
                name: "international",
                label: "International matching",
                desc: "Include international grants and collaborators",
              },
              {
                name: "notify",
                label: "Notify on new matches",
                desc: "Send notifications when new matches are found",
              },
            ].map((item) => (
              <Controller
                key={item.name}
                control={control}
                name={`rules.${item.name}`}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* THRESHOLDS */}
      <Card>
        <CardHeader>
          <CardTitle>Score Thresholds</CardTitle>
          <CardDescription>
            Minimum scores for matches to appear in results
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 max-w-md">
            <div className="grid gap-1.5">
              <Label>Minimum match score to display (%)</Label>
              <Controller
                control={control}
                name="thresholds.minMatch"
                render={({ field }) => (
                  <Input type="number" className="h-10" {...field} />
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Minimum score for auto-notification (%)</Label>
              <Controller
                control={control}
                name="thresholds.minNotify"
                render={({ field }) => (
                  <Input type="number" className="h-10" {...field} />
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Maximum matches per researcher</Label>
              <Controller
                control={control}
                name="thresholds.maxMatches"
                render={({ field }) => (
                  <Input type="number" className="h-10" {...field} />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
