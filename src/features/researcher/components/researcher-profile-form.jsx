"use client";

import { useState } from "react";
import { Camera, Loader2, Plus, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "./schema/profileSchema";

const RESEARCH_FIELDS = [
  "Biomedical Science",
  "Clinical Research",
  "Community Health",
  "Epidemiology",
  "Global Health",
  "Health Informatics",
  "Mental Health",
  "Nursing Research",
  "Pharmacology",
  "Public Health",
  "Translational Medicine",
  "Other",
];

export function ResearcherProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const { register, handleSubmit, control, setValue, watch } = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: "Amira",
      lastName: "Rashid",
      title: "dr",
      degree: "phd",
      email: "a.rashid@universitymed.edu",
      phone: "",
      institution: "University Medical Center",
      department: "Department of Public Health Sciences",
      position: "assistant",
      country: "United States",
      city: "Boston",
      primaryField: "public-health",
      secondaryField: "health-informatics",
      orcid: "0000-0002-1234-5678",
      scholar: "",
      summary: `My research focuses on leveraging machine learning and community-based approaches to address health disparities in underserved populations. I specialize in translational research that bridges clinical diagnostics with public health interventions.`,
      website: "",
      researchgate: "",
      linkedin: "",
      keywords: [
        "machine learning",
        "health disparities",
        "clinical diagnostics",
        "global health",
      ],
    },
  });

  const keywords = useWatch({
    control,
    name: "keywords",
    defaultValue: [],
  });

  function addKeyword() {
    const trimmed = newKeyword.trim().toLowerCase();
    const current = watch("keywords") || [];

    if (trimmed && !current.includes(trimmed)) {
      setValue("keywords", [...current, trimmed], {
        shouldDirty: true,
        shouldValidate: true,
      });
      setNewKeyword("");
    }
  }

  function removeKeyword(kw) {
    const current = watch("keywords") || [];

    setValue(
      "keywords",
      current.filter((k) => k !== kw),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  async function onSubmit(data) {
    setIsLoading(true);

    console.log(data); // keywords already included

    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }

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
                <AvatarFallback className="bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-lg">
                  AR
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

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>First name</Label>
                <Input {...register("firstName")} className="h-10" />
              </div>
              <div className="grid gap-1.5">
                <Label>Last name</Label>
                <Input {...register("lastName")} className="h-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Title / Prefix</Label>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dr">Dr.</SelectItem>
                        <SelectItem value="prof">Prof.</SelectItem>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="mx">Mx.</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Degree</Label>
                <Controller
                  control={control}
                  name="degree"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                        <SelectItem value="md">M.D.</SelectItem>
                        <SelectItem value="mdphd">M.D./Ph.D.</SelectItem>
                        <SelectItem value="drph">Dr.P.H.</SelectItem>
                        <SelectItem value="dsc">D.Sc.</SelectItem>
                        <SelectItem value="ms">M.S.</SelectItem>
                        <SelectItem value="mph">M.P.H.</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Email</Label>
              <Input {...register("email")} type="email" className="h-10" />
            </div>
            <div className="grid gap-1.5">
              <Label>Phone</Label>
              <Input {...register("phone")} type="tel" className="h-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Institutional Affiliation */}
      <Card>
        <CardHeader>
          <CardTitle>Institutional Affiliation</CardTitle>
          <CardDescription>
            Your university, hospital, or research organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Institution name</Label>
              <Input {...register("institution")} className="h-10" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Department</Label>
                <Input {...register("department")} className="h-10" />
              </div>
              <div className="grid gap-1.5">
                <Label>Position</Label>
                <Controller
                  control={control}
                  name="position"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="postdoc">
                          Postdoctoral Fellow
                        </SelectItem>
                        <SelectItem value="assistant">
                          Assistant Professor
                        </SelectItem>
                        <SelectItem value="associate">
                          Associate Professor
                        </SelectItem>
                        <SelectItem value="full">Full Professor</SelectItem>
                        <SelectItem value="researcher">
                          Research Scientist
                        </SelectItem>
                        <SelectItem value="student">
                          Graduate Student
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Country</Label>
                <Input {...register("country")} className="h-10" />
              </div>
              <div className="grid gap-1.5">
                <Label>City</Label>
                <Input {...register("city")} className="h-10" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Research Profile</CardTitle>
          <CardDescription>
            Your areas of expertise and research identifiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Primary research field</Label>
                <Controller
                  control={control}
                  name="primaryField"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select primary field" />
                      </SelectTrigger>
                      <SelectContent>
                        {RESEARCH_FIELDS.map((f) => (
                          <SelectItem
                            key={f}
                            value={f.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Secondary research field</Label>
                <Controller
                  control={control}
                  name="secondaryField"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select secondary field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {RESEARCH_FIELDS.map((f) => (
                          <SelectItem
                            key={f}
                            value={f.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Research keywords</Label>
              <div className="flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <Badge key={kw} variant="secondary" className="gap-1 pr-1">
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Add a keyword..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addKeyword}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>ORCID</Label>
                <Input
                  {...register("orcid")}
                  placeholder="0000-0000-0000-0000"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Your unique researcher identifier
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label>Google Scholar ID</Label>
                <Input
                  {...register("scholar")}
                  placeholder="e.g. AbCdEfGhIjK"
                  className="h-10"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Research summary</Label>
              <Textarea {...register("summary")} rows={4} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle>External Links</CardTitle>
          <CardDescription>
            Your academic and professional profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Personal / Lab website</Label>
              <Input
                {...register("website")}
                type="url"
                placeholder="https://yourlab.edu"
                className="h-10"
              />
            </div>
            <div className="grid gap-1.5">
              <Label>ResearchGate profile</Label>
              <Input
                {...register("researchgate")}
                type="url"
                placeholder="https://researchgate.net/profile/..."
                className="h-10"
              />
            </div>
            <div className="grid gap-1.5">
              <Label>LinkedIn</Label>
              <Input
                {...register("linkedin")}
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save profile"
          )}
        </Button>
      </div>
    </form>
  );
}
