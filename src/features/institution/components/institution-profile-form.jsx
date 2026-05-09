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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./schema/profileSchema";

export function InstitutionProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      institutionName: "State University",
      department: "School of Nursing",
      type: "university",
      website: "https://nursing.stateuniversity.edu",
      description:
        "State University School of Nursing is a leading institution offering BSN, MSN, and DNP programs with a focus on clinical excellence and community health.",

      contactName: "Dr. Patricia Adams",
      title: "Clinical Placement Coordinator",
      email: "padams@stateuniversity.edu",
      phone: "+1 (555) 123-4567",
      address: "100 University Dr, New York, NY 10003",

      programs: ["BSN", "MSN", "DNP"],
    },
  });

  const selectedPrograms = watch("programs");

  async function onSubmit(data) {
    setIsLoading(true);
    console.log("Submitted:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }

  const toggleProgram = (program) => {
    const current = selectedPrograms || [];
    const updated = current.includes(program)
      ? current.filter((p) => p !== program)
      : [...current, program];

    setValue("programs", updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="size-20">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    SU
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
                  Upload logo
                </Button>
                <p className="text-xs text-muted-foreground">
                  Your institution's logo
                </p>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Institution name</Label>
              <Input className="h-10" {...register("institutionName")} />
            </div>
            <div className="grid gap-1.5">
              <Label>Department / School</Label>
              <Input className="h-10" {...register("department")} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Type</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="hospital-system">
                          Hospital System
                        </SelectItem>
                        <SelectItem value="community">
                          Community College
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Website</Label>
                <Input className="h-10" {...register("website")} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Description</Label>
              <Textarea rows={4} {...register("description")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Primary contact name</Label>
                <Input className="h-10" {...register("contactName")} />
              </div>
              <div className="grid gap-1.5">
                <Label>Title</Label>
                <Input className="h-10" {...register("title")} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Email</Label>
                <Input type="email" className="h-10" {...register("email")} />
              </div>
              <div className="grid gap-1.5">
                <Label>Phone</Label>
                <Input type="tel" className="h-10" {...register("phone")} />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Address</Label>
              <Input className="h-10" {...register("address")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Programs Offered</CardTitle>
          <CardDescription>
            Select the programs your institution offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {["BSN", "MSN", "DNP", "MD", "DO", "PA", "DPT", "PharmD"].map(
              (p) => (
                <label
                  key={p}
                  className="flex items-center gap-2 rounded-lg border p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={selectedPrograms?.includes(p)}
                    onChange={() => toggleProgram(p)}
                  />
                  <span className="text-sm">{p}</span>
                </label>
              ),
            )}
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
              Save changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
