"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Flag, MessageSquare, Image, FileText, Star } from "lucide-react";

const initialItems = [
  {
    id: "MOD-001",
    type: "Review",
    content:
      "This preceptor was absolutely terrible. They clearly have no idea what they are doing and should not be allowed to teach. Total waste of time and money.",
    reportedBy: "Auto-flagged",
    reportReason: "Potentially abusive language",
    date: "2026-03-30",
    author: "Anonymous User",
  },
  {
    id: "MOD-002",
    type: "Comment",
    content:
      "Contact me at external-site.com for better rotation placements at half the price! Guaranteed spots available.",
    reportedBy: "Dr. James Liu",
    reportReason: "Spam / external advertising",
    date: "2026-03-29",
    author: "SpamBot2026",
  },
  {
    id: "MOD-003",
    type: "Profile",
    content:
      "Profile bio contains unverified medical credentials and claims board certification that cannot be confirmed through official registries.",
    reportedBy: "Compliance Team",
    reportReason: "Unverified credentials",
    date: "2026-03-28",
    author: "Dr. Mark Stevens",
  },
  {
    id: "MOD-004",
    type: "Image",
    content:
      "Uploaded profile image appears to contain watermarked stock photography that may violate copyright.",
    reportedBy: "Auto-flagged",
    reportReason: "Potential copyright violation",
    date: "2026-03-27",
    author: "Clinic Partners LLC",
  },
];

const typeIcon = {
  Review: <Star className="h-4 w-4" />,
  Comment: <MessageSquare className="h-4 w-4" />,
  Profile: <FileText className="h-4 w-4" />,
  Image: <Image className="h-4 w-4" />,
};

const typeBadgeVariant = {
  Review: "default",
  Comment: "secondary",
  Profile: "outline",
  Image: "warning",
};

export default function ContentModeration() {
  const [items, setItems] = useState(initialItems);

  const handleApprove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
          <p className="text-muted-foreground">Review and moderate reported content</p>
        </div>
        <div className="flex items-center gap-2 ms-auto">
          <Flag className="h-5 w-5 text-destructive" />
          <span className="text-sm font-medium">{items.length} items in queue</span>
        </div>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium">All clear!</h3>
            <p className="text-muted-foreground">No content pending moderation.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{item.id}</CardTitle>
                    <Badge variant={typeBadgeVariant[item.type]}>
                      <span className="mr-1 inline-flex">{typeIcon[item.type]}</span>
                      {item.type}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <CardDescription>
                  Reported by: {item.reportedBy} &mdash; {item.reportReason}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm">{item.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Author: {item.author}</p>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(item.id)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(item.id)}
                  >
                    <XCircle className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
