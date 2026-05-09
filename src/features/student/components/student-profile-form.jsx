"use client";

import { useState } from "react";
import { Camera, Loader2, Save } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./schema/profileSchema";

export function StudentProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@university.edu",
      institution: "State University School of Nursing",
      program: "bsn",
      year: "3",
      studentId: "STU-2024-4821",
      graduation: "2027-05",
      clinicalHours: 640,
      bio: "Third-year nursing student passionate about family medicine and community health. Looking for clinical placement opportunities to gain hands-on experience.",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    console.log(data);

    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {/* Photo */}
      <Card>
        <CardHeader>
          <CardTitle>Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  JS
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
              >
                <Camera className="size-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="grid gap-1">
              <Button type="button" variant="outline" size="sm">
                Upload photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>First name</Label>
                <Input className="h-10" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label>Last name</Label>
                <Input className="h-10" {...register("lastName")} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Email</Label>
              <Input type="email" className="h-10" {...register("email")} />
            </div>
            <div className="grid gap-1.5">
              <Label>Phone</Label>
              <Input type="tel" className="h-10" {...register("phone")} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic info */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <CardDescription>Your school and program details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Institution name</Label>
              <Input className="h-10" {...register("institution")} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Program</Label>
                <Controller
                  control={control}
                  name="program"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bsn">
                          BSN — Bachelor of Science in Nursing
                        </SelectItem>
                        <SelectItem value="msn">
                          MSN — Master of Science in Nursing
                        </SelectItem>
                        <SelectItem value="dnp">
                          DNP — Doctor of Nursing Practice
                        </SelectItem>
                        <SelectItem value="md">
                          MD — Doctor of Medicine
                        </SelectItem>
                        <SelectItem value="do">
                          DO — Doctor of Osteopathic Medicine
                        </SelectItem>
                        <SelectItem value="pa">
                          PA — Physician Assistant
                        </SelectItem>
                        <SelectItem value="pt">
                          DPT — Physical Therapy
                        </SelectItem>
                        <SelectItem value="pharm">PharmD — Pharmacy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Year</Label>
                <Controller
                  control={control}
                  name="year"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="5">5th Year+</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Student ID</Label>
                <Input className="h-10" {...register("studentId")} />
              </div>
              <div className="grid gap-1.5">
                <Label>Expected graduation</Label>
                <Input
                  type="month"
                  className="h-10"
                  {...register("graduation")}
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Clinical hours required</Label>
              <Input
                type="number"
                className="h-10"
                {...register("clinicalHours")}
              />
              <p className="text-xs text-muted-foreground">
                Total clinical hours your program requires for graduation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>About You</CardTitle>
          <CardDescription>A brief introduction for preceptors</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea rows={4} {...register("bio")} />
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
              Save changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
