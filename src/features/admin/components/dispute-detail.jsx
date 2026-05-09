"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, User, FileText } from "lucide-react";

const disputeData = {
  "DSP-001": {
    id: "DSP-001",
    subject: "Unprofessional conduct during clinical rotation",
    severity: "High",
    status: "Open",
    date: "2026-03-28",
    reporter: {
      name: "Dr. Sarah Mitchell",
      email: "s.mitchell@clinic.com",
      role: "Preceptor",
    },
    reportedParty: {
      name: "Kevin Adams",
      email: "k.adams@student.edu",
      role: "Student",
    },
    description:
      "The student repeatedly arrived late to clinical rotations and was observed using their phone during patient interactions. Despite verbal warnings, the behavior continued over a two-week period. This has negatively impacted patient care and the learning environment for other students.",
    timeline: [
      { date: "2026-03-28", event: "Dispute filed by Dr. Sarah Mitchell", type: "filed" },
      { date: "2026-03-29", event: "Notification sent to reported party", type: "notification" },
      { date: "2026-03-30", event: "Response received from Kevin Adams", type: "response" },
      { date: "2026-03-31", event: "Under review by admin team", type: "review" },
    ],
  },
};

const defaultDispute = {
  id: "DSP-000",
  subject: "Dispute details not found",
  severity: "Medium",
  status: "Open",
  date: "2026-03-20",
  reporter: { name: "Unknown Reporter", email: "reporter@example.com", role: "User" },
  reportedParty: { name: "Unknown Party", email: "party@example.com", role: "User" },
  description: "No additional details available for this dispute.",
  timeline: [
    { date: "2026-03-20", event: "Dispute filed", type: "filed" },
  ],
};

const severityColor = {
  High: "destructive",
  Medium: "warning",
  Low: "secondary",
};

const timelineIcon = {
  filed: <FileText className="h-4 w-4" />,
  notification: <AlertTriangle className="h-4 w-4" />,
  response: <User className="h-4 w-4" />,
  review: <Clock className="h-4 w-4" />,
};

export default function DisputeDetail({ id }) {
  const dispute = disputeData[id] || { ...defaultDispute, id };
  const [resolution, setResolution] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/disputes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Disputes
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dispute {dispute.id}</h1>
          <p className="text-muted-foreground">{dispute.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={severityColor[dispute.severity]}>{dispute.severity}</Badge>
          <Badge variant={dispute.status === "Open" ? "outline" : "default"}>{dispute.status}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reporter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p className="font-medium">{dispute.reporter.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email:</span>
              <p className="font-medium">{dispute.reporter.email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Role:</span>
              <Badge variant="outline">{dispute.reporter.role}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reported Party</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p className="font-medium">{dispute.reportedParty.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email:</span>
              <p className="font-medium">{dispute.reportedParty.email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Role:</span>
              <Badge variant="outline">{dispute.reportedParty.role}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Issue Description</CardTitle>
          <CardDescription>Filed on {dispute.date}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{dispute.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Timeline of Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dispute.timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  {timelineIcon[item.type] || <Clock className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.event}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resolution</CardTitle>
          <CardDescription>Provide your resolution notes and take action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution Notes</Label>
            <Textarea
              id="resolution"
              placeholder="Enter your resolution notes here..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              rows={4}
            />
          </div>
          <Separator />
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Resolve
            </Button>
            <Button variant="destructive">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
            <Button variant="outline">
              <XCircle className="mr-2 h-4 w-4" />
              Dismiss
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
