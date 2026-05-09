"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Percent, Save } from "lucide-react";

// ✅ Zod Schema
const commissionSchema = z
  .object({
    platformFee: z.coerce.number().min(0).max(100),
    providerPayout: z.coerce.number().min(0).max(100),
    processingFee: z.coerce.number().min(0).max(100),
    minimumPayout: z.coerce.number().min(0),
  })
  .refine(
    (data) => Math.abs(data.platformFee + data.providerPayout - 100) < 0.5,
    {
      message: "Platform + Provider must equal 100%",
      path: ["providerPayout"],
    },
  );

export default function CommissionSettings() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      platformFee: 15,
      providerPayout: 85,
      processingFee: 2.9,
      minimumPayout: 25,
    },
  });

  const platformFee = watch("platformFee");
  const providerPayout = watch("providerPayout");

  // Sync values (safe pattern)
  useEffect(() => {
    if (platformFee !== undefined) {
      setValue("providerPayout", +(100 - platformFee).toFixed(1), {
        shouldValidate: true,
      });
    }
  }, [platformFee, setValue]);

  useEffect(() => {
    if (providerPayout !== undefined) {
      setValue("platformFee", +(100 - providerPayout).toFixed(1), {
        shouldValidate: true,
      });
    }
  }, [providerPayout, setValue]);

  const onSubmit = (data) => {
    console.log("✅ Valid Data:", data);
    // API call here
  };

  const stats = [
    {
      label: "Total Revenue (MTD)",
      icon: <DollarSign className="h-4 w-4" />,
      value: "$48,250.00",
      extra: (
        <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3" />
          +12.5% from last month
        </p>
      ),
    },
    {
      label: "Platform Earnings (MTD)",
      icon: <Percent className="h-4 w-4" />,
      value: "$7,237.50",
      extra: (
        <p className="text-xs text-muted-foreground mt-1">
          Based on 15% commission rate
        </p>
      ),
    },
    {
      label: "Provider Payouts (MTD)",
      icon: <DollarSign className="h-4 w-4" />,
      value: "$41,012.50",
      extra: (
        <p className="text-xs text-muted-foreground mt-1">
          Based on 85% payout rate
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
          <Percent className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Commission Settings
          </h1>
          <p className="text-muted-foreground">
            Configure platform fees and provider payout rates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                {stat.icon}
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
              {stat.extra}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Commission Rates</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Platform Fee */}
              <div className="space-y-2">
                <Label>Platform Fee (%)</Label>
                <Input type="number" step="0.1" {...register("platformFee")} />
                {errors.platformFee && (
                  <p className="text-xs text-red-500">
                    {errors.platformFee.message}
                  </p>
                )}
              </div>

              {/* Provider Payout */}
              <div className="space-y-2">
                <Label>Provider Payout (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("providerPayout")}
                />
                {errors.providerPayout && (
                  <p className="text-xs text-red-500">
                    {errors.providerPayout.message}
                  </p>
                )}
              </div>

              {/* Processing Fee */}
              <div className="space-y-2">
                <Label>Processing Fee (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  {...register("processingFee")}
                />
                {errors.processingFee && (
                  <p className="text-xs text-red-500">
                    {errors.processingFee.message}
                  </p>
                )}
              </div>

              {/* Minimum Payout */}
              <div className="space-y-2">
                <Label>Minimum Payout ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("minimumPayout")}
                />
                {errors.minimumPayout && (
                  <p className="text-xs text-red-500">
                    {errors.minimumPayout.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
