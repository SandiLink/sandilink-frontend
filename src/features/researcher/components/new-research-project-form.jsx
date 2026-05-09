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

const STATUSES = [
  { value: "Draft", label: "Draft — not yet submitted for funding" },
  { value: "Planned", label: "Planned — funding secured, work pending" },
  { value: "Active", label: "Active — currently in progress" },
];

export function NewResearchProjectForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    funder: "",
    funding: "",
    status: "Draft",
    startDate: "",
    endDate: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Project title is required.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`Project "${form.title}" created`, {
        description:
          form.status === "Draft"
            ? "Saved as draft. You can edit details and submit for funding later."
            : "Listed on your active research dashboard.",
      });
      router.push("/researcher/projects");
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Project details</CardTitle>
          <CardDescription>
            Required fields are marked with an asterisk. You can refine the
            details, add collaborators, and define milestones after the project
            is created.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="title">Project title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. AI-Driven Early Detection of Cardiovascular Disease"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief overview of objectives, approach, and expected outcomes."
              rows={4}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="funder">Funder / Sponsor</Label>
              <Input
                id="funder"
                value={form.funder}
                onChange={(e) => update("funder", e.target.value)}
                placeholder="NIH R01, NSF CAREER, Gates Foundation, …"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="funding">Funding amount</Label>
              <Input
                id="funding"
                value={form.funding}
                onChange={(e) => update("funding", e.target.value)}
                placeholder="$425,000"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status *</Label>
            <Select
              value={form.status}
              onValueChange={(v) => update("status", v)}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2 border-t pt-6">
          <Button type="button" variant="outline" asChild disabled={submitting}>
            <Link href="/researcher/projects">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="size-4 animate-spin" data-icon="inline-start" />}
            {submitting ? "Creating…" : "Create project"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
