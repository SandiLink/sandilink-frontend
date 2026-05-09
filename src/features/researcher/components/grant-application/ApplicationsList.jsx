"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, CheckCircle2, Award } from "lucide-react";

export function ApplicationsList({ items, STATUS_CONFIG }) {
  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <Award className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No applications in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((app) => {
        const cfg = STATUS_CONFIG[app.status];

        return (
          <Card key={app.id} className="transition-colors hover:bg-muted/50">
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
                      {app.grantTitle}
                    </p>
                    <Badge variant={cfg.badge} className="text-[10px]">
                      {app.status}
                    </Badge>
                  </div>

                  {/* Funder */}
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {app.funder}
                  </p>

                  {/* Meta */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="size-3" />
                      {app.amount}
                    </span>

                    {app.submittedDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        Submitted: {app.submittedDate}
                      </span>
                    )}

                    {app.awardDate && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" />
                        Awarded: {app.awardDate}
                      </span>
                    )}
                  </div>

                  {/* Feedback */}
                  {app.feedback && (
                    <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-destructive/30 pl-2">
                      {app.feedback}
                    </p>
                  )}
                </div>

                {/* Action */}
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/researcher/grants/${app.id}`}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
