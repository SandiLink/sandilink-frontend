"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  MessageSquare,
  Send,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsComponent } from "@/components/shared/TabsComponent";

const SENT_REQUESTS = [
  {
    id: "req-001",
    name: "Dr. Lisa Nguyen",
    initials: "LN",
    role: "Grant Writer",
    message:
      "I'm looking for support on my NIH R21 application for mental health interventions. Your expertise in NIH proposals would be invaluable.",
    grantTitle: "NIH R21 — Mental Health Interventions",
    sentDate: "Mar 28, 2026",
    status: "Pending",
  },
  {
    id: "req-002",
    name: "Dr. Fatima Al-Rashidi",
    initials: "FA",
    role: "Grant Writer",
    message:
      "Would love to collaborate on the Gates Foundation global health innovation grant. Your WHO experience is a perfect fit.",
    grantTitle: "Gates Foundation — Global Health Innovation",
    sentDate: "Mar 15, 2026",
    status: "Accepted",
    respondedDate: "Mar 18, 2026",
  },
  {
    id: "req-003",
    name: "Emily Torres, PhD",
    initials: "ET",
    role: "Grant Writer",
    message: "Interested in your help with our NSF data science proposal.",
    grantTitle: "NSF — Health Data Infrastructure",
    sentDate: "Feb 20, 2026",
    status: "Declined",
    respondedDate: "Feb 25, 2026",
    declineReason: "Currently at capacity with existing projects.",
  },
];

const RECEIVED_REQUESTS = [
  {
    id: "req-004",
    name: "Dr. Helen Park",
    initials: "HP",
    role: "Researcher",
    institution: "Johns Hopkins School of Public Health",
    message:
      "I'd love to collaborate on a joint proposal for the PCORI health equity funding cycle. Your machine learning expertise would complement our community health data.",
    grantTitle: "PCORI — Health Equity Data Analytics",
    sentDate: "Apr 1, 2026",
    status: "Pending",
  },
  {
    id: "req-005",
    name: "Dr. Marco Silva",
    initials: "MS",
    role: "Researcher",
    institution: "University of São Paulo",
    message:
      "Looking for a US-based collaborator for a Fogarty International Center grant focused on AI-driven diagnostics in Brazil.",
    grantTitle: "NIH Fogarty — AI Diagnostics in Brazil",
    sentDate: "Mar 25, 2026",
    status: "Pending",
  },
];

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    badge: "secondary",
  },
  Accepted: {
    icon: CheckCircle2,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    badge: "default",
  },
  Declined: {
    icon: XCircle,
    color: "text-destructive bg-destructive/10",
    badge: "destructive",
  },
};

export function CollaborationRequests() {
  const [receivedStatuses, setReceivedStatuses] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  async function handleAction(id, action) {
    setLoadingId(id);
    await new Promise((r) => setTimeout(r, 1000));
    setReceivedStatuses((prev) => ({ ...prev, [id]: action }));
    setLoadingId(null);
  }

  const pendingSent = SENT_REQUESTS.filter(
    (r) => r.status === "Pending",
  ).length;
  const pendingReceived = RECEIVED_REQUESTS.filter(
    (r) => !receivedStatuses[r.id],
  ).length;
  const tabs = [
    {
      value: "received",
      label: `Received (${RECEIVED_REQUESTS.length})`,
      content: (
        <div className="mt-4 grid gap-3">
          {RECEIVED_REQUESTS.map((req) => {
            const status = receivedStatuses[req.id] || req.status;
            const cfg = STATUS_CONFIG[status];

            return (
              <Card key={req.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {req.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{req.name}</p>
                        <Badge variant="outline" className="text-[10px]">
                          {req.role}
                        </Badge>
                        <Badge variant={cfg.badge} className="text-[10px]">
                          {status}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {req.institution}
                      </p>

                      <div className="mt-2 rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">
                          {req.message}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Send className="size-3" />
                          {req.grantTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {req.sentDate}
                        </span>
                      </div>

                      {status === "Pending" && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAction(req.id, "Accepted")}
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
                            onClick={() => handleAction(req.id, "Declined")}
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

                      {status === "Accepted" && (
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="size-4" />
                            Start Conversation
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ),
    },

    {
      value: "sent",
      label: `Sent (${SENT_REQUESTS.length})`,
      content: (
        <div className="mt-4 grid gap-3">
          {SENT_REQUESTS.map((req) => {
            const cfg = STATUS_CONFIG[req.status];

            return (
              <Card key={req.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {req.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{req.name}</p>
                        <Badge variant="outline" className="text-[10px]">
                          {req.role}
                        </Badge>
                        <Badge variant={cfg.badge} className="text-[10px]">
                          {req.status}
                        </Badge>
                      </div>

                      <div className="mt-2 rounded-lg bg-muted/50 p-3">
                        <p className="text-xs text-muted-foreground">
                          {req.message}
                        </p>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Send className="size-3" />
                          {req.grantTitle}
                        </span>

                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          Sent: {req.sentDate}
                        </span>

                        {req.respondedDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            Responded: {req.respondedDate}
                          </span>
                        )}
                      </div>

                      {req.declineReason && (
                        <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-destructive/30 pl-2">
                          {req.declineReason}
                        </p>
                      )}

                      {req.status === "Accepted" && (
                        <div className="mt-3">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="size-4" />
                            Message
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ),
    },
  ];
  const stats = [
    {
      label: "Sent Requests",
      value: SENT_REQUESTS.length.toString(),
      icon: ArrowUpRight,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Received Requests",
      value: RECEIVED_REQUESTS.length.toString(),
      icon: ArrowDownLeft,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Pending (Sent)",
      value: pendingSent.toString(),
      icon: Clock,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Needs Response",
      value: pendingReceived.toString(),
      icon: Send,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
  ];
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Collaboration Requests
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage sent and received collaboration requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`flex size-8 max-w-8 items-center justify-center rounded-lg ${s.color}`}
                >
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <TabsComponent tabs={tabs} defaultValue="received" namespace="requests" />
    </div>
  );
}
