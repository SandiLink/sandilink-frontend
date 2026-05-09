"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flag,
  ShieldAlert,
  Trash2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { TabsComponent } from "@/components/shared/TabsComponent";

const flaggedReviews = [
  {
    id: 1,
    type: "Review",
    content:
      "This provider is absolutely terrible and should be banned from the platform immediately...",
    reason: "Harassment / Abusive Language",
    reporter: "Sarah Mitchell",
    reportedUser: "John Doe",
    date: "2026-03-28",
    severity: "high",
  },
  {
    id: 2,
    type: "Review",
    content:
      "Fake review - this person never used the service. I can confirm they are lying.",
    reason: "Fake / Misleading Content",
    reporter: "Michael Chen",
    reportedUser: "Emily Rivera",
    date: "2026-03-30",
    severity: "medium",
  },
];

const flaggedUsers = [
  {
    id: 3,
    type: "User",
    content:
      "User profile contains inappropriate images and misleading credentials.",
    reason: "Inappropriate Profile Content",
    reporter: "Admin Auto-Detection",
    reportedUser: "Alex Thompson",
    date: "2026-03-31",
    severity: "high",
  },
  {
    id: 4,
    type: "User",
    content:
      "Suspected spam account - multiple duplicate listings created within minutes.",
    reason: "Spam / Suspicious Activity",
    reporter: "System Flag",
    reportedUser: "QuickService LLC",
    date: "2026-04-01",
    severity: "medium",
  },
];

const flaggedContentItems = [
  {
    id: 5,
    type: "Content",
    content:
      "Listing contains contact information and attempts to bypass the platform payment system.",
    reason: "Policy Violation — Off-Platform Solicitation",
    reporter: "Jessica Park",
    reportedUser: "David Wilson",
    date: "2026-04-02",
    severity: "low",
  },
];

const severityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800",
};

function FlaggedItemCard({ item, onDismiss, onRemove, onWarn }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={severityColors[item.severity]}
              >
                {item.severity.toUpperCase()}
              </Badge>
              <Badge variant="secondary">{item.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.content}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="font-medium">Reason:</span>{" "}
                <span className="text-muted-foreground">{item.reason}</span>
              </div>
              <div>
                <span className="font-medium">Reporter:</span>{" "}
                <span className="text-muted-foreground">{item.reporter}</span>
              </div>
              <div>
                <span className="font-medium">Reported User:</span>{" "}
                <span className="text-muted-foreground">
                  {item.reportedUser}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Flagged on {item.date}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDismiss(item.id)}
              className="gap-1"
            >
              <XCircle className="h-4 w-4" />
              Dismiss
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(item.id)}
              className="gap-1"
            >
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onWarn(item.id)}
              className="gap-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            >
              <AlertTriangle className="h-4 w-4" />
              Warn User
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FlaggedContent() {
  const [reviews, setReviews] = useState(flaggedReviews);
  const [users, setUsers] = useState(flaggedUsers);
  const [content, setContent] = useState(flaggedContentItems);

  const handleAction = (setter) => (id) => {
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const totalFlagged = reviews.length + users.length + content.length;
  const tabs = [
    {
      value: "reviews",
      label: (
        <span className="flex items-center gap-1">
          <ShieldAlert className="h-4 w-4" />
          Reviews ({reviews.length})
        </span>
      ),
      content: (
        <div>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No flagged reviews to review.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {reviews.map((item) => (
                <FlaggedItemCard
                  key={item.id}
                  item={item}
                  onDismiss={handleAction(setReviews)}
                  onRemove={handleAction(setReviews)}
                  onWarn={handleAction(setReviews)}
                />
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      value: "users",
      label: `Users (${users.length})`,
      content: (
        <div>
          {users.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No flagged users to review.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {users.map((item) => (
                <FlaggedItemCard
                  key={item.id}
                  item={item}
                  onDismiss={handleAction(setUsers)}
                  onRemove={handleAction(setUsers)}
                  onWarn={handleAction(setUsers)}
                />
              ))}
            </div>
          )}
        </div>
      ),
    },

    {
      value: "content",
      label: `Content (${content.length})`,
      content: (
        <div>
          {content.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                No flagged content to review.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {content.map((item) => (
                <FlaggedItemCard
                  key={item.id}
                  item={item}
                  onDismiss={handleAction(setContent)}
                  onRemove={handleAction(setContent)}
                  onWarn={handleAction(setContent)}
                />
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
          <Flag className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Flagged Content</h1>
          <p className="text-muted-foreground">
            Review and moderate flagged items across the platform (
            {totalFlagged} pending)
          </p>
        </div>
      </div>
      <TabsComponent
        tabs={tabs}
        defaultValue="reviews"
        namespace="moderation"
      />
    </div>
  );
}
