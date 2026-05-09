"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Award,
  Briefcase,
  Calendar,
  DollarSign,
  MessageSquare,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CLIENTS = [
  {
    id: "cl-001",
    name: "Dr. Amira Rashid",
    initials: "AR",
    institution: "University Medical Center",
    field: "Public Health / AI",
    activeProjects: 1,
    completedProjects: 0,
    totalRevenue: "$5,000",
    since: "Mar 2026",
    lastActive: "Today",
    status: "Active",
    messageId: "amira-rashid",
  },
  {
    id: "cl-002",
    name: "Dr. Robert Chen",
    initials: "RC",
    institution: "Stanford School of Medicine",
    field: "Biomedical Imaging",
    activeProjects: 1,
    completedProjects: 0,
    totalRevenue: "$4,200",
    since: "Mar 2026",
    lastActive: "Yesterday",
    status: "Active",
    messageId: "robert-chen",
  },
  {
    id: "cl-003",
    name: "Dr. Karen Lee",
    initials: "KL",
    institution: "Johns Hopkins University",
    field: "Patient-Centered Research",
    activeProjects: 1,
    completedProjects: 0,
    totalRevenue: "$1,500",
    since: "Mar 2026",
    lastActive: "2 days ago",
    status: "Active",
    messageId: "karen-lee",
  },
  {
    id: "cl-004",
    name: "Dr. Sarah Mitchell",
    initials: "SM",
    institution: "Emory University",
    field: "Health Equity",
    activeProjects: 1,
    completedProjects: 0,
    totalRevenue: "$5,500",
    since: "Apr 2026",
    lastActive: "Today",
    status: "Active",
    messageId: "sarah-mitchell",
  },
  {
    id: "cl-005",
    name: "Dr. R. Thompson",
    initials: "RT",
    institution: "Duke University",
    field: "Cardiovascular Research",
    activeProjects: 0,
    completedProjects: 1,
    totalRevenue: "$6,200",
    since: "Sep 2025",
    lastActive: "2 weeks ago",
    status: "Past",
  },
  {
    id: "cl-006",
    name: "Dr. J. Kim",
    initials: "JK",
    institution: "University of Washington",
    field: "Health Informatics",
    activeProjects: 0,
    completedProjects: 1,
    totalRevenue: "$4,800",
    since: "Jul 2025",
    lastActive: "1 month ago",
    status: "Past",
  },
];

export function ClientList() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = CLIENTS.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.institution.toLowerCase().includes(search.toLowerCase()) || c.field.toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered.filter((c) => c.status === "Active");
  const past = filtered.filter((c) => c.status === "Past");

  function openMessage(e, messageId) {
    e.preventDefault();
    e.stopPropagation();
    const href = messageId
      ? `/grant-writer/messages/${messageId}`
      : "/grant-writer/messages";
    router.push(href);
  }
  const stats = [
    { label: "Total Clients", value: CLIENTS.length.toString(), icon: Users, color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },
    { label: "Active", value: CLIENTS.filter((c) => c.status === "Active").length.toString(), icon: Briefcase, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950" },
    { label: "Total Revenue", value: "$27,200", icon: DollarSign, color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950" },
    { label: "Total Projects", value: (CLIENTS.reduce((s, c) => s + c.activeProjects + c.completedProjects, 0)).toString(), icon: Award, color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },
  ]
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">My Clients</h2>
        <p className="text-sm text-muted-foreground">Researchers you've worked with or are currently working with.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}><s.icon className="size-4" /></div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 pl-9" />
      </div>

      {/* Active Clients */}
      {active.length > 0 && (
        <div className="grid gap-3">
          <h3 className="text-sm font-medium text-muted-foreground">Active Clients ({active.length})</h3>
          {active.map((c) => (
            <Link key={c.id} href={`/grant-writer/clients/${c.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11"><AvatarFallback className="bg-primary/10 text-primary text-sm">{c.initials}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <Badge className="text-[10px]">Active</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.institution} · {c.field}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="size-3" />{c.activeProjects} active project{c.activeProjects !== 1 ? "s" : ""}</span>
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{c.totalRevenue}</span>
                        <span className="flex items-center gap-1"><Calendar className="size-3" />Since {c.since}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">Active {c.lastActive}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={(e) => openMessage(e, c.messageId)}
                      aria-label={`Message ${c.name}`}
                    >
                      <MessageSquare className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Past Clients */}
      {past.length > 0 && (
        <div className="grid gap-3">
          <h3 className="text-sm font-medium text-muted-foreground">Past Clients ({past.length})</h3>
          {past.map((c) => (
            <Link key={c.id} href={`/grant-writer/clients/${c.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-11"><AvatarFallback className="bg-muted text-muted-foreground text-sm">{c.initials}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <Badge variant="outline" className="text-[10px]">Past</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.institution} · {c.field}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Award className="size-3" />{c.completedProjects} completed</span>
                        <span className="flex items-center gap-1"><DollarSign className="size-3" />{c.totalRevenue}</span>
                        <span>Last active {c.lastActive}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                      onClick={(e) => openMessage(e, c.messageId)}
                      aria-label={`Message ${c.name}`}
                    >
                      <MessageSquare className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <Users className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No clients match your search.</p>
        </div>
      )}
    </div>
  );
}
