"use client";

import { FileText, Download, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUS_COLORS = {
  Approved: "text-emerald-600 dark:text-emerald-400",
  "In Review": "text-blue-600 dark:text-blue-400",
  Draft: "text-amber-600 dark:text-amber-400",
  Reference: "text-muted-foreground",
};

export function DeliverablesTab({ deliverables }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deliverables</CardTitle>
        <CardDescription>Documents and files for this project</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <Upload className="size-4" />
            Upload
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {deliverables.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                  <FileText className="size-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.size} · {d.type} · {d.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium ${STATUS_COLORS[d.status]}`}
                >
                  {d.status}
                </span>
                <Button variant="ghost" size="icon" className="size-8">
                  <Download className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
