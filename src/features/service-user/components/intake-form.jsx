"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Progress } from "@/components/ui/progress";

export function IntakeForm({ bookingId }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: encrypt and submit intake form
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    window.location.href = `/dashboard/engagements/${bookingId}/confirm`;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6 grid gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step 1 of 3 — Intake Form</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>

      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/dashboard/experts/${bookingId}`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to provider
        </Link>
      </Button>

      {/* Security notice */}
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <div>
          <span className="font-medium">Your information is encrypted.</span>{" "}
          <span className="text-muted-foreground">
            Only your assigned provider can view this form. Platform
            administrators cannot access this data.
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Medical history */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <div>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  This information helps your provider prepare for your visit
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="conditions">
                  Existing medical conditions
                </Label>
                <Textarea
                  id="conditions"
                  name="conditions"
                  placeholder="e.g., diabetes, hypertension, asthma..."
                  rows={3}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="medications">Current medications</Label>
                <Textarea
                  id="medications"
                  name="medications"
                  placeholder="List any medications you're currently taking, including dosage..."
                  rows={3}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  placeholder="e.g., penicillin, latex, peanuts..."
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="bloodType">Blood type (if known)</Label>
                  <Select name="bloodType">
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unknown">Don't know</SelectItem>
                      <SelectItem value="a+">A+</SelectItem>
                      <SelectItem value="a-">A-</SelectItem>
                      <SelectItem value="b+">B+</SelectItem>
                      <SelectItem value="b-">B-</SelectItem>
                      <SelectItem value="ab+">AB+</SelectItem>
                      <SelectItem value="ab-">AB-</SelectItem>
                      <SelectItem value="o+">O+</SelectItem>
                      <SelectItem value="o-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="smoker">Smoking status</Label>
                  <Select name="smoker">
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never smoked</SelectItem>
                      <SelectItem value="former">Former smoker</SelectItem>
                      <SelectItem value="current">Current smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reason for visit */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <div>
                <CardTitle>Reason for Visit</CardTitle>
                <CardDescription>
                  Help your provider understand what you need
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="reason">Primary reason for this visit</Label>
                <Select name="reason">
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checkup">Annual check-up</SelectItem>
                    <SelectItem value="new-issue">New health issue</SelectItem>
                    <SelectItem value="follow-up">Follow-up visit</SelectItem>
                    <SelectItem value="prescription">Prescription refill</SelectItem>
                    <SelectItem value="referral">Referral consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="symptoms">
                  Describe your symptoms or concerns
                </Label>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="Please describe what you're experiencing, when it started, and any relevant details..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="duration">How long have you had these symptoms?</Label>
                <Select name="duration">
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Started today</SelectItem>
                    <SelectItem value="days">A few days</SelectItem>
                    <SelectItem value="week">About a week</SelectItem>
                    <SelectItem value="weeks">2-4 weeks</SelectItem>
                    <SelectItem value="month">Over a month</SelectItem>
                    <SelectItem value="chronic">Chronic / ongoing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Checkbox id="consent" name="consent" required className="mt-0.5" />
              <Label htmlFor="consent" className="text-sm font-normal leading-snug">
                I confirm that the information provided is accurate to the best
                of my knowledge. I consent to sharing this information with
                my assigned care provider for the purpose of this appointment.
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/dashboard/experts/${bookingId}`}>Cancel</Link>
          </Button>
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Continue to confirmation"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
