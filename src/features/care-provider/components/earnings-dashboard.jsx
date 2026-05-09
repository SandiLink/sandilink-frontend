"use client";

import { useTranslations } from "next-intl";
import { DollarSign, Download, TrendingUp, Users } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";

const STATS = [
  {
    titleKey: "statTotalEarnings",
    descKey: "statTotalEarningsDesc",
    value: "$12,840",
    icon: DollarSign,
    trend: "+18%",
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    titleKey: "statThisMonth",
    descKey: "statThisMonthDesc",
    value: "$4,280",
    icon: TrendingUp,
    trend: "+12%",
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    titleKey: "statPendingPayout",
    descKey: "statPendingPayoutDesc",
    value: "$1,560",
    icon: DollarSign,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    titleKey: "statTotalPatients",
    descKey: "statTotalPatientsDesc",
    value: "87",
    icon: Users,
    color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
];

const PAYOUTS = [
  { id: "po-001", date: "Mar 31, 2026", amount: 2720, appointments: 18, status: "completed", method: "Chase •••• 4567" },
  { id: "po-002", date: "Mar 24, 2026", amount: 1560, appointments: 11, status: "completed", method: "Chase •••• 4567" },
  { id: "po-003", date: "Mar 17, 2026", amount: 1980, appointments: 14, status: "completed", method: "Chase •••• 4567" },
  { id: "po-004", date: "Mar 10, 2026", amount: 2340, appointments: 16, status: "completed", method: "Chase •••• 4567" },
  { id: "po-005", date: "Mar 3, 2026", amount: 1680, appointments: 12, status: "completed", method: "Chase •••• 4567" },
];

const RECENT = [
  { id: "e-001", date: "Apr 1", patient: "John Doe", type: "Virtual", amount: 120, fee: 12, net: 108 },
  { id: "e-002", date: "Apr 1", patient: "Alice Martin", type: "In-person", amount: 150, fee: 15, net: 135 },
  { id: "e-003", date: "Mar 31", patient: "Carol Taylor", type: "In-person", amount: 150, fee: 15, net: 135 },
  { id: "e-004", date: "Mar 31", patient: "David Lee", type: "Virtual", amount: 120, fee: 12, net: 108 },
  { id: "e-005", date: "Mar 30", patient: "Grace Kim", type: "Virtual", amount: 120, fee: 12, net: 108 },
];

export function EarningsDashboard() {
  const t = useTranslations("dashboards.providerEarnings");

  const recentColumns = [
    { header: t("colDate"), accessorKey: "date", cellClassName: "text-xs text-muted-foreground whitespace-nowrap" },
    { header: t("colPatient"), accessorKey: "patient", cellClassName: "text-sm" },
    {
      header: t("colType"),
      accessorKey: "type",
      cell: (r) => <Badge variant="outline" className="text-xs">{r.type}</Badge>,
    },
    {
      header: t("colGross"),
      accessorKey: "amount",
      cell: (r) => <span className="text-sm">${r.amount.toFixed(2)}</span>,
    },
    {
      header: t("colFee"),
      accessorKey: "fee",
      cell: (r) => <span className="text-sm text-muted-foreground">-${r.fee.toFixed(2)}</span>,
    },
    {
      header: t("colNet"),
      accessorKey: "net",
      cell: (r) => <span className="text-sm font-medium">${r.net.toFixed(2)}</span>,
    },
  ];

  const payoutColumns = [
    { header: t("colDate"), accessorKey: "date", cellClassName: "text-xs text-muted-foreground whitespace-nowrap" },
    {
      header: t("colAppointments"),
      accessorKey: "appointments",
      cell: (p) => <span className="text-sm">{t("sessions", { count: p.appointments })}</span>,
    },
    { header: t("colMethod"), accessorKey: "method", cellClassName: "text-xs text-muted-foreground" },
    {
      header: t("colStatus"),
      accessorKey: "status",
      cell: () => (
        <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400">
          {t("statusCompleted")}
        </Badge>
      ),
    },
    {
      header: t("colAmount"),
      accessorKey: "amount",
      cell: (p) => <span className="text-sm font-medium">${p.amount.toFixed(2)}</span>,
    },
    {
      header: "",
      accessorKey: "download",
      cell: () => (
        <Button variant="ghost" size="icon-xs">
          <Download className="size-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="grid gap-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.titleKey} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{t(stat.titleKey)}</p>
                <div className={`flex size-9 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold font-heading tracking-tight">
                  {stat.value}
                </span>
                {stat.trend && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-3" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t(stat.descKey)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent earnings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("recentTitle")}</CardTitle>
          <CardDescription>{t("recentDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={recentColumns}
            data={RECENT}
            emptyMessage={t("emptyRecent")}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>

      {/* Payout history */}
      <Card>
        <CardHeader>
          <CardTitle>{t("payoutTitle")}</CardTitle>
          <CardDescription>{t("payoutDesc")}</CardDescription>
          <CardAction>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("rangeAll")}</SelectItem>
                <SelectItem value="month">{t("rangeMonth")}</SelectItem>
                <SelectItem value="quarter">{t("rangeQuarter")}</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={payoutColumns}
            data={PAYOUTS}
            emptyMessage={t("emptyPayouts")}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
