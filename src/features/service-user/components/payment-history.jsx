"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Download,
  Plus,
  Trash2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";

const TRANSACTIONS = [
  {
    id: "txn-001",
    date: "Mar 30, 2026",
    description: "Dr. Sarah Johnson — General Practice",
    type: "payment",
    amount: 125.0,
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn-002",
    date: "Mar 20, 2026",
    description: "Dr. James Wilson — Cardiology",
    type: "payment",
    amount: 205.0,
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn-003",
    date: "Mar 15, 2026",
    description: "Dr. Lisa Park — Dermatology (Refund)",
    type: "refund",
    amount: 180.0,
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn-004",
    date: "Mar 10, 2026",
    description: "Dr. Lisa Park — Dermatology",
    type: "payment",
    amount: 180.0,
    status: "completed",
    method: "Mastercard •••• 8888",
  },
  {
    id: "txn-005",
    date: "Feb 28, 2026",
    description: "Dr. Emily Davis — Mental Health",
    type: "payment",
    amount: 105.0,
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "txn-006",
    date: "Feb 15, 2026",
    description: "Dr. Sarah Johnson — General Practice",
    type: "payment",
    amount: 125.0,
    status: "completed",
    method: "Visa •••• 4242",
  },
];

const PAYMENT_METHODS = [
  {
    id: "visa-4242",
    brand: "Visa",
    last4: "4242",
    expiry: "12/27",
    isDefault: true,
  },
  {
    id: "mc-8888",
    brand: "Mastercard",
    last4: "8888",
    expiry: "06/28",
    isDefault: false,
  },
];

const STATS = {
  totalSpent: 760.0,
  thisMonth: 330.0,
  avgPerVisit: 148.0,
  totalVisits: 5,
};
const stats = [
  {
    label: "Total Spent",
    value: `$760.0`,
    sub: "All time",
  },
  {
    label: "This Month",
    value: `$330.0`,
    sub: "March 2026",
  },
  {
    label: "Avg. Per Visit",
    value: `$148.0`,
    sub: `Across 5 visits`,
  },
  {
    label: "Total Visits",
    value: 5,
    sub: "This year",
  },
];

const transactionColumns = [
  {
    header: "Date",
    accessorKey: "date",
    cellClassName: "text-xs text-muted-foreground whitespace-nowrap",
  },
  {
    header: "Description",
    accessorKey: "description",
    cellClassName: "text-sm",
  },
  {
    header: "Method",
    accessorKey: "method",
    cellClassName: "text-xs text-muted-foreground whitespace-nowrap",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (txn) => (
      <Badge variant="outline" className="text-xs capitalize">
        {txn.status}
      </Badge>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    className: "text-right",
    cell: (txn) => (
      <span
        className={`flex items-center justify-end gap-0.5 text-sm font-medium ${
          txn.type === "refund" ? "text-emerald-600 dark:text-emerald-400" : ""
        }`}
      >
        {txn.type === "refund" ? (
          <ArrowDownRight className="size-3" />
        ) : (
          <ArrowUpRight className="size-3 text-muted-foreground" />
        )}
        {txn.type === "refund" ? "+" : "-"}${txn.amount.toFixed(2)}
      </span>
    ),
  },
  {
    header: "", // 👈 empty header like your original
    accessorKey: "download",
    cell: (txn) => (
      <Button variant="ghost" size="icon-xs">
        <Download className="size-3.5" />
      </Button>
    ),
  },
];

export function PaymentHistory() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} size="sm">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold font-heading">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Payment methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your saved cards</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              <Plus className="size-3.5" data-icon="inline-start" />
              Add card
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {PAYMENT_METHODS.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between rounded-lg border p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <CreditCard className="size-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {card.brand} •••• {card.last4}
                      </p>
                      {card.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Expires {card.expiry}
                    </p>
                  </div>
                </div>
                {!card.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction history */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>All your payments and refunds</CardDescription>
          <CardAction>
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">This quarter</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={transactionColumns}
            data={TRANSACTIONS}
            emptyMessage="No transactions found."
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
