"use client";

import { useTranslations } from "next-intl";
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsComponent } from "@/components/shared/TabsComponent";
import { TransactionsList } from "./earning-dashboard/TransactionsList";

const STATS = [
  {
    titleKey: "statTotalEarnings",
    trendKey: "statTotalEarningsTrend",
    value: "$68,400",
    trendUp: true,
    icon: DollarSign,
    color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  },
  {
    titleKey: "statThisMonth",
    trendKey: "statThisMonthTrend",
    value: "$8,450",
    trendUp: true,
    icon: TrendingUp,
    color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
  {
    titleKey: "statPendingPayments",
    trendKey: "statPendingPaymentsTrend",
    trendParams: { count: 3 },
    value: "$7,700",
    trendUp: null,
    icon: Clock,
    color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    titleKey: "statAvgPerProject",
    trendKey: "statAvgPerProjectTrend",
    value: "$4,560",
    trendUp: true,
    icon: CreditCard,
    color: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
  },
];

const TRANSACTIONS = [
  { id: "tx-001", client: "Dr. Karen Lee", project: "PCORI — Patient-Centered Outcomes", type: "Proposal Review", amount: "$1,500", date: "Apr 3, 2026", status: "Paid" },
  { id: "tx-002", client: "Dr. Amira Rashid", project: "NIH R21 — Mental Health Interventions", type: "Milestone — Specific Aims", amount: "$2,500", date: "Mar 18, 2026", status: "Paid" },
  { id: "tx-003", client: "Dr. Amira Rashid", project: "NIH R21 — Mental Health Interventions", type: "Milestone — Final Delivery", amount: "$2,500", date: "Apr 15, 2026", status: "Pending" },
  { id: "tx-004", client: "Dr. Robert Chen", project: "NSF CAREER — Biomedical Imaging", type: "Resubmission", amount: "$4,200", date: "May 1, 2026", status: "Pending" },
  { id: "tx-005", client: "Dr. Sarah Mitchell", project: "RWJF — Health Equity", type: "Full Proposal — Deposit", amount: "$1,000", date: "Apr 1, 2026", status: "Paid" },
  { id: "tx-006", client: "Dr. R. Thompson", project: "NIH R01 — Cardiovascular Disease", type: "Full Proposal", amount: "$6,200", date: "Dec 20, 2025", status: "Paid" },
  { id: "tx-007", client: "Dr. J. Kim", project: "NSF — Health Informatics Infrastructure", type: "Full Proposal", amount: "$4,800", date: "Nov 15, 2025", status: "Paid" },
  { id: "tx-008", client: "Dr. M. Patel", project: "PCORI — Diabetes Management", type: "Full Proposal", amount: "$5,500", date: "Oct 20, 2025", status: "Paid" },
];

const MONTHLY_EARNINGS = [
  { month: "Oct 2025", amount: "$5,500" },
  { month: "Nov 2025", amount: "$4,800" },
  { month: "Dec 2025", amount: "$6,200" },
  { month: "Jan 2026", amount: "$3,200" },
  { month: "Feb 2026", amount: "$4,100" },
  { month: "Mar 2026", amount: "$6,400" },
  { month: "Apr 2026", amount: "$8,450" },
];

export function EarningsDashboard() {
  const t = useTranslations("dashboards.grantWriterEarnings");
  const paid = TRANSACTIONS.filter((tx) => tx.status === "Paid");
  const pending = TRANSACTIONS.filter((tx) => tx.status === "Pending");

  const tabs = [
    { value: "all", label: t("tabAll", { count: TRANSACTIONS.length }), content: <TransactionsList items={TRANSACTIONS} /> },
    { value: "paid", label: t("tabPaid", { count: paid.length }), content: <TransactionsList items={paid} /> },
    { value: "pending", label: t("tabPending", { count: pending.length }), content: <TransactionsList items={pending} /> },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            {t("pageTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("pageIntro")}</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="size-4" />
          {t("exportCsv")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.titleKey} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{t(s.titleKey)}</p>
                <div className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold font-heading tracking-tight">
                {s.value}
              </p>
              <div className="mt-0.5 flex items-center gap-1 text-xs">
                {s.trendUp !== null &&
                  (s.trendUp ? (
                    <ArrowUpRight className="size-3 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="size-3 text-destructive" />
                  ))}
                <span
                  className={
                    s.trendUp
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-muted-foreground"
                  }
                >
                  {t(s.trendKey, s.trendParams ?? {})}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>{t("monthlyTitle")}</CardTitle>
          <CardDescription>{t("monthlyDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {MONTHLY_EARNINGS.map((m) => {
              const val = parseInt(m.amount.replace(/[$,]/g, ""));
              const maxVal = 8500;
              const pct = (val / maxVal) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium">{m.amount}</span>
                  <div
                    className="w-full rounded-t-md bg-primary/80"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {m.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <TabsComponent tabs={tabs} defaultValue="all" />
    </div>
  );
}
