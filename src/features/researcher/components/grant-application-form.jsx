"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  FileText,
  Loader2,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const STEPS = [
  { id: 1, title: "Grant Info", icon: Award },
  { id: 2, title: "Narrative", icon: FileText },
  { id: 3, title: "Team & Budget", icon: Users },
  { id: 4, title: "Documents", icon: Upload },
  { id: 5, title: "Review & Submit", icon: Send },
];

export function GrantApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="grid gap-6">
        <Card className="mx-auto max-w-lg text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="size-7" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">Application Submitted</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your grant application has been submitted successfully. You'll receive a confirmation email with your application reference number.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button variant="outline" asChild><Link href="/researcher/grants">My Applications</Link></Button>
              <Button asChild><Link href="/researcher/grants/search">Find More Grants</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild><Link href="/researcher/grants/search"><ArrowLeft className="size-4" /></Link></Button>
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Grant Application</h2>
          <p className="text-sm text-muted-foreground">NIH R21 — Exploratory/Developmental Research</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              type="button"
              onClick={() => s.id < step && setStep(s.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                s.id === step
                  ? "bg-primary text-primary-foreground"
                  : s.id < step
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 cursor-pointer"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {s.id < step ? <CheckCircle2 className="size-3.5" /> : <s.icon className="size-3.5" />}
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{s.id}</span>
            </button>
            {i < STEPS.length - 1 && <div className="mx-1 h-px w-4 bg-border lg:w-8" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Grant Information</CardTitle>
              <CardDescription>Basic details about the grant you're applying for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-2xl">
                <div className="grid gap-1.5"><Label>Project title</Label><Input placeholder="Enter your project title" className="h-10" /></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5"><Label>Grant program</Label><Input defaultValue="NIH R21" disabled className="h-10" /></div>
                  <div className="grid gap-1.5"><Label>Funding amount requested</Label><Input placeholder="e.g. $275,000" className="h-10" /></div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5"><Label>Proposed start date</Label><Input type="date" className="h-10" /></div>
                  <div className="grid gap-1.5"><Label>Project duration</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="2">2 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-1.5"><Label>Research area</Label>
                  <Select>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select primary area" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biomedical">Biomedical Science</SelectItem>
                      <SelectItem value="clinical">Clinical Research</SelectItem>
                      <SelectItem value="community">Community Health</SelectItem>
                      <SelectItem value="global">Global Health</SelectItem>
                      <SelectItem value="informatics">Health Informatics</SelectItem>
                      <SelectItem value="public">Public Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Project Narrative</CardTitle>
              <CardDescription>Describe your research aims, significance, and approach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-2xl">
                <div className="grid gap-1.5">
                  <Label>Specific Aims (1 page)</Label>
                  <Textarea placeholder="Describe your specific aims and hypotheses..." rows={6} />
                  <p className="text-xs text-muted-foreground">Concisely state the goals and objectives of your research.</p>
                </div>
                <div className="grid gap-1.5">
                  <Label>Significance</Label>
                  <Textarea placeholder="Explain the importance and impact of the proposed research..." rows={5} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Innovation</Label>
                  <Textarea placeholder="Describe the novel aspects of your approach..." rows={5} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Approach</Label>
                  <Textarea placeholder="Detail your research design, methods, and analysis plan..." rows={6} />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Team & Budget</CardTitle>
              <CardDescription>Key personnel and budget justification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 max-w-2xl">
                <div className="grid gap-3">
                  <Label>Key Personnel</Label>
                  <div className="rounded-lg border p-3.5 flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-xs font-medium">AR</div>
                    <div className="flex-1"><p className="text-sm font-medium">Dr. Amira Rashid</p><p className="text-xs text-muted-foreground">Principal Investigator</p></div>
                    <Badge variant="outline" className="text-[10px]">PI</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-fit"><Users className="size-4" />Add Co-Investigator</Button>
                </div>
                <div className="grid gap-4">
                  <Label>Budget Breakdown</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-1.5"><Label className="text-xs">Personnel costs</Label><Input placeholder="$0" className="h-9 text-sm" /></div>
                    <div className="grid gap-1.5"><Label className="text-xs">Equipment</Label><Input placeholder="$0" className="h-9 text-sm" /></div>
                    <div className="grid gap-1.5"><Label className="text-xs">Travel</Label><Input placeholder="$0" className="h-9 text-sm" /></div>
                    <div className="grid gap-1.5"><Label className="text-xs">Other direct costs</Label><Input placeholder="$0" className="h-9 text-sm" /></div>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label>Budget justification</Label>
                  <Textarea placeholder="Justify each budget category..." rows={4} />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>Documents & Attachments</CardTitle>
              <CardDescription>Upload required documents for your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-2xl">
                {[
                  { label: "Project narrative (PDF)", required: true },
                  { label: "Biographical sketch — PI", required: true },
                  { label: "Biographical sketch — Co-Investigators", required: false },
                  { label: "Letters of support", required: false },
                  { label: "IRB approval (if applicable)", required: false },
                  { label: "Data management plan", required: true },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center justify-between rounded-lg border border-dashed p-4">
                    <div>
                      <p className="text-sm font-medium">{doc.label}</p>
                      <p className="text-xs text-muted-foreground">{doc.required ? "Required" : "Optional"} · PDF, max 10MB</p>
                    </div>
                    <Button variant="outline" size="sm"><Upload className="size-4" />Upload</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )}

        {step === 5 && (
          <>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your application before submitting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 max-w-2xl">
                {[
                  { section: "Grant Information", status: "complete" },
                  { section: "Project Narrative", status: "complete" },
                  { section: "Team & Budget", status: "complete" },
                  { section: "Documents", status: "incomplete" },
                ].map((item) => (
                  <div key={item.section} className="flex items-center justify-between rounded-lg border p-3.5">
                    <div className="flex items-center gap-3">
                      {item.status === "complete" ? (
                        <CheckCircle2 className="size-5 text-emerald-500" />
                      ) : (
                        <div className="size-5 rounded-full border-2 border-amber-400" />
                      )}
                      <p className="text-sm font-medium">{item.section}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setStep(STEPS.findIndex((s) => s.title.includes(item.section.split(" ")[0])) + 1)}>Edit</Button>
                  </div>
                ))}
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Before submitting</p>
                  <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">Please ensure all required documents are uploaded and all sections are complete. Once submitted, you cannot edit your application.</p>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          <ArrowLeft className="size-4" />Previous
        </Button>
        {step < 5 ? (
          <Button onClick={() => setStep(step + 1)}>
            Next<ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="size-4 animate-spin" />Submitting...</> : <><Send className="size-4" />Submit Application</>}
          </Button>
        )}
      </div>
    </div>
  );
}
