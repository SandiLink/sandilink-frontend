"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Download, FileText, FileUp, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DOCUMENTS = [
  { name: "Clinical Rotation Agreement", fileName: "rotation_agreement.pdf", uploadedAt: "Jan 14, 2026", status: "approved", category: "Required" },
  { name: "Mid-Rotation Self-Assessment", fileName: "mid_assessment.pdf", uploadedAt: "Mar 15, 2026", status: "approved", category: "Evaluation" },
  { name: "Patient Log — Week 10", fileName: "patient_log_w10.xlsx", uploadedAt: "Mar 28, 2026", status: "approved", category: "Logs" },
  { name: "Patient Log — Week 11", fileName: "patient_log_w11.xlsx", uploadedAt: "Mar 31, 2026", status: "pending", category: "Logs" },
  { name: "Reflection Journal — March", fileName: "journal_march.pdf", uploadedAt: "Mar 31, 2026", status: "pending", category: "Reflections" },
];

const REQUIRED_DOCS = [
  { name: "Clinical Rotation Agreement", uploaded: true },
  { name: "Mid-Rotation Self-Assessment", uploaded: true },
  { name: "Final Rotation Self-Assessment", uploaded: false },
  { name: "Preceptor Evaluation Form", uploaded: false },
  { name: "Competency Checklist", uploaded: false },
];

const statusConfig = {
  approved: { label: "Approved", icon: CheckCircle2, class: "text-emerald-600 dark:text-emerald-400" },
  pending: { label: "Pending review", icon: Clock, class: "text-amber-600 dark:text-amber-400" },
};

export function PlacementDocuments({ placementId }) {
  return (
    <div className="mx-auto">
      <Button variant="ghost" size="sm" className="mb-4 w-fit" asChild>
        <Link href={`/student/placements/${placementId}`}><ArrowLeft className="size-4" data-icon="inline-start" />Back to placement</Link>
      </Button>

      <div className="grid gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">Placement Documents</h2>
          <p className="text-sm text-muted-foreground">Upload and manage documents for this clinical rotation.</p>
        </div>

        {/* Upload */}
        <Card>
          <CardHeader><CardTitle>Upload Documents</CardTitle><CardDescription>PDF, DOCX, XLSX, JPG, PNG (max 10MB each)</CardDescription></CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <FileUp className="mx-auto size-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
              <Button variant="outline" size="sm" className="mt-4">Choose files</Button>
            </div>
          </CardContent>
        </Card>

        {/* Required docs checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>{REQUIRED_DOCS.filter((d) => d.uploaded).length} of {REQUIRED_DOCS.length} submitted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {REQUIRED_DOCS.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2.5">
                    {doc.uploaded ? (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  {!doc.uploaded && <Button variant="outline" size="xs">Upload</Button>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Uploaded docs */}
        <Card>
          <CardHeader><CardTitle>All Uploaded Documents</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {DOCUMENTS.map((doc) => {
                const s = statusConfig[doc.status];
                return (
                  <div key={doc.name} className="flex items-center justify-between rounded-lg border p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        <FileText className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.fileName} — {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs gap-1 ${s.class}`}><s.icon className="size-3" />{s.label}</Badge>
                      <Button variant="ghost" size="icon-xs"><Download className="size-3.5 text-muted-foreground" /></Button>
                      <Button variant="ghost" size="icon-xs"><Trash2 className="size-3.5 text-muted-foreground" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
