"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, FileUp, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "./schema/profileSchema";

export function PreceptorProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit: rhfSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Robert",
      lastName: "Williams",
      bio: "Board-certified family medicine physician with a passion for medical education. 20 years experience mentoring students in outpatient clinical settings.",
      specialty: "family",
      experience: 20,
      clinic: "City Health Clinic",
      address: "456 Health Ave, New York, NY 10002",
      maxStudents: 4,
      acceptStudents: true,
      programs: ["BSN", "MSN", "PA"]
    }
  });

  const programs = watch("programs");

  async function handleSubmit(data, e) {
    if (e) e.preventDefault();
    setIsLoading(true);
    console.log(data);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
  }

  const toggleProgram = (program) => {
    const current = programs || [];
    if (current.includes(program)) {
      setValue("programs", current.filter((p) => p !== program));
    } else {
      setValue("programs", [...current, program]);
    }
  };

  return (
    <form onSubmit={rhfSubmit(handleSubmit)} className="grid gap-6">
      <Card>
        <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
        <CardContent><div className="grid gap-4">
          <div className="flex items-center gap-5">
            <div className="relative"><Avatar className="size-20"><AvatarFallback className="bg-primary/10 text-primary text-lg">RW</AvatarFallback></Avatar><button type="button" className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"><Camera className="size-3.5 text-muted-foreground" /></button></div>
            <div className="grid gap-1"><Button type="button" variant="outline" size="sm">Upload photo</Button><p className="text-xs text-muted-foreground">Professional photo for students</p></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>First name</Label>
              <Input defaultValue="Robert" {...register("firstName")} className="h-10" />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label>Last name</Label>
              <Input defaultValue="Williams" {...register("lastName")} className="h-10" />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label>Bio</Label>
            <Textarea defaultValue="Board-certified family medicine physician with a passion for medical education. 20 years experience mentoring students in outpatient clinical settings." {...register("bio")} rows={4} />
            {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
          </div>

          <div className="grid gap-1.5"><Label>Languages</Label><div className="flex flex-wrap gap-1.5"><Badge variant="secondary">English <button className="ml-1"><Trash2 className="size-3" /></button></Badge><Badge variant="secondary">French <button className="ml-1"><Trash2 className="size-3" /></button></Badge><Button type="button" variant="outline" size="xs"><Plus className="size-3" /> Add</Button></div></div>
        </div></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Specialty & Location</CardTitle></CardHeader>
        <CardContent><div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="grid gap-1.5">
              <Label>Primary specialty</Label>
              <Controller
                control={control}
                name="specialty"
                render={({ field }) => (
                  <Select defaultValue="family" onValueChange={field.onChange}>
                    <SelectTrigger className="h-10 w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family Medicine</SelectItem>
                      <SelectItem value="internal">Internal Medicine</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="emergency">Emergency Medicine</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="obgyn">OB/GYN</SelectItem>
                      <SelectItem value="psych">Psychiatry</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.specialty && <p className="text-xs text-red-500">{errors.specialty.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label>Years of experience</Label>
              <Input type="number" defaultValue="20" {...register("experience", { valueAsNumber: true })} className="h-10" />
              {errors.experience && <p className="text-xs text-red-500">{errors.experience.message}</p>}
            </div>

          </div>

          <div className="grid gap-1.5">
            <Label>Clinical site name</Label>
            <Input defaultValue="City Health Clinic" {...register("clinic")} className="h-10" />
            {errors.clinic && <p className="text-xs text-red-500">{errors.clinic.message}</p>}
          </div>

          <div className="grid gap-1.5">
            <Label>Address</Label>
            <Input defaultValue="456 Health Ave, New York, NY 10002" {...register("address")} className="h-10" />
            {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
          </div>

        </div></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Capacity & Slot Management</CardTitle><CardDescription>Set how many students you can mentor simultaneously</CardDescription></CardHeader>
        <CardContent><div className="grid gap-4">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label>Maximum students</Label>
              <Input type="number" defaultValue="4" min="1" max="10" {...register("maxStudents", { valueAsNumber: true })} className="h-10" />
              {errors.maxStudents && <p className="text-xs text-red-500">{errors.maxStudents.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label>Current students</Label>
              <Input type="number" defaultValue="3" disabled className="h-10" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3.5">
            <div><p className="text-sm font-medium">Accept new students</p><p className="text-xs text-muted-foreground">Appear in search results for students</p></div>

            <Controller
              control={control}
              name="acceptStudents"
              render={({ field }) => (
                <Switch defaultChecked {...field} />
              )}
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Accepted programs</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["BSN", "MSN", "DNP", "MD", "DO", "PA", "DPT", "PharmD"].map((p) => (
                <label key={p} className="flex items-center gap-2 rounded-lg border p-2.5 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                  <input
                    type="checkbox"
                    checked={programs?.includes(p)}
                    onChange={() => toggleProgram(p)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>
            {errors.programs && <p className="text-xs text-red-500">{errors.programs.message}</p>}
          </div>

        </div></CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Credentials</CardTitle></CardHeader>
        <CardContent><div className="grid gap-4">
          <div className="rounded-lg border border-dashed p-6 text-center"><FileUp className="mx-auto size-8 text-muted-foreground/40" /><p className="mt-2 text-sm font-medium">Upload credentials</p><Button type="button" variant="outline" size="sm" className="mt-3">Choose files</Button></div>
          <div className="grid gap-2">
            {["Medical License — NY State", "Board Certification — Family Medicine", "Clinical Preceptor Certification"].map((doc) => (
              <div key={doc} className="flex items-center justify-between rounded-lg border p-3"><div className="flex items-center gap-2"><Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">Verified</Badge><span className="text-sm">{doc}</span></div><Button type="button" variant="ghost" size="icon-xs"><Trash2 className="size-3.5 text-muted-foreground" /></Button></div>
            ))}
          </div>
        </div></CardContent>
      </Card>

      <div className="flex justify-end"><Button type="submit" size="lg" disabled={isLoading}>{isLoading ? <><Loader2 className="size-4 animate-spin" />Saving...</> : <><Save className="size-4" data-icon="inline-start" />Save changes</>}</Button></div>
    </form>
  );
}