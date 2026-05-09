"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Loader2,
  Plus,
  Send,
  Upload,
  Users,
  X,
} from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { submissionSchema } from "./schema/submissionSchema";

const STEPS = [
  { id: 1, title: "Journal", icon: BookOpen },
  { id: 2, title: "Manuscript", icon: FileText },
  { id: 3, title: "Authors", icon: Users },
  { id: 4, title: "Files", icon: Upload },
  { id: 5, title: "Review", icon: Send },
];

const SUGGESTED_JOURNALS = [
  {
    id: "jrnl-001",
    name: "The Lancet Digital Health",
    match: 94,
    impactFactor: 36.6,
  },
  { id: "jrnl-004", name: "JAMA Network Open", match: 87, impactFactor: 13.8 },
  {
    id: "jrnl-005",
    name: "Journal of Biomedical Informatics",
    match: 82,
    impactFactor: 8.0,
  },
  { id: "jrnl-006", name: "BMC Public Health", match: 78, impactFactor: 4.5 },
];

export function ManuscriptSubmissionForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [newKeyword, setNewKeyword] = useState("");

  const {
    register,
    handleSubmit: rhfSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      journal: "",
      title: "",
      articleType: "",
      abstract: "",
      keywords: ["machine learning", "health disparities"],
      coverLetter: "",
    },
  });

  async function handleSubmit(data) {
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
            <h3 className="mt-4 font-heading text-lg font-semibold">
              Manuscript Submitted
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your manuscript has been submitted to{" "}
              {selectedJournal || "the selected journal"}. You'll receive a
              confirmation email with your manuscript tracking number.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/researcher/submissions">My Submissions</Link>
              </Button>
              <Button asChild>
                <Link href="/researcher/journals">Browse Journals</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={rhfSubmit(handleSubmit)}>
      <div className="grid gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/researcher/submissions">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Submit Manuscript
            </h2>
            <p className="text-sm text-muted-foreground">
              Prepare and submit your manuscript to a journal.
            </p>
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
                {s.id < step ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <s.icon className="size-3.5" />
                )}
                <span className="hidden sm:inline">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="mx-1 h-px w-4 bg-border lg:w-8" />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Select Journal</CardTitle>
                <CardDescription>
                  Choose a target journal based on your research profile match
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-2xl">
                  <div className="grid gap-1.5">
                    <Label>Recommended journals (based on your profile)</Label>
                    <div className="grid gap-2">
                      {SUGGESTED_JOURNALS.map((j) => (
                        <button
                          key={j.id}
                          type="button"
                          onClick={() => {
                            setSelectedJournal(j.name);
                            setValue("journal", j.name);
                          }}
                          className={`flex items-center justify-between rounded-lg border p-3.5 text-left transition-colors hover:bg-muted/50 ${selectedJournal === j.name ? "border-primary bg-primary/5 ring-1 ring-primary" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                              <BookOpen className="size-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{j.name}</p>
                              <p className="text-xs text-muted-foreground">
                                IF: {j.impactFactor}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={j.match >= 90 ? "default" : "secondary"}
                            className="text-[10px]"
                          >
                            {j.match}% match
                          </Badge>
                        </button>
                      ))}
                      <input type="hidden" {...register("journal")} />
                      {errors.journal && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.journal.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Or search for a specific journal</Label>
                    <Input
                      placeholder="Search by journal name..."
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Manuscript Details</CardTitle>
                <CardDescription>
                  Enter your manuscript information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-2xl">
                  <div className="grid gap-1.5">
                    <Label>Manuscript title</Label>
                    <Input
                      {...register("title")}
                      placeholder="Enter the full title of your manuscript"
                      className="h-10"
                    />
                    {errors.title && (
                      <p className="text-xs text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Article type</Label>
                    <Controller
                      control={control}
                      name="articleType"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select article type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="original">
                              Original Research
                            </SelectItem>
                            <SelectItem value="review">
                              Review Article
                            </SelectItem>
                            <SelectItem value="systematic">
                              Systematic Review
                            </SelectItem>
                            <SelectItem value="comment">Commentary</SelectItem>
                            <SelectItem value="case">Case Study</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.articleType && (
                      <p className="text-xs text-red-500">
                        {errors.articleType.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Abstract</Label>
                    <Textarea
                      {...register("abstract")}
                      placeholder="Paste your abstract (structured or unstructured)..."
                      rows={6}
                    />
                    {errors.abstract && (
                      <p className="text-xs text-red-500">
                        {errors.abstract.message}
                      </p>
                    )}
                  </div>
                  <Controller
                    control={control}
                    name="keywords"
                    render={({ field }) => (
                      <div className="grid gap-1.5">
                        <Label>Keywords</Label>

                        <div className="flex flex-wrap gap-1.5">
                          {field.value.map((kw) => (
                            <Badge
                              key={kw}
                              variant="secondary"
                              className="gap-1 pr-1"
                            >
                              {kw}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = field.value.filter(
                                    (k) => k !== kw,
                                  );
                                  field.onChange(updated);
                                }}
                                className="rounded-full p-0.5 hover:bg-muted-foreground/20"
                              >
                                <X className="size-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-1">
                          <Input
                            placeholder="Add keyword..."
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const trimmed = newKeyword.trim().toLowerCase();
                                if (trimmed && !field.value.includes(trimmed)) {
                                  const updated = [...field.value, trimmed];
                                  field.onChange(updated);

                                  setNewKeyword("");
                                }
                              }
                            }}
                            className="h-8 text-xs"
                          />

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const trimmed = newKeyword.trim().toLowerCase();
                              if (trimmed && !field.value.includes(trimmed)) {
                                const updated = [...field.value, trimmed];
                                field.onChange(updated);

                                setNewKeyword("");
                              }
                            }}
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        </div>

                        {errors.keywords && (
                          <p className="text-xs text-red-500">
                            {errors.keywords.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <div className="grid gap-1.5">
                    <Label>Cover letter</Label>
                    <Textarea
                      {...register("coverLetter")}
                      placeholder="Write a cover letter to the editor highlighting the novelty and significance of your work..."
                      rows={5}
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Authors & Contributors</CardTitle>
                <CardDescription>
                  Add co-authors and define their contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-2xl">
                  {/* Corresponding author */}
                  <div className="rounded-lg border p-3.5 flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-xs font-medium">
                      AR
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Dr. Amira Rashid</p>
                      <p className="text-xs text-muted-foreground">
                        University Medical Center
                      </p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      Corresponding Author
                    </Badge>
                  </div>

                  {/* Add co-authors */}
                  <div className="grid gap-3">
                    <Label>Co-Authors</Label>
                    <div className="grid gap-3">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Input
                          {...register("coAuthorName")}
                          placeholder="Full name"
                          className="h-9 text-sm"
                        />
                        <Input
                          {...register("coAuthorEmail")}
                          placeholder="Email"
                          className="h-9 text-sm"
                        />
                        <Input
                          {...register("coAuthorInstitution")}
                          placeholder="Institution"
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-fit">
                      <Users className="size-4" />
                      Add Co-Author
                    </Button>
                  </div>

                  {/* Competing interests */}
                  <div className="grid gap-1.5">
                    <Label>Competing interests statement</Label>
                    <Textarea
                      {...register("competingInterests")}
                      placeholder="Declare any competing interests, or state 'The authors declare no competing interests.'"
                      rows={3}
                    />
                  </div>

                  {/* Author contributions */}
                  <div className="grid gap-1.5">
                    <Label>Author contributions (CRediT)</Label>
                    <Textarea
                      {...register("authorContributions")}
                      placeholder="e.g., A.R.: Conceptualization, Methodology, Writing – Original Draft. J.M.: Data Curation, Formal Analysis..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>
                  Upload your manuscript, figures, and supplementary materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-2xl">
                  {[
                    {
                      label: "Main manuscript (Word or LaTeX)",
                      required: true,
                      formats: "DOCX, TEX",
                    },
                    {
                      label: "Figures (high resolution)",
                      required: true,
                      formats: "TIFF, PNG, EPS",
                    },
                    { label: "Tables", required: false, formats: "DOCX, XLSX" },
                    {
                      label: "Supplementary materials",
                      required: false,
                      formats: "PDF, DOCX, XLSX",
                    },
                    {
                      label: "Cover letter",
                      required: true,
                      formats: "PDF, DOCX",
                    },
                    {
                      label: "Graphical abstract",
                      required: false,
                      formats: "TIFF, PNG, JPG",
                    },
                    {
                      label: "Reporting checklist (CONSORT, STROBE, etc.)",
                      required: false,
                      formats: "PDF, DOCX",
                    },
                  ].map((file) => (
                    <div
                      key={file.label}
                      className="flex items-center justify-between rounded-lg border border-dashed p-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{file.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.required ? "Required" : "Optional"} ·{" "}
                          {file.formats}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="size-4" />
                        Upload
                      </Button>
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
                <CardDescription>
                  Verify your submission before sending to the journal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-2xl">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground">
                      Target Journal
                    </p>
                    <p className="text-sm font-medium">
                      {selectedJournal || "Not selected"}
                    </p>
                  </div>
                  {[
                    {
                      section: "Journal Selection",
                      complete: !!selectedJournal,
                    },
                    { section: "Manuscript Details", complete: true },
                    { section: "Authors & Contributors", complete: true },
                    { section: "File Uploads", complete: false },
                  ].map((item) => (
                    <div
                      key={item.section}
                      className="flex items-center justify-between rounded-lg border p-3.5"
                    >
                      <div className="flex items-center gap-3">
                        {item.complete ? (
                          <CheckCircle2 className="size-5 text-emerald-500" />
                        ) : (
                          <div className="size-5 rounded-full border-2 border-amber-400" />
                        )}
                        <p className="text-sm font-medium">{item.section}</p>
                      </div>
                      <Badge
                        variant={item.complete ? "secondary" : "outline"}
                        className="text-[10px]"
                      >
                        {item.complete ? "Complete" : "Incomplete"}
                      </Badge>
                    </div>
                  ))}
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                      Submission checklist
                    </p>
                    <ul className="mt-2 grid gap-1 text-xs text-amber-700 dark:text-amber-500">
                      <li>
                        • Manuscript formatted according to journal guidelines
                      </li>
                      <li>• All co-authors have approved the submission</li>
                      <li>• Competing interests declared</li>
                      <li>• Ethics approval obtained (if applicable)</li>
                      <li>• Data availability statement included</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="size-4" />
            Previous
          </Button>
          {step < 5 ? (
<Button
  type="button" // ✅ IMPORTANT
  onClick={async () => {
    let fieldsToValidate = [];

    if (step === 1) fieldsToValidate = ["journal"];
    if (step === 2)
      fieldsToValidate = [
        "title",
        "articleType",
        "abstract",
        "keywords",
      ];

    const isValid = await trigger(fieldsToValidate);

    if (isValid) setStep(step + 1);
  }}
>
  Next
  <ArrowRight className="size-4" />
</Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Submit Manuscript
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
