"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DollarSign, Loader2, Percent, Save, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  standardRate: z.coerce.number().min(0).max(50),
  premiumRate: z.coerce.number().min(0).max(50),
  newWriterRate: z.coerce.number().min(0).max(50),
  successThreshold: z.coerce.number().min(0).max(100),

  payoutFrequency: z.enum(["weekly", "biweekly", "monthly"]),
  minimumPayout: z.coerce.number().min(0),
  holdPeriod: z.coerce.number().min(0).max(30),

  milestone: z.boolean(),
  escrow: z.boolean(),
  refund: z.boolean(),
  dispute: z.boolean(),
  late: z.boolean(),
});

export function GrantWriterCommission() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      standardRate: 15,
      premiumRate: 10,
      newWriterRate: 20,
      successThreshold: 80,

      payoutFrequency: "biweekly",
      minimumPayout: 50,
      holdPeriod: 7,

      milestone: true,
      escrow: true,
      refund: true,
      dispute: false,
      late: false,
    },
  });

  const onSubmit = async (data) => {
    console.log("✅ Data:", data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  const stats = [
    {
      label: "Platform Revenue (MTD)",
      value: "$12,400",
      icon: DollarSign,
      color:
        "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    },
    {
      label: "Total Writer Payouts (MTD)",
      value: "$48,200",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    },
    {
      label: "Avg Commission Rate",
      value: "15%",
      icon: Percent,
      color:
        "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    },
    {
      label: "Active Writers",
      value: "67",
      icon: DollarSign,
      color:
        "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Grant Writer Fees & Commission
          </h1>
          <p className="text-muted-foreground">
            Configure platform fees, commission rates, and payout settings for
            grant writers.
          </p>
        </div>
        <div className="ms-auto">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats unchanged */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} size="sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div
                  className={`flex size-8 min-w-8 items-center justify-center rounded-lg ${s.color}`}
                >
                  <s.icon className="size-4" />
                </div>
              </div>
              <p className="mt-2 text-2xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commission inputs (unchanged UI) */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Structure</CardTitle>
          <CardDescription>
            Platform commission taken from each grant writer transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>Standard commission rate (%)</Label>
                <Input
                  {...register("standardRate")}
                  type="number"
                  className="h-10"
                />
              </div>

              <div className="grid gap-1.5">
                <Label>Premium writer rate (%)</Label>
                <Input
                  {...register("premiumRate")}
                  type="number"
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label>New writer rate (%)</Label>
                <Input
                  {...register("newWriterRate")}
                  type="number"
                  className="h-10"
                />
              </div>

              <div className="grid gap-1.5">
                <Label>Success bonus threshold (%)</Label>
                <Input
                  {...register("successThreshold")}
                  type="number"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Select needs Controller */}
              <Controller
                control={control}
                name="payoutFrequency"
                render={({ field }) => (
                  <div className="grid gap-1.5">
                    <Label>Payout frequency</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <div className="grid gap-1.5">
                <Label>Minimum payout amount ($)</Label>
                <Input
                  {...register("minimumPayout")}
                  type="number"
                  className="h-10"
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label>Payout hold period (days)</Label>
              <Input
                {...register("holdPeriod")}
                type="number"
                className="h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Switches */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1 max-w-2xl">
            {[
              {
                name: "milestone",
                label: "Milestone-based payments",
                on: true,
              },
              { name: "escrow", label: "Escrow protection", on: true },
              { name: "refund", label: "Partial refund policy", on: true },
              { name: "dispute", label: "Dispute resolution fee", on: false },
              { name: "late", label: "Late delivery penalty", on: false },
            ].map((item) => (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
                    <p className="text-sm font-medium">{item.label}</p>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
