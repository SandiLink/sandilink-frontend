"use client";

import Link from "next/link";
import { FileText, Quote, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const renderTabContent = ({ items, STATUS_CONFIG, onClearFilters }) => {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <FileText className="mx-auto size-10 text-muted-foreground/50" />

        <p className="mt-3 text-sm text-muted-foreground">
          No publications match your filters.
        </p>

        <Button
          variant="outline"
          size="sm"
          className="mt-3"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((pub) => (
        <Link key={pub.id} href={`/researcher/publications/${pub.id}`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${STATUS_CONFIG[pub.status].color}`}
                >
                  <FileText className="size-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {pub.title}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {pub.journal} · {pub.date}
                  </p>

                  {pub.coAuthors.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Co-authors: {pub.coAuthors.join(", ")}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={STATUS_CONFIG[pub.status].variant}>
                      {pub.status}
                    </Badge>

                    <Badge variant="outline" className="text-[10px]">
                      {pub.type}
                    </Badge>

                    {pub.citations > 0 && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Quote className="size-3" />
                        {pub.citations} citations
                      </span>
                    )}

                    {pub.doi && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ExternalLink className="size-3" />
                        DOI
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
