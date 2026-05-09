"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Pencil, Eye, FileText } from "lucide-react";

const initialTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    type: "email",
    subject: "Welcome to SandiLink!",
    description: "Sent to new users upon registration",
    lastModified: "2026-03-15",
    active: true,
  },
  {
    id: 2,
    name: "Booking Confirmation",
    type: "email",
    subject: "Your Booking is Confirmed",
    description: "Sent when a booking is confirmed by the provider",
    lastModified: "2026-03-20",
    active: true,
  },
  {
    id: 3,
    name: "Password Reset",
    type: "email",
    subject: "Reset Your Password",
    description: "Sent when a user requests a password reset",
    lastModified: "2026-02-28",
    active: true,
  },
  {
    id: 4,
    name: "Placement Request",
    type: "sms",
    subject: "New Placement Request",
    description: "SMS notification sent to providers for new placement requests",
    lastModified: "2026-03-10",
    active: true,
  },
  {
    id: 5,
    name: "Payment Receipt",
    type: "email",
    subject: "Payment Receipt - SandiLink",
    description: "Sent after a successful payment is processed",
    lastModified: "2026-03-25",
    active: true,
  },
  {
    id: 6,
    name: "Review Request",
    type: "email",
    subject: "How was your experience?",
    description: "Sent 24 hours after a completed session requesting a review",
    lastModified: "2026-03-18",
    active: false,
  },
];

export default function TemplateManagement() {
  const [templates, setTemplates] = useState(initialTemplates);

  const toggleTemplate = (id) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const emailCount = templates.filter((t) => t.type === "email").length;
  const smsCount = templates.filter((t) => t.type === "sms").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <FileText className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Template Management</h1>
          <p className="text-muted-foreground">
            Manage email and SMS notification templates ({emailCount} email, {smsCount} SMS)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                      template.type === "email"
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    {template.type === "email" ? (
                      <Mail
                        className={`h-5 w-5 ${
                          template.type === "email"
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      />
                    ) : (
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {template.type.toUpperCase()}
                      </Badge>
                      {!template.active && (
                        <Badge variant="secondary" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Subject: {template.subject} | Last modified: {template.lastModified}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Switch
                    checked={template.active}
                    onCheckedChange={() => toggleTemplate(template.id)}
                  />
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
