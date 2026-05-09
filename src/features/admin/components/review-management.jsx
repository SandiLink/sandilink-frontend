"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Trash2, Flag } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

const reviews = [
  {
    id: "REV-001",
    reviewer: "Amanda Foster",
    provider: "Dr. Robert Kim",
    rating: 5,
    date: "2026-03-30",
    status: "Published",
    excerpt: "Excellent preceptor, very supportive and knowledgeable.",
  },
  {
    id: "REV-002",
    reviewer: "Brian Torres",
    provider: "City Health Clinic",
    rating: 4,
    date: "2026-03-29",
    status: "Published",
    excerpt: "Great rotation experience with diverse patient cases.",
  },
  {
    id: "REV-003",
    reviewer: "Catherine Lee",
    provider: "Dr. Anita Patel",
    rating: 1,
    date: "2026-03-28",
    status: "Flagged",
    excerpt: "Terrible experience, felt unsupported throughout.",
  },
  {
    id: "REV-004",
    reviewer: "Daniel Wright",
    provider: "Sunrise Medical Center",
    rating: 3,
    date: "2026-03-27",
    status: "Published",
    excerpt: "Average experience, could improve mentorship program.",
  },
  {
    id: "REV-005",
    reviewer: "Elena Vasquez",
    provider: "Dr. Thomas Brown",
    rating: 2,
    date: "2026-03-26",
    status: "Removed",
    excerpt: "Content violated community guidelines.",
  },
  {
    id: "REV-006",
    reviewer: "Frank Nguyen",
    provider: "Valley Family Practice",
    rating: 5,
    date: "2026-03-25",
    status: "Published",
    excerpt: "Best rotation I've had. Highly recommend!",
  },
  {
    id: "REV-007",
    reviewer: "Grace O'Brien",
    provider: "Dr. Maria Santos",
    rating: 4,
    date: "2026-03-24",
    status: "Flagged",
    excerpt: "Good preceptor but review contains personal information.",
  },
  {
    id: "REV-008",
    reviewer: "Henry Zhao",
    provider: "Metro Health Partners",
    rating: 3,
    date: "2026-03-23",
    status: "Published",
    excerpt: "Decent facility but limited hands-on opportunities.",
  },
];

const statusVariant = {
  Published: "default",
  Flagged: "warning",
  Removed: "destructive",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewManagement() {
  const [reviewList, setReviewList] = useState(reviews);
  const reviewColumns = [
    {
      header: "Reviewer",
      accessorKey: "reviewer",
      className: "text-left",
      cellClassName: "font-medium",
    },
    {
      header: "Provider / Preceptor",
      accessorKey: "provider",
      className: "text-left",
    },
    {
      header: "Rating",
      accessorKey: "rating",
      className: "text-left",
      cell: (row) => <StarRating rating={row.rating} />,
    },
    {
      header: "Date",
      accessorKey: "date",
      className: "text-left",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cellClassName: "text-right",
      cell: (row) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            title="View"
            onClick={() => console.log("View", row.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Flag"
            onClick={() => console.log("Flag", row.id)}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Remove"
            onClick={() => console.log("Remove", row.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];
  const publishedCount = reviewList.filter(
    (r) => r.status === "Published",
  ).length;
  const flaggedCount = reviewList.filter((r) => r.status === "Flagged").length;
  const removedCount = reviewList.filter((r) => r.status === "Removed").length;
  const stats = [
    { label: "Published", value: publishedCount, textColor: "text-black" },
    { label: "Flagged", value: flaggedCount, textColor: "text-yellow-600" },
    { label: "Removed", value: removedCount, textColor: "text-destructive" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review Management</h1>
        <p className="text-muted-foreground">
          Manage and moderate all platform reviews
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className={`text-2xl ${stat.textColor}`}>
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            Complete list of reviews across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={reviewColumns}
            data={reviewList}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
            emptyMessage="No reviews available."
          />
        </CardContent>
      </Card>
    </div>
  );
}
