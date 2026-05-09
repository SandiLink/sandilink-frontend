"use client";

import { useEffect, useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "./schema/profileSchema";

const EXPERTISE_OPTIONS = [
  "NIH",
  "NSF",
  "Gates Foundation",
  "WHO",
  "PCORI",
  "RWJF",
  "ERC",
  "DOD",
  "USAID",
  "Wellcome Trust",
  "Clinical Research",
  "Global Health",
  "Health Disparities",
  "Health Equity",
  "Biostatistics",
  "AI/ML",
  "Translational Medicine",
  "Epidemiology",
  "Public Health",
];

export function GrantWriterProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [expertise, setExpertise] = useState([
    "NIH",
    "NSF",
    "Health Disparities",
    "Clinical Research",
    "Public Health",
    "Biostatistics",
  ]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Lisa",
      lastName: "Nguyen",
      title: "dr",
      degree: "phd",
      email: "lisa.nguyen@grantpro.com",
      phone: "+1 (617) 555-0142",
      location: "Boston, MA",

      professionalTitle: "Senior Grant Writer & Research Consultant",
      yearsExperience: 15,
      grantsWon: 42,
      totalFunding: "$18,500,000",
      successRate: 78,

      expertise: expertise,

      bio: "I bring over 15 years of experience in biomedical and public health grant writing, specializing in NIH R01, R21, and K-series awards. My approach combines rigorous scientific writing with strategic narrative construction to maximize funding success. I work closely with researchers to develop compelling proposals that align with funder priorities.",

      minRate: 150,
      maxRate: 250,
      availability: "available",
      maxProjects: 5,

      website: "",
      linkedin: "",
    },
  });

  const watchedExpertise = watch("expertise");

  useEffect(() => {
    setExpertise(watchedExpertise || []);
  }, [watchedExpertise]);

  function addExpertise(value) {
    if (value && !expertise.includes(value)) {
      const updated = [...expertise, value];
      setExpertise(updated);
      setValue("expertise", updated);
    }
  }

  function removeExpertise(value) {
    const updated = expertise.filter((x) => x !== value);
    setExpertise(updated);
    setValue("expertise", updated);
  }

  async function onSubmit(data) {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
    setIsLoading(false);
  }
  const Error = ({ message }) =>
    message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;

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
                <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 text-lg">
                  LN
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
                <Error message={errors.firstName?.message} />
              </div>
              <div className="grid gap-1.5">
                <Label>Last name</Label>
                <Input {...register("lastName")} className="h-10" />
                <Error message={errors.lastName?.message} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Title / Prefix</Label>
                <Controller
                  name="title"
                  control={control}
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
                <Label>Highest degree</Label>
                <Controller
                  name="degree"
                  control={control}
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
                        <SelectItem value="mph">M.P.H.</SelectItem>
                        <SelectItem value="ms">M.S.</SelectItem>
                        <SelectItem value="mba">M.B.A.</SelectItem>
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
              <Error message={errors.email?.message} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Phone</Label>
                <Input {...register("phone")} type="tel" className="h-10" />
                <Error message={errors.phone?.message} />
              </div>
              <div className="grid gap-1.5">
                <Label>Location</Label>
                <Input {...register("location")} className="h-10" />
                <Error message={errors.location?.message} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Profile</CardTitle>
          <CardDescription>
            Your grant writing experience and specializations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Professional title</Label>
              <Input {...register("professionalTitle")} className="h-10" />
              <Error message={errors.professionalTitle?.message} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Years of experience</Label>
                <Input
                  {...register("yearsExperience")}
                  type="number"
                  min="0"
                  className="h-10"
                />
                <Error message={errors.yearsExperience?.message} />
              </div>
              <div className="grid gap-1.5">
                <Label>Grants won</Label>
                <Input
                  {...register("grantsWon")}
                  type="number"
                  min="0"
                  className="h-10"
                />
                <Error message={errors.grantsWon?.message} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Total funding secured</Label>
                <Input {...register("totalFunding")} className="h-10" />
              </div>
              <div className="grid gap-1.5">
                <Label>Success rate (%)</Label>
                <Input
                  {...register("successRate")}
                  type="number"
                  min="0"
                  max="100"
                  className="h-10"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Areas of expertise</Label>
              <div className="flex flex-wrap gap-1.5">
                {expertise.map((e) => (
                  <Badge key={e} variant="secondary" className="gap-1 pr-1">
                    {e}
                    <button
                      type="button"
                      onClick={() => removeExpertise(e)}
                      className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Error message={errors.expertise?.message} />
              <Select value="" onValueChange={addExpertise}>
                <SelectTrigger className="h-8 w-fit text-xs">
                  <Plus className="size-3" />
                  <span>Add expertise</span>
                </SelectTrigger>
                <SelectContent>
                  {EXPERTISE_OPTIONS.filter((e) => !expertise.includes(e)).map(
                    (e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Bio / About</Label>
              <Textarea {...register("bio")} rows={5} />
              <Error message={errors.bio?.message} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rates & Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Rates & Availability</CardTitle>
          <CardDescription>
            Set your pricing and availability status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Minimum hourly rate ($)</Label>
                <Input
                  {...register("minRate")}
                  type="number"
                  min="0"
                  className="h-10"
                />
              </div>
              <div className="grid gap-1.5">
                <Label>Maximum hourly rate ($)</Label>
                <Input
                  {...register("maxRate")}
                  type="number"
                  min="0"
                  className="h-10"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label>Availability</Label>
              <Controller
                name="availability"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">
                        Available — accepting new projects
                      </SelectItem>
                      <SelectItem value="limited">
                        Limited — selective availability
                      </SelectItem>
                      <SelectItem value="unavailable">
                        Unavailable — not accepting new projects
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Maximum concurrent projects</Label>
              <Input
                {...register("maxProjects")}
                type="number"
                min="1"
                max="20"
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle>External Links</CardTitle>
          <CardDescription>
            Your professional profiles and website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label>Personal website</Label>
              <Input
                {...register("website")}
                type="url"
                placeholder="https://yoursite.com"
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
