"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Camera, Loader2, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { profileSchema } from "./schema/profileSchema";

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "user@example.com",
      phone: "",
      dob: "",
      gender: undefined,

      street: "",
      city: "",
      state: "",
      zip: "",

      bio: "",

      ecName: "",
      ecRelation: undefined,
      ecPhone: "",
      ecEmail: "",
    },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    console.log("PROFILE DATA:", data);

    await new Promise((r) => setTimeout(r, 1000));

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      {/* ===== AVATAR (unchanged UI) ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Photo</CardTitle>
          <CardDescription>
            Your profile photo helps providers recognize you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="size-20">
                <AvatarImage src="" alt="Profile" />
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
          </div>
        </CardContent>
      </Card>

      {/* ===== PERSONAL INFO ===== */}
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

            <div className="grid gap-1.5">
              <Label>Email</Label>
              <Input type="email" {...register("email")} className="h-10" />
            </div>

            <div className="grid gap-1.5">
              <Label>Phone</Label>
              <Input {...register("phone")} className="h-10" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Date of birth</Label>
                <Input type="date" {...register("dob")} className="h-10" />
              </div>

              {/* SELECT (Controller required) */}
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Gender</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== ADDRESS ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Input
              placeholder="Street"
              {...register("street")}
              className="h-10"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                placeholder="City"
                {...register("city")}
                className="h-10"
              />
              <Input
                placeholder="State"
                {...register("state")}
                className="h-10"
              />
              <Input placeholder="ZIP" {...register("zip")} className="h-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== BIO ===== */}
      <Card>
        <CardHeader>
          <CardTitle>About You</CardTitle>
        </CardHeader>

        <CardContent>
          <Textarea {...register("bio")} rows={4} />
        </CardContent>
      </Card>

      {/* ===== EMERGENCY CONTACT ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Input
              placeholder="Full name"
              {...register("ecName")}
              className="h-10"
            />

            <Controller
              control={control}
              name="ecRelation"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input placeholder="Phone number" {...register("ecPhone")} className="h-10" />
            <Input placeholder="Email" type="email" {...register("ecEmail")} className="h-10" />
          </div>
        </CardContent>
      </Card>

      {/* ===== SAVE ===== */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
