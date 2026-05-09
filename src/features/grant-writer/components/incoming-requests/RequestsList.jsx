"use client";

import Link from "next/link";
import {
  Award,
  DollarSign,
  Calendar,
  Loader2,
  CheckCircle2,
  MessageSquare,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RequestsList({
  items,
  keyName,
  statuses,
  loadingId,
  handleAction,
}) {
  if (!items.length) {
    return (
      <div className="py-12 text-center">
        <Users className="mx-auto size-10 text-muted-foreground/50" />
        <p className="mt-3 text-sm text-muted-foreground">
          No {keyName} requests.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {items.map((req) => (
        <Card key={req.id}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="text-center shrink-0">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {req.initials}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mt-1.5 flex size-9 mx-auto items-center justify-center rounded-full ${
                    req.matchScore >= 90
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                  }`}
                >
                  <span className="text-[11px] font-bold">
                    {req.matchScore}%
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/grant-writer/clients/${req.id}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {req.name}
                  </Link>
                  <Badge variant="outline" className="text-[10px]">
                    {req.service}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground">
                  {req.institution}
                </p>

                <div className="mt-2 rounded-lg bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">{req.message}</p>
                </div>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="size-3" /> {req.grant}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3" /> {req.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" /> {req.deadline}{" "}
                    <span
                      className={
                        req.daysLeft <= 14 ? "text-destructive font-medium" : ""
                      }
                    >
                      ({req.daysLeft}d)
                    </span>
                  </span>
                </div>

                {req.declineReason && (
                  <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-muted-foreground/30 pl-2">
                    {req.declineReason}
                  </p>
                )}

                {statuses[req.id] === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAction(req.id, "accepted")}
                      disabled={loadingId === req.id}
                    >
                      {loadingId === req.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="size-4" />
                      )}
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(req.id, "declined")}
                      disabled={loadingId === req.id}
                    >
                      Decline
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="size-4" />
                      Message
                    </Button>
                  </div>
                )}

                {statuses[req.id] === "accepted" && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="size-4" />
                      Message
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/grant-writer/projects/${req.id}`}>
                        View Project
                      </Link>
                    </Button>
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
