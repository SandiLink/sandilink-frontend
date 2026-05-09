"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { preferencesSchema } from "./schema/preferencesSchema";

export function PreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      searchRadius: "25",
      defaultSort: "relevance",
      virtualOnly: false,
      showAvailability: true,
      visitType: "no-preference",
      reminderTime: "24h",
      autoConfirm: true,
      calendarSync: false,
      language: "en",
      contactEmail: true,
      contactSms: false,
      contactPhone: false,
    },
  });
  async function onSubmit(data) {
    setIsLoading(true);
    console.log("PREFERENCES:", data);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Preferences</CardTitle>
          <CardDescription>
            Customize how provider search results appear
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* SEARCH RADIUS */}
              <Controller
                control={control}
                name="searchRadius"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Search radius</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 miles</SelectItem>
                        <SelectItem value="10">10 miles</SelectItem>
                        <SelectItem value="25">25 miles</SelectItem>
                        <SelectItem value="50">50 miles</SelectItem>
                        <SelectItem value="100">100 miles</SelectItem>
                        <SelectItem value="any">Any distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="defaultSort"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Default sort</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="rating">Highest rated</SelectItem>
                        <SelectItem value="availability">
                          Soonest available
                        </SelectItem>
                        <SelectItem value="price-low">
                          Price: low to high
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: high to low
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <Controller
              control={control}
              name="virtualOnly"
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border p-3.5">
                  <div>
                    <p className="text-sm font-medium">Virtual visits only</p>
                    <p className="text-xs text-muted-foreground">
                      Only show providers who offer telehealth
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="showAvailability"
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border p-3.5">
                  <div>
                    <p className="text-sm font-medium">Show availability</p>
                    <p className="text-xs text-muted-foreground">
                      Display next available slot in search results
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                control={control}
                name="visitType"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Preferred visit type</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-preference">
                          No preference
                        </SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="in-person">In-person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="reminderTime"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Reminder timing</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 minutes before</SelectItem>
                        <SelectItem value="1h">1 hour before</SelectItem>
                        <SelectItem value="24h">24 hours before</SelectItem>
                        <SelectItem value="48h">48 hours before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <Controller
              control={control}
              name="autoConfirm"
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border p-3.5">
                  <div>
                    <p className="text-sm font-medium">Auto-confirm bookings</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically confirm when a provider accepts
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="calendarSync"
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border p-3.5">
                  <div>
                    <p className="text-sm font-medium">Calendar sync</p>
                    <p className="text-xs text-muted-foreground">
                      Add bookings to your calendar automatically
                    </p>
                  </div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <div className="grid gap-1.5">
                  <Label>Preferred language</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-10 w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="zh">Chinese (Mandarin)</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <div>
              <p className="mb-3 text-sm font-medium">
                Allow providers to contact me via
              </p>
              <Controller
                control={control}
                name="contactEmail"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-sm font-normal">Email</Label>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="contactSms"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-sm font-normal">
                      SMS / Text messages
                    </Label>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="contactPhone"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label className="text-sm font-normal">Phone calls</Label>
                  </div>
                )}
              />
            </div>
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
              <Save className="size-4" />
              Save preferences
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
