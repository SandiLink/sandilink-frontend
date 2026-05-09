"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { notSchema } from "./schema/noteSchema";

const NOTES = [
  {
    id: "1",
    date: "Mar 31, 2026",
    category: "Clinical Skills",
    text: "Jane demonstrated excellent assessment skills with the diabetic patient today. Her care plan was thorough and well-reasoned.",
    visibility: "private",
  },
  {
    id: "2",
    date: "Mar 28, 2026",
    category: "Communication",
    text: "Great job explaining the medication regimen to Mrs. Thompson. Patient seemed very comfortable with Jane's approach.",
    visibility: "shared",
  },
  {
    id: "3",
    date: "Mar 25, 2026",
    category: "Area for Growth",
    text: "Needs more practice with IV insertions. Schedule additional practice sessions next week.",
    visibility: "private",
  },
  {
    id: "4",
    date: "Mar 20, 2026",
    category: "Professionalism",
    text: "Arrived 15 minutes early and had reviewed all patient charts before rounds. Excellent preparation.",
    visibility: "shared",
  },
];

export function PerformanceNotes({ studentId }) {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(notSchema),
    defaultValues: {
      category: "",
      visibility: "private",
      note: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Submitted:", data);
    setIsLoading(false);
    setShowForm(false);
    reset();
  };

  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/preceptor/students/${studentId}`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to student
        </Link>
      </Button>

      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Performance Notes — Jane Smith
          </h2>
          <p className="text-sm text-muted-foreground">
            Document observations, feedback, and milestones during the rotation.
          </p>
        </div>

        {/* Add note */}
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
            <CardAction>
              {!showForm && (
                <Button size="sm" onClick={() => setShowForm(true)}>
                  <Plus className="size-3.5" data-icon="inline-start" />
                  New note
                </Button>
              )}
            </CardAction>
          </CardHeader>

          {showForm && (
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label>Category</Label>

                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clinical">
                              Clinical Skills
                            </SelectItem>
                            <SelectItem value="communication">
                              Communication
                            </SelectItem>
                            <SelectItem value="professionalism">
                              Professionalism
                            </SelectItem>
                            <SelectItem value="growth">
                              Area for Growth
                            </SelectItem>
                            <SelectItem value="milestone">Milestone</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-xs text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Visibility</Label>

                    <Controller
                      name="visibility"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="private"
                          value={field.value}
                        >
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">
                              Private (only you)
                            </SelectItem>
                            <SelectItem value="shared">
                              Shared with student
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.visibility && (
                      <p className="text-xs text-red-500">
                        {errors.visibility.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <Label>Note</Label>
                  <Textarea
                    placeholder="Write your observation or feedback..."
                    rows={4}
                    {...register("note")}
                  />
                  {errors.note && (
                    <p className="text-xs text-red-500">
                      {errors.note.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save note"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Notes list */}
        <Card>
          <CardHeader>
            <CardTitle>All Notes</CardTitle>
            <CardDescription>{NOTES.length} notes documented</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3">
              {NOTES.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {note.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {note.visibility === "private" ? "Private" : "Shared"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {note.date}
                      </span>
                      <Button variant="ghost" size="icon-xs">
                        <Trash2 className="size-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{note.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
