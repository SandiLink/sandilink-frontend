"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export function TransactionsList({ items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        {items.length > 0 ? (
          <div className="grid gap-2">
            {items.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border p-3.5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${
                      tx.status === "Paid"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                    }`}
                  >
                    {tx.status === "Paid" ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <Clock className="size-4" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{tx.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.project}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {tx.type} · {tx.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">{tx.amount}</p>
                  <Badge
                    variant={tx.status === "Paid" ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No transactions found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
