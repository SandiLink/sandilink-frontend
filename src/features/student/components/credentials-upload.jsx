"use client";

import { CheckCircle2, Clock, FileUp, FileText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DOCUMENTS = [
  { name: "Official Transcript", fileName: "transcript_2026.pdf", uploadedAt: "Mar 15, 2026", status: "verified" },
  { name: "Student ID", fileName: "student_id.jpg", uploadedAt: "Mar 15, 2026", status: "verified" },
  { name: "CPR Certification", fileName: "cpr_cert.pdf", uploadedAt: "Mar 20, 2026", status: "verified" },
  { name: "Immunization Records", fileName: "immunizations.pdf", uploadedAt: "Mar 22, 2026", status: "verified" },
  { name: "Background Check", fileName: "bg_check.pdf", uploadedAt: "Mar 28, 2026", status: "pending" },
];

const REQUIRED = [
  "Official Transcript",
  "Student ID",
  "CPR / BLS Certification",
  "Immunization Records",
  "Background Check",
  "HIPAA Training Certificate",
  "Liability Insurance",
];

const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle2, class: "text-emerald-600 dark:text-emerald-400" },
  pending: { label: "Pending", icon: Clock, class: "text-amber-600 dark:text-amber-400" },
};

export function CredentialsUpload() {
  return (
    <div className="grid gap-6">
      {/* Upload area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>Accepted formats: PDF, JPG, PNG (max 10MB each)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed p-8 text-center">
            <FileUp className="mx-auto size-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
            <Button variant="outline" size="sm" className="mt-4">Choose files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded documents */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>{DOCUMENTS.filter((d) => d.status === "verified").length} of {REQUIRED.length} required documents verified</CardDescription>
        </CardHeader>
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
                      <p className="text-xs text-muted-foreground">{doc.fileName} — Uploaded {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-xs gap-1 ${s.class}`}>
                      <s.icon className="size-3" />{s.label}
                    </Badge>
                    <Button variant="ghost" size="icon-xs"><Trash2 className="size-3.5 text-muted-foreground" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Required checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>Checklist of documents needed for clinical placements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {REQUIRED.map((req) => {
              const uploaded = DOCUMENTS.find((d) => d.name.toLowerCase().includes(req.toLowerCase().split(" ")[0].toLowerCase()));
              return (
                <div key={req} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2.5">
                    {uploaded ? (
                      <CheckCircle2 className={`size-4 ${uploaded.status === "verified" ? "text-emerald-500" : "text-amber-500"}`} />
                    ) : (
                      <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
                    )}
                    <span className="text-sm">{req}</span>
                  </div>
                  {!uploaded && <Button variant="outline" size="xs">Upload</Button>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
