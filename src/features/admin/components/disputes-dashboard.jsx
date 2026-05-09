"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { TabsComponent } from "@/components/shared/TabsComponent";

const disputes = [
  {
    id: "DSP-001",
    reporter: "Dr. Sarah Mitchell",
    subject: "Unprofessional conduct during clinical rotation",
    date: "2026-03-28",
    severity: "High",
    status: "Open",
  },
  {
    id: "DSP-002",
    reporter: "James Rodriguez",
    subject: "Inaccurate review posted about preceptor",
    date: "2026-03-25",
    severity: "Medium",
    status: "Open",
  },
  {
    id: "DSP-003",
    reporter: "Emily Chen",
    subject: "Scheduling conflict not resolved by provider",
    date: "2026-03-20",
    severity: "Low",
    status: "Resolved",
  },
  {
    id: "DSP-004",
    reporter: "Michael Thompson",
    subject: "Harassment complaint against another student",
    date: "2026-03-15",
    severity: "High",
    status: "Resolved",
  },
  {
    id: "DSP-005",
    reporter: "Lisa Park",
    subject: "Payment dispute for rotation placement fee",
    date: "2026-03-30",
    severity: "Medium",
    status: "Open",
  },
];

const severityColor = {
  High: "destructive",
  Medium: "warning",
  Low: "secondary",
};

const severityKeyByValue = {
  High: "severityHigh",
  Medium: "severityMedium",
  Low: "severityLow",
};

const statusKeyByValue = {
  Open: "statusOpen",
  Resolved: "statusResolved",
};

export default function DisputesDashboard() {
  const t = useTranslations("dashboards.adminDisputes");

  const openDisputes = disputes.filter((d) => d.status === "Open");
  const resolvedDisputes = disputes.filter((d) => d.status === "Resolved");

  const disputeColumns = [
    {
      header: t("colId"),
      accessorKey: "id",
      className: "text-left",
      cellClassName: "font-medium",
    },
    {
      header: t("colReporter"),
      accessorKey: "reporter",
      className: "text-left",
    },
    {
      header: t("colSubject"),
      accessorKey: "subject",
      className: "text-left",
      cellClassName: "max-w-[250px] truncate",
    },
    {
      header: t("colDate"),
      accessorKey: "date",
      className: "text-left",
    },
    {
      header: t("colSeverity"),
      accessorKey: "severity",
      className: "text-left",
      cell: (row) => (
        <Badge variant={severityColor[row.severity]}>
          {t(severityKeyByValue[row.severity])}
        </Badge>
      ),
    },
    {
      header: t("colStatus"),
      accessorKey: "status",
      className: "text-left",
      cell: (row) => (
        <Badge variant={row.status === "Open" ? "outline" : "default"}>
          {t(statusKeyByValue[row.status])}
        </Badge>
      ),
    },
    {
      header: t("colActions"),
      accessorKey: "actions",
      className: "text-right",
      cellClassName: "text-right",
      cell: (row) => (
        <Link href={`/admin/disputes/${row.id}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <Eye className="mr-1 h-4 w-4" />
            {t("viewDetail")}
          </Button>
        </Link>
      ),
    },
  ];

  const renderTable = (items) => (
    <DataTable
      columns={disputeColumns}
      data={items}
      rowClassName={() => "hover:bg-muted/30 transition-colors"}
      emptyMessage={t("emptyMessage")}
    />
  );

  const tabs = [
    {
      value: "open",
      label: t("tabOpen", { count: openDisputes.length }),
      content: (
        <Card>
          <CardHeader>
            <CardTitle>{t("cardOpenTitle")}</CardTitle>
            <CardDescription>{t("cardOpenDesc")}</CardDescription>
          </CardHeader>
          <CardContent>{renderTable(openDisputes)}</CardContent>
        </Card>
      ),
    },
    {
      value: "resolved",
      label: t("tabResolved", { count: resolvedDisputes.length }),
      content: (
        <Card>
          <CardHeader>
            <CardTitle>{t("cardResolvedTitle")}</CardTitle>
            <CardDescription>{t("cardResolvedDesc")}</CardDescription>
          </CardHeader>
          <CardContent>{renderTable(resolvedDisputes)}</CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("pageTitle")}</h1>
          <p className="text-muted-foreground">{t("pageIntro")}</p>
        </div>
        <div className="flex items-center gap-2 ms-auto">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span className="text-sm font-medium">
            {t("openDisputesCount", { count: openDisputes.length })}
          </span>
        </div>
      </div>
      <TabsComponent tabs={tabs} defaultValue="open" />
    </div>
  );
}
