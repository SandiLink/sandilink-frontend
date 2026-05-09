"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const AGREEMENT_TYPES = [
  { value: "affiliation", label: "Affiliation Agreement" },
  { value: "clinical-site", label: "Clinical Site Agreement" },
  { value: "memorandum", label: "Memorandum of Understanding" },
];

const TERM_OPTIONS = [
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "24", label: "24 months" },
  { value: "36", label: "36 months" },
];

export function NewAgreementForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    site: "",
    preceptor: "",
    type: "affiliation",
    term: "12",
    effectiveDate: "",
    notes: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.site.trim() || !form.preceptor.trim()) {
      toast.error("Clinical site and preceptor are required.");
      return;
    }
    setSubmitting(true);
    // Simulate the API call. In real life this would be a fetch to
    // POST /api/agreements; on success we redirect back to the list.
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Agreement drafted for ${form.site}`, {
        description: `Pending signature from ${form.preceptor}.`,
      });
      router.push("/institution/agreements");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Agreement details</CardTitle>
          <CardDescription>
            Required fields are marked with an asterisk. The agreement is created in
            <em> Pending</em> status until the preceptor signs it.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="site">Clinical Site *</Label>
            <Input
              id="site"
              value={form.site}
              onChange={(e) => update("site", e.target.value)}
              placeholder="e.g. City Health Clinic"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="preceptor">Preceptor *</Label>
            <Input
              id="preceptor"
              value={form.preceptor}
              onChange={(e) => update("preceptor", e.target.value)}
              placeholder="e.g. Dr. Robert Williams"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="type">Agreement Type *</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AGREEMENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="term">Term length</Label>
              <Select value={form.term} onValueChange={(v) => update("term", v)}>
                <SelectTrigger id="term">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TERM_OPTIONS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="effectiveDate">Effective date</Label>
            <Input
              id="effectiveDate"
              type="date"
              value={form.effectiveDate}
              onChange={(e) => update("effectiveDate", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Internal notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Anything the legal team or counterparty should know."
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2 border-t pt-6">
          <Button type="button" variant="outline" asChild disabled={submitting}>
            <Link href="/institution/agreements">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="size-4 animate-spin" data-icon="inline-start" />}
            {submitting ? "Sending…" : "Send for signature"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
