"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Loader2,
  Quote,
  Save,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PUBLICATION = {
  id: "pub-001",
  title: "Machine Learning Approaches to Early Disease Detection in Underserved Communities",
  abstract: "This study presents a novel machine learning framework for early disease detection in underserved communities. Using a multi-modal approach combining electronic health records, community health surveys, and socioeconomic indicators, we developed a predictive model that outperforms traditional screening methods. Our results demonstrate a 34% improvement in early detection rates for chronic conditions including diabetes, hypertension, and cardiovascular disease. The framework was validated across 12 community health centers serving populations in 5 states.",
  journal: "The Lancet Digital Health",
  date: "Feb 15, 2026",
  submittedDate: "Oct 3, 2025",
  acceptedDate: "Jan 8, 2026",
  status: "Published",
  type: "Original Research",
  doi: "10.1016/j.landig.2026.01.004",
  citations: 14,
  keywords: ["machine learning", "health disparities", "early detection", "community health", "chronic disease"],
  coAuthors: [
    { name: "Dr. Juan Martinez", initials: "JM", institution: "Stanford School of Medicine", role: "Co-Author" },
    { name: "Dr. Sana Patel", initials: "SP", institution: "Harvard T.H. Chan School of Public Health", role: "Co-Author" },
  ],
  files: [
    { name: "manuscript_final_v3.pdf", size: "2.4 MB", type: "Manuscript" },
    { name: "supplementary_data.xlsx", size: "890 KB", type: "Supplementary" },
    { name: "figures_high_res.zip", size: "15.2 MB", type: "Figures" },
  ],
  timeline: [
    { date: "Oct 3, 2025", event: "Submitted to The Lancet Digital Health" },
    { date: "Nov 12, 2025", event: "Peer review initiated (3 reviewers)" },
    { date: "Dec 5, 2025", event: "Revision requested — minor revisions" },
    { date: "Dec 20, 2025", event: "Revised manuscript submitted" },
    { date: "Jan 8, 2026", event: "Accepted for publication" },
    { date: "Feb 15, 2026", event: "Published online" },
  ],
};

export function PublicationDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    setIsEditing(false);
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" asChild><Link href="/researcher/publications"><ArrowLeft className="size-4" /></Link></Button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>Published</Badge>
              <Badge variant="outline" className="text-[10px]">{PUBLICATION.type}</Badge>
            </div>
            <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight leading-snug">{PUBLICATION.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{PUBLICATION.journal} · {PUBLICATION.date}</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 ms-auto">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <><Loader2 className="size-4 animate-spin" />Saving...</> : <><Save className="size-4" />Save</>}
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}><Edit className="size-4" />Edit</Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 grid gap-6">
          {/* Abstract */}
          <Card>
            <CardHeader><CardTitle>Abstract</CardTitle></CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea defaultValue={PUBLICATION.abstract} rows={8} />
              ) : (
                <p className="text-sm leading-relaxed text-muted-foreground">{PUBLICATION.abstract}</p>
              )}
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader><CardTitle>Keywords</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {PUBLICATION.keywords.map((kw) => (
                  <Badge key={kw} variant="secondary">{kw}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Co-Authors */}
          <Card>
            <CardHeader>
              <CardTitle>Co-Authors</CardTitle>
              <CardDescription>{PUBLICATION.coAuthors.length} collaborators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {/* Self */}
                <div className="flex items-center gap-3 rounded-lg border p-3.5">
                  <Avatar size="sm"><AvatarFallback className="bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400 text-xs">AR</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Dr. Amira Rashid</p>
                    <p className="text-xs text-muted-foreground">University Medical Center</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Corresponding Author</Badge>
                </div>
                {PUBLICATION.coAuthors.map((author) => (
                  <div key={author.name} className="flex items-center gap-3 rounded-lg border p-3.5">
                    <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">{author.initials}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{author.name}</p>
                      <p className="text-xs text-muted-foreground">{author.institution}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{author.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
              <CardDescription>Manuscripts, supplementary materials, and figures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {PUBLICATION.files.map((file) => (
                  <div key={file.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted"><FileText className="size-3.5 text-muted-foreground" /></div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size} · {file.type}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8"><Download className="size-3.5" /></Button>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" className="mt-3"><Upload className="size-4" />Upload File</Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="grid gap-6 content-start">
          {/* Metrics */}
          <Card>
            <CardHeader><CardTitle>Metrics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground"><Quote className="size-4" />Citations</span>
                  <span className="text-sm font-semibold">{PUBLICATION.citations}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="size-4" />Co-Authors</span>
                  <span className="text-sm font-semibold">{PUBLICATION.coAuthors.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="size-4" />Files</span>
                  <span className="text-sm font-semibold">{PUBLICATION.files.length}</span>
                </div>
                {PUBLICATION.doi && (
                  <>
                    <Separator />
                    <div>
                      <span className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><ExternalLink className="size-4" />DOI</span>
                      <p className="text-xs font-mono text-primary break-all">{PUBLICATION.doi}</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid gap-3">
                  <div className="grid gap-1.5"><Label className="text-xs">Title</Label><Input defaultValue={PUBLICATION.title} className="h-8 text-xs" /></div>
                  <div className="grid gap-1.5"><Label className="text-xs">Journal</Label><Input defaultValue={PUBLICATION.journal} className="h-8 text-xs" /></div>
                  <div className="grid gap-1.5"><Label className="text-xs">Type</Label>
                    <Select defaultValue="original-research">
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original-research">Original Research</SelectItem>
                        <SelectItem value="review">Review Article</SelectItem>
                        <SelectItem value="systematic-review">Systematic Review</SelectItem>
                        <SelectItem value="commentary">Commentary</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5"><Label className="text-xs">DOI</Label><Input defaultValue={PUBLICATION.doi} className="h-8 text-xs" /></div>
                </div>
              ) : (
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Journal</span><span className="font-medium text-right">{PUBLICATION.journal}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{PUBLICATION.type}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-muted-foreground">Submitted</span><span className="font-medium">{PUBLICATION.submittedDate}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-muted-foreground">Accepted</span><span className="font-medium">{PUBLICATION.acceptedDate}</span></div>
                  <Separator />
                  <div className="flex justify-between"><span className="text-muted-foreground">Published</span><span className="font-medium">{PUBLICATION.date}</span></div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
                <div className="grid gap-4">
                  {PUBLICATION.timeline.map((event, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 top-1.5 size-[7px] rounded-full ring-2 ring-background ${i === PUBLICATION.timeline.length - 1 ? "bg-primary" : "bg-border"}`} />
                      <p className="text-xs font-medium">{event.event}</p>
                      <p className="text-[11px] text-muted-foreground">{event.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
