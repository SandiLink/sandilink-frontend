"use client";

import { useState } from "react";
import { Award, DollarSign, Search, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { ProjectsList } from "./completed-portfolio/ProjectsList";

const PORTFOLIO = [
  {
    id: "port-001",
    grantTitle: "NIH R01 — Cardiovascular Disease Prevention",
    client: "Dr. R. Thompson",
    initials: "RT",
    institution: "Duke University",
    funder: "NIH",
    type: "Full Proposal",
    amount: "$2.1M",
    fee: "$6,200",
    completedDate: "Dec 2025",
    outcome: "Funded",
    rating: 5,
    review:
      "Lisa was instrumental in securing our NIH R01. Her strategic approach and attention to detail made all the difference.",
  },
  {
    id: "port-002",
    grantTitle: "NSF — Health Informatics Infrastructure",
    client: "Dr. J. Kim",
    initials: "JK",
    institution: "University of Washington",
    funder: "NSF",
    type: "Full Proposal",
    amount: "$890K",
    fee: "$4,800",
    completedDate: "Nov 2025",
    outcome: "Funded",
    rating: 5,
    review:
      "Excellent work on a complex interdisciplinary proposal. Highly recommended.",
  },
  {
    id: "port-003",
    grantTitle: "PCORI — Patient-Centered Diabetes Management",
    client: "Dr. M. Patel",
    initials: "MP",
    institution: "University of Michigan",
    funder: "PCORI",
    type: "Full Proposal",
    amount: "$1.4M",
    fee: "$5,500",
    completedDate: "Oct 2025",
    outcome: "Funded",
    rating: 4,
    review:
      "Very thorough and knowledgeable about the review process. Would highly recommend for complex federal grants.",
  },
  {
    id: "port-004",
    grantTitle: "NIH R21 — Mental Health Screening Tools",
    client: "Dr. K. Okafor",
    initials: "KO",
    institution: "Yale School of Medicine",
    funder: "NIH",
    type: "Full Proposal",
    amount: "$275K",
    fee: "$3,800",
    completedDate: "Sep 2025",
    outcome: "Funded",
    rating: 5,
    review:
      "Polished and competitive proposal. Lisa understood our research vision immediately.",
  },
  {
    id: "port-005",
    grantTitle: "Gates Foundation — Digital Diagnostics",
    client: "Dr. A. Fernandez",
    initials: "AF",
    institution: "UCSF",
    funder: "Gates Foundation",
    type: "Proposal Review",
    amount: "$500K",
    fee: "$1,800",
    completedDate: "Aug 2025",
    outcome: "Not Funded",
    rating: 4,
    review:
      "Great feedback and suggestions. The proposal was much stronger after Lisa's review, even though it wasn't funded this cycle.",
  },
  {
    id: "port-006",
    grantTitle: "DOD — PTSD Treatment Innovation",
    client: "Dr. W. Nguyen",
    initials: "WN",
    institution: "VA Medical Center",
    funder: "DOD",
    type: "Full Proposal",
    amount: "$1.8M",
    fee: "$5,000",
    completedDate: "Jul 2025",
    outcome: "Funded",
    rating: 5,
    review: null,
  },
];

export function CompletedPortfolio() {
  const [search, setSearch] = useState("");

  const filtered = PORTFOLIO.filter(
    (p) =>
      !search ||
      p.grantTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()),
  );

  const funded = filtered.filter((p) => p.outcome === "Funded");
  const notFunded = filtered.filter((p) => p.outcome !== "Funded");
  const totalEarned = PORTFOLIO.reduce(
    (sum, p) => sum + parseInt(p.fee.replace(/[$,]/g, "")),
    0,
  );

  const tabs = [
    {
      value: "all",
      label: `All (${filtered.length})`,
      content: <ProjectsList items={filtered} />,
    },
    {
      value: "funded",
      label: `Funded (${funded.length})`,
      content: <ProjectsList items={funded} />,
    },
    {
      value: "not-funded",
      label: `Not Funded (${notFunded.length})`,
      content: <ProjectsList items={notFunded} />,
    },
  ];

  const stats = [
    {
      label: "Completed Projects",
      value: PORTFOLIO.length.toString(),
      icon: Award,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Success Rate",
      value: `${Math.round((funded.length / PORTFOLIO.length) * 100)}%`,
      icon: TrendingUp,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Total Earned",
      value: `$${(totalEarned / 1000).toFixed(1)}K`,
      icon: DollarSign,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Avg Rating",
      value: `${(PORTFOLIO.reduce((s, p) => s + p.rating, 0) / PORTFOLIO.length).toFixed(1)}`,
      icon: Star,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Portfolio
        </h2>
        <p className="text-sm text-muted-foreground">
          Your completed projects, outcomes, and client reviews.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search portfolio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 pl-9"
        />
      </div>

      {/* Tabs */}
      <TabsComponent tabs={tabs} defaultValue="all" />
    </div>
  );
}
