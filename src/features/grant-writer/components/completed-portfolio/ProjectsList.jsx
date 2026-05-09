"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";

export function ProjectsList({ items }) {
  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <Award className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No projects in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((p) => (
        <Card key={p.id} className="transition-colors hover:bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <Avatar className="shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {p.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold leading-snug">
                    {p.grantTitle}
                  </p>

                  <Badge
                    variant={
                      p.outcome === "Funded" ? "default" : "destructive"
                    }
                    className="text-[10px]"
                  >
                    {p.outcome === "Funded" ? (
                      <CheckCircle2 className="size-3" />
                    ) : (
                      <XCircle className="size-3" />
                    )}
                    {p.outcome}
                  </Badge>
                </div>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.client} · {p.institution}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">
                    {p.type}
                  </Badge>

                  <span className="flex items-center gap-1">
                    <Award className="size-3" />
                    {p.funder} · {p.amount}
                  </span>

                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3" />
                    Fee: {p.fee}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {p.completedDate}
                  </span>
                </div>

                {p.review && (
                  <div className="mt-3 rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: p.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      &ldquo;{p.review}&rdquo;
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      — {p.client}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}