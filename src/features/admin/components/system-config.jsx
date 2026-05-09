"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Database,
  RefreshCw,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

const envVars = [
  {
    key: "DATABASE_URL",
    value: "postgres://****:****@db.sandilink.com:5432/prod",
  },
  { key: "REDIS_URL", value: "redis://****@cache.sandilink.com:6379" },
  { key: "SMTP_HOST", value: "smtp.sandilink.com" },
  { key: "SMTP_PASSWORD", value: "************************" },
  { key: "JWT_SECRET", value: "************************" },
  { key: "STRIPE_SECRET_KEY", value: "sk_live_****************************" },
  { key: "AWS_ACCESS_KEY_ID", value: "AKIA****************************" },
  { key: "AWS_SECRET_ACCESS_KEY", value: "************************" },
];

function ProgressBar({ value, label, color = "bg-primary" }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function SystemConfig() {
  const [showEnv, setShowEnv] = useState(false);
  const stats = [
    {
      label: "Uptime",
      icon: <Activity className="h-4 w-4" />,
      value: "99.9%",
      extra: <p className="text-xs text-muted-foreground">Last 30 days</p>,
    },
    {
      label: "CPU Usage",
      icon: <Cpu className="h-4 w-4" />,
      value: "34%",
      extra: <ProgressBar value={34} label="" color="bg-blue-500" />,
    },
    {
      label: "Memory",
      icon: <MemoryStick className="h-4 w-4" />,
      value: "62%",
      extra: <ProgressBar value={62} label="" color="bg-yellow-500" />,
    },
    {
      label: "Storage",
      icon: <HardDrive className="h-4 w-4" />,
      value: "47%",
      extra: <ProgressBar value={47} label="" color="bg-green-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          System Configuration
        </h1>
        <p className="text-muted-foreground">
          Monitor system health and manage configuration
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                {stat.icon}
                {stat.label}
              </CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>{stat.extra}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Status
          </CardTitle>
          <CardDescription>
            Database and file system backup information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="font-medium">Last Backup Successful</span>
              </div>
              <p className="text-sm text-muted-foreground">
                March 31, 2026 at 03:00 AM UTC
              </p>
              <p className="text-xs text-muted-foreground">
                Size: 4.2 GB | Duration: 12 min
              </p>
            </div>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Trigger Backup
            </Button>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">Daily Backups</p>
              <p className="font-medium">Retained: 7 days</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">Weekly Backups</p>
              <p className="font-medium">Retained: 4 weeks</p>
            </div>
            <div className="rounded-md border p-3">
              <p className="text-muted-foreground">Monthly Backups</p>
              <p className="font-medium">Retained: 12 months</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>
                Current environment configuration (masked)
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEnv(!showEnv)}
            >
              {showEnv ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Values
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Values
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {envVars.map((env) => (
              <div
                key={env.key}
                className="flex items-center justify-between rounded-md bg-muted px-4 py-2 font-mono text-sm"
              >
                <span className="font-semibold">{env.key}</span>
                <span className="text-muted-foreground">
                  {showEnv ? env.value : "••••••••••••••••"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
