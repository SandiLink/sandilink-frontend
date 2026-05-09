"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { evaluationSchema } from "./schema/evaluationSchema";

const CRITERIA = [
  { id: "clinical-skills", label: "Clinical Skills & Knowledge" },
  { id: "professionalism", label: "Professionalism" },
  { id: "communication", label: "Communication Skills" },
  { id: "critical-thinking", label: "Critical Thinking & Problem Solving" },
  { id: "initiative", label: "Initiative & Self-Direction" },
  { id: "teamwork", label: "Teamwork & Collaboration" },
  { id: "documentation", label: "Documentation & Charting" },
  { id: "patient-care", label: "Patient Care & Empathy" },
];

const RATINGS = ["Unsatisfactory", "Needs Improvement", "Satisfactory", "Good", "Excellent"];

export function StudentEvaluation({ studentId }) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      evaluationType: "mid",
      ratings: CRITERIA.reduce((acc, c) => {
        acc[c.id] = "";
        return acc;
      }, {}),
      strengths: "",
      improvements: "",
      comments: "",
      recommendation: "",
    },
  });

  async function handleSubmit(data) {
    setIsLoading(true);
    console.log(data);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/preceptor/students/${studentId}`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to student
        </Link>
      </Button>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  JS
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-muted-foreground">
                  BSN — 3rd Year — State University
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Type */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Type</CardTitle>
          </CardHeader>
          <CardContent>
            <Controller
              control={form.control}
              name="evaluationType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid">Mid-Rotation Evaluation</SelectItem>
                    <SelectItem value="final">Final Evaluation</SelectItem>
                    <SelectItem value="custom">Custom Evaluation</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </CardContent>
        </Card>

        {/* Ratings */}
        <Card>
          <CardHeader>
            <CardTitle>Competency Ratings</CardTitle>
            <CardDescription>Rate the student in each area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {CRITERIA.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between rounded-lg border p-3.5"
                >
                  <Label className="text-sm">{c.label}</Label>

                  <Controller
                    control={form.control}
                    name={`ratings.${c.id}`}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-8 w-40">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {RATINGS.map((r, i) => (
                            <SelectItem key={r} value={String(i + 1)}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Written Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>Strengths</Label>
                <Textarea {...form.register("strengths")} rows={3} placeholder="What does this student do well?" />
              </div>

              <div className="grid gap-1.5">
                <Label>Areas for improvement</Label>
                <Textarea {...form.register("improvements")} rows={3} placeholder="Where can this student grow?" />
              </div>

              <div className="grid gap-1.5">
                <Label>Overall comments</Label>
                <Textarea {...form.register("comments")} rows={3} placeholder="Any additional feedback or recommendations..." />
              </div>

              <div className="grid gap-1.5">
                <Label>Overall recommendation</Label>

                <Controller
                  control={form.control}
                  name="recommendation"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass — Student meets expectations</SelectItem>
                        <SelectItem value="pass-honors">Pass with Honors — Exceeds expectations</SelectItem>
                        <SelectItem value="remediation">Needs Remediation</SelectItem>
                        <SelectItem value="fail">Fail — Does not meet expectations</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/preceptor/students/${studentId}`}>Cancel</Link>
          </Button>

          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" data-icon="inline-start" />
                Submit evaluation
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}