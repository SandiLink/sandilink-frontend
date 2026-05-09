"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Download,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";

const AGREEMENTS = [
  {
    id: "1",
    site: "City Health Clinic",
    preceptor: "Dr. Robert Williams",
    type: "Affiliation Agreement",
    signedDate: "Jan 10, 2026",
    expiryDate: "Jan 10, 2027",
    status: "active",
  },
  {
    id: "2",
    site: "Children's Hospital",
    preceptor: "Dr. Maria Garcia",
    type: "Affiliation Agreement",
    signedDate: "Feb 1, 2026",
    expiryDate: "Feb 1, 2027",
    status: "active",
  },
  {
    id: "3",
    site: "Metro General ER",
    preceptor: "Dr. Kevin Park",
    type: "Clinical Site Agreement",
    signedDate: "Mar 1, 2026",
    expiryDate: "Mar 1, 2027",
    status: "active",
  },
  {
    id: "4",
    site: "Women's Health Clinic",
    preceptor: "Dr. Anna Chen",
    type: "Affiliation Agreement",
    signedDate: null,
    expiryDate: null,
    status: "pending",
  },
  {
    id: "5",
    site: "University Medical Center",
    preceptor: "Dr. Linda Thompson",
    type: "Affiliation Agreement",
    signedDate: "Jun 15, 2025",
    expiryDate: "Jun 15, 2026",
    status: "expiring",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    class: "text-emerald-600 dark:text-emerald-400",
  },
  pending: {
    label: "Pending Signature",
    icon: Clock,
    class: "text-amber-600 dark:text-amber-400",
  },
  expiring: {
    label: "Expiring Soon",
    icon: AlertTriangle,
    class: "text-rose-600 dark:text-rose-400",
  },
};

export function AgreementsManagement() {
  const agreementColumns = [
    {
      header: "Clinical Site",
      accessorKey: "site",
      cell: (a) => <span className="text-sm font-medium">{a.site}</span>,
    },
    {
      header: "Preceptor",
      accessorKey: "preceptor",
      cellClassName: "text-sm text-muted-foreground",
    },
    {
      header: "Type",
      accessorKey: "type",
      cellClassName: "text-sm text-muted-foreground",
    },
    {
      header: "Signed",
      accessorKey: "signedDate",
      cell: (a) => (
        <span className="text-xs text-muted-foreground">
          {a.signedDate || "—"}
        </span>
      ),
    },
    {
      header: "Expires",
      accessorKey: "expiryDate",
      cell: (a) => (
        <span className="text-xs text-muted-foreground">
          {a.expiryDate || "—"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (a) => {
        const s = statusConfig[a.status];
        return (
          <Badge variant="outline" className={`text-xs gap-1 ${s.class}`}>
            <s.icon className="size-3" />
            {s.label}
          </Badge>
        );
      },
    },
    {
      header: "",
      accessorKey: "download",
      cell: () => (
        <Button variant="ghost" size="icon-xs">
          <Download className="size-3.5 text-muted-foreground" />
        </Button>
      ),
    },
  ];
  const stats = [
    {
      value: 3,
      label: "Active agreements",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      value: 1,
      label: "Pending signature",
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      value: 1,
      label: "Expiring soon",
      color: "text-rose-600 dark:text-rose-400",
    },
  ];
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} size="sm">
            <CardContent className="pt-4 text-center">
              <p
                className={`text-2xl font-semibold font-heading ${stat.color}`}
              >
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Agreements</CardTitle>
          <CardDescription>
            Affiliation and clinical site agreements
          </CardDescription>
          <CardAction>
            <Button size="sm" asChild>
              <Link href="/institution/agreements/new">
                <Plus className="size-3.5" data-icon="inline-start" />
                New agreement
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={agreementColumns}
            data={AGREEMENTS}
            emptyMessage="No agreements found."
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
