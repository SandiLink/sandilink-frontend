"use client";

import { useState } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RequestsList } from "./incoming-requests/RequestsList";
import { TabsComponent } from "@/components/shared/TabsComponent";

const REQUESTS = [
  {
    id: "req-001",
    name: "Dr. Amira Rashid",
    initials: "AR",
    institution: "University Medical Center",
    grant: "NIH R21 — Mental Health Interventions",
    funder: "NIH",
    service: "Full Proposal Writing",
    budget: "$5,000",
    deadline: "Apr 15, 2026",
    daysLeft: 9,
    receivedDate: "Mar 28, 2026",
    message:
      "I'm looking for support on my NIH R21 application for mental health interventions. Your expertise in NIH proposals would be invaluable.",
    matchScore: 96,
    status: "pending",
  },
  {
    id: "req-002",
    name: "Dr. Marco Silva",
    initials: "MS",
    institution: "University of São Paulo",
    grant: "NIH Fogarty — AI Diagnostics in Brazil",
    funder: "NIH",
    service: "Specific Aims + Review",
    budget: "$2,200",
    deadline: "Jun 1, 2026",
    daysLeft: 56,
    receivedDate: "Mar 25, 2026",
    message:
      "Looking for a US-based grant writer with NIH experience for a Fogarty International Center grant focused on AI-driven diagnostics in Brazil.",
    matchScore: 84,
    status: "pending",
  },
  {
    id: "req-003",
    name: "Dr. Helen Park",
    initials: "HP",
    institution: "Johns Hopkins School of Public Health",
    grant: "PCORI — Health Equity Data Analytics",
    funder: "PCORI",
    service: "Full Proposal Writing",
    budget: "$5,500",
    deadline: "Jul 15, 2026",
    daysLeft: 100,
    receivedDate: "Apr 1, 2026",
    message:
      "Would love to work with you on a PCORI proposal combining community health data with machine learning analytics.",
    matchScore: 91,
    status: "pending",
  },
  {
    id: "req-004",
    name: "Dr. Karen Lee",
    initials: "KL",
    institution: "Johns Hopkins University",
    grant: "PCORI — Patient-Centered Outcomes",
    funder: "PCORI",
    service: "Proposal Review",
    budget: "$1,500",
    deadline: "Apr 20, 2026",
    daysLeft: 14,
    receivedDate: "Mar 20, 2026",
    message:
      "I have a near-complete draft and need an expert review before submission.",
    matchScore: 88,
    status: "accepted",
    respondedDate: "Mar 22, 2026",
  },
  {
    id: "req-005",
    name: "Dr. Wei Zhang",
    initials: "WZ",
    institution: "MIT",
    grant: "NSF — Computational Biology Infrastructure",
    funder: "NSF",
    service: "Full Proposal Writing",
    budget: "$4,800",
    deadline: "May 1, 2026",
    daysLeft: 25,
    receivedDate: "Mar 10, 2026",
    message:
      "Need help with an NSF proposal for computational biology infrastructure.",
    matchScore: 72,
    status: "declined",
    respondedDate: "Mar 12, 2026",
    declineReason:
      "At capacity — unable to take on new full proposals before May.",
  },
];

export function IncomingRequests() {
  const [statuses, setStatuses] = useState(
    REQUESTS.reduce((acc, r) => ({ ...acc, [r.id]: r.status }), {}),
  );
  const [loadingId, setLoadingId] = useState(null);

  async function handleAction(id, action) {
    setLoadingId(id);
    await new Promise((r) => setTimeout(r, 1000));
    setStatuses((prev) => ({ ...prev, [id]: action }));
    setLoadingId(null);
  }

  const pending = REQUESTS.filter((r) => statuses[r.id] === "pending");
  const accepted = REQUESTS.filter((r) => statuses[r.id] === "accepted");
  const declined = REQUESTS.filter((r) => statuses[r.id] === "declined");
  const stats = [
    {
      label: "Pending",
      value: pending.length.toString(),
      icon: Clock,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
    {
      label: "Accepted",
      value: accepted.length.toString(),
      icon: CheckCircle2,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Declined",
      value: declined.length.toString(),
      icon: XCircle,
      color: "text-muted-foreground bg-muted",
    },
  ];

  const tabs = [
    {
      value: "pending",
      label: `Pending (${pending.length})`,
      content: (
        <RequestsList
          items={pending}
          keyName="pending"
          statuses={statuses}
          loadingId={loadingId}
          handleAction={handleAction}
        />
      ),
    },
    {
      value: "accepted",
      label: `Accepted (${accepted.length})`,
      content: (
        <RequestsList
          items={accepted}
          keyName="accepted"
          statuses={statuses}
          loadingId={loadingId}
          handleAction={handleAction}
        />
      ),
    },
    {
      value: "declined",
      label: `Declined (${declined.length})`,
      content: (
        <RequestsList
          items={declined}
          keyName="declined"
          statuses={statuses}
          loadingId={loadingId}
          handleAction={handleAction}
        />
      ),
    },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Incoming Requests
        </h2>
        <p className="text-sm text-muted-foreground">
          Collaboration requests from researchers looking for grant writing
          help.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`flex size-9 items-center justify-center rounded-lg ${s.color}`}
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
      <TabsComponent tabs={tabs} defaultValue="pending" />
    </div>
  );
}
