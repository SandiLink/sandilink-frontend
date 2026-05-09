"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Send,
  Edit,
} from "lucide-react";

export function SubmissionsList({ items, STATUS_CONFIG }) {
  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <Send className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No submissions in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((sub) => {
        const cfg = STATUS_CONFIG[sub.status];

        return (
          <Card
            key={sub.id}
            className="transition-colors hover:bg-muted/50"
          >
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div
                  className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg ${cfg.color}`}
                >
                  <cfg.icon className="size-4" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold leading-snug">
                      {sub.title}
                    </p>
                    <Badge
                      variant={cfg.badge}
                      className="text-[10px]"
                    >
                      {sub.status}
                    </Badge>
                  </div>

                  {/* Journal */}
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="size-3" />
                    <span>{sub.journal}</span>
                    {sub.manuscriptId && (
                      <span className="font-mono">
                        · {sub.manuscriptId}
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {sub.submittedDate && (
                      <span className="flex items-center gap-1">
                        <Send className="size-3" />
                        Submitted: {sub.submittedDate}
                      </span>
                    )}

                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      Updated: {sub.lastUpdate}
                    </span>

                    {sub.revisions > 0 && (
                      <span className="flex items-center gap-1">
                        <Edit className="size-3" />
                        {sub.revisions} revision
                        {sub.revisions > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Feedback */}
                  {sub.feedback && (
                    <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-amber-300 dark:border-amber-700 pl-2">
                      {sub.feedback}
                    </p>
                  )}
                </div>

                {/* Action */}
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
