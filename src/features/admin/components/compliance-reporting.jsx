"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

const complianceChecklist = [
  {
    id: 1,
    requirement: "Access Controls & Authentication",
    description:
      "Multi-factor authentication and role-based access controls are enforced for all users.",
    status: "pass",
  },
  {
    id: 2,
    requirement: "Data Encryption at Rest",
    description: "All PHI data is encrypted using AES-256 encryption at rest.",
    status: "pass",
  },
  {
    id: 3,
    requirement: "Data Encryption in Transit",
    description: "All data transmissions use TLS 1.3 encryption.",
    status: "pass",
  },
  {
    id: 4,
    requirement: "Audit Logging",
    description:
      "All access to PHI is logged with user identification, timestamps, and action details.",
    status: "pass",
  },
  {
    id: 5,
    requirement: "Business Associate Agreements",
    description: "BAAs are in place with all third-party vendors handling PHI.",
    status: "pass",
  },
  {
    id: 6,
    requirement: "Breach Notification Procedures",
    description:
      "Documented procedures for breach identification, notification within 60 days.",
    status: "pass",
  },
  {
    id: 7,
    requirement: "Employee Training",
    description:
      "Annual HIPAA training completed by all staff with access to PHI.",
    status: "fail",
  },
  {
    id: 8,
    requirement: "Risk Assessment",
    description: "Annual security risk assessment conducted and documented.",
    status: "pass",
  },
  {
    id: 9,
    requirement: "Data Backup & Recovery",
    description: "Regular backups with tested disaster recovery procedures.",
    status: "pass",
  },
  {
    id: 10,
    requirement: "Minimum Necessary Standard",
    description:
      "Access to PHI is limited to the minimum necessary for job functions.",
    status: "pass",
  },
];

const retentionPolicies = [
  {
    type: "User Account Data",
    period: "Duration of account + 3 years",
    basis: "HIPAA §164.530(j)",
  },
  {
    type: "Clinical Rotation Records",
    period: "7 years",
    basis: "State medical records law",
  },
  { type: "Audit Logs", period: "6 years", basis: "HIPAA §164.530(j)" },
  {
    type: "Communication Records",
    period: "3 years",
    basis: "Platform policy",
  },
  { type: "Payment Records", period: "7 years", basis: "IRS requirements" },
  { type: "Dispute Records", period: "6 years", basis: "HIPAA §164.530(j)" },
];

export default function ComplianceReporting() {
  const stats = [
    {
      label: "Passing Requirements",
      icon: <ShieldCheck className="h-4 w-4 text-green-500" />,
      value: "12/15",
      valueColor: "text-green-600",
    },
    {
      label: "Failing Requirements",
      icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
      value: "3",
      valueColor: "text-destructive",
    },
    {
      label: "Last Audit Date",
      icon: <Calendar className="h-4 w-4" />,
      value: "Feb 15, 2026",
      valueColor: "",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Compliance Reporting
          </h1>
          <p className="text-muted-foreground">
            HIPAA compliance dashboard and reporting
          </p>
        </div>
        <div className="ms-auto">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                {stat.icon}
                {stat.label}
              </CardDescription>
              <CardTitle className={`text-2xl ${stat.valueColor}`}>
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            HIPAA Compliance Checklist
          </CardTitle>
          <CardDescription>
            Current status of all HIPAA compliance requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complianceChecklist.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                {item.status === "pass" ? (
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.requirement}</span>
                    <Badge
                      variant={
                        item.status === "pass" ? "default" : "destructive"
                      }
                    >
                      {item.status === "pass" ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Retention Policy</CardTitle>
          <CardDescription>
            How long different data types are retained on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {retentionPolicies.map((policy, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border px-4 py-3"
              >
                <div>
                  <p className="font-medium">{policy.type}</p>
                  <p className="text-xs text-muted-foreground">
                    Basis: {policy.basis}
                  </p>
                </div>
                <Badge variant="outline">{policy.period}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
