"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, CheckCircle2, Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PROVIDER = {
  name: "Dr. Sarah Johnson",
  specialty: "General Practice",
  initials: "SJ",
  date: "Mar 28, 2026",
};

const RATING_LABELS = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="rounded p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={`size-8 ${
              star <= (hover || value)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewForm({ bookingId }) {
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("serviceUserDetail.reviewForm");

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) return;

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      rating,
      review: formData.get("review"),
      recommend: formData.get("recommend"),
    };

    // TODO: submit review via API
    console.log("Submit review:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          {t("thankYouHeading")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your feedback helps other patients find great providers and helps{" "}
          {PROVIDER.name} improve their practice.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link href="/dashboard/engagements">Back to bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/dashboard/engagements/${bookingId}`}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          Back to booking
        </Link>
      </Button>

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Provider info */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {PROVIDER.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{PROVIDER.name}</p>
                <p className="text-xs text-muted-foreground">
                  {PROVIDER.specialty} — {PROVIDER.date}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>How was your experience?</CardTitle>
            <CardDescription>
              Rate your visit with {PROVIDER.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <StarRating value={rating} onChange={setRating} />
              {rating > 0 && (
                <p className="text-sm font-medium text-primary">
                  {RATING_LABELS[rating - 1]}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Written review */}
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>
              Share details about your experience (optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Textarea
                name="review"
                placeholder="What went well? What could be improved? Would you recommend this provider?"
                rows={5}
              />

              <div>
                <Label className="text-sm font-medium">
                  Would you recommend this provider?
                </Label>
                <div className="mt-2 flex gap-2">
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="recommend"
                      value="yes"
                      className="peer sr-only"
                      defaultChecked
                    />
                    <div className="flex items-center justify-center rounded-lg border p-2.5 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:font-medium peer-checked:text-primary hover:bg-muted/50">
                      Yes
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="radio"
                      name="recommend"
                      value="no"
                      className="peer sr-only"
                    />
                    <div className="flex items-center justify-center rounded-lg border p-2.5 text-sm transition-colors peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:font-medium peer-checked:text-primary hover:bg-muted/50">
                      No
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/dashboard/engagements/${bookingId}`}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={rating === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit review"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
