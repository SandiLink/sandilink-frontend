"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Paperclip,
  Phone,
} from "lucide-react";
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

const CATEGORIES = [
  { value: "account", label: "Account & Login" },
  { value: "billing", label: "Billing & Payments" },
  { value: "placements", label: "Placements & Matching" },
  { value: "technical", label: "Technical Issue" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "other", label: "Other" },
];

const PRIORITIES = [
  { value: "low", label: "Low — General question" },
  { value: "medium", label: "Medium — Something isn't working right" },
  { value: "high", label: "High — I'm blocked and need help urgently" },
];

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    title: "Email Us",
    description: "support@onesandi.com",
    detail: "We typically respond within 24 hours",
    color:
      "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "(555) 123-4567",
    detail: "Mon–Fri, 9 AM – 5 PM EST",
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team",
    detail: "Available during business hours",
    color:
      "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
];

export function ContactSupportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="grid gap-6">
        <Card className="mx-auto max-w-lg text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              Request Submitted
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We&apos;ve received your support request and will get back to you
              within 24 hours. Check your email for a confirmation with your
              ticket number.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Contact Support
        </h2>
        <p className="text-sm text-muted-foreground">
          Describe your issue and we&apos;ll get back to you as soon as
          possible.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {CONTACT_OPTIONS.map((opt) => (
          <Card key={opt.title} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${opt.color}`}
                >
                  <opt.icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{opt.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {opt.description}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {opt.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Request</CardTitle>
          <CardDescription>
            Fill out the form below and our team will review your request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label>Subject</Label>
              <Input
                placeholder="Brief summary of your issue"
                required
                className="h-10"
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Description</Label>
              <Textarea
                placeholder="Please describe your issue in detail. Include any steps to reproduce the problem, error messages, or screenshots if applicable."
                required
                rows={5}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>Attachments (optional)</Label>
              <div className="flex items-center gap-2 rounded-lg border border-dashed p-4">
                <Paperclip className="size-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Drag files here or{" "}
                    <button
                      type="button"
                      className="text-primary underline underline-offset-2"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
