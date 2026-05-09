"use client";

import { Download, FileUp, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BulkImport() {
  return (
    <div className="mx-auto max-w-2xl grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Download Template</CardTitle>
          <CardDescription>Use our CSV template to format your student data correctly.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground mb-3">The template includes columns for: First Name, Last Name, Email, Program, Year, Student ID</p>
            <Button variant="outline"><Download className="size-4" data-icon="inline-start" />Download CSV template</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Student File</CardTitle>
          <CardDescription>Upload a CSV file with your student roster data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2 border-dashed p-10 text-center">
            <FileUp className="mx-auto size-12 text-muted-foreground/40" />
            <p className="mt-4 text-sm font-medium">Drag and drop your CSV file here</p>
            <p className="text-xs text-muted-foreground">or click to browse — CSV files only, max 5MB</p>
            <Button variant="outline" className="mt-4"><Upload className="size-4" data-icon="inline-start" />Choose file</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Import Guidelines</CardTitle></CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">1</span>Download the CSV template and fill in student data</li>
            <li className="flex gap-2"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">2</span>Ensure all email addresses are valid university emails</li>
            <li className="flex gap-2"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span>Upload the file — duplicates will be detected automatically</li>
            <li className="flex gap-2"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">4</span>Review the preview and confirm the import</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
