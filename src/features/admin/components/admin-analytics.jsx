"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingUp, CalendarCheck, Clock } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

const stats = [
  {
    title: "Total Revenue",
    value: "$482K",
    description: "All-time platform revenue",
    icon: DollarSign,
    trend: "+12% from last month",
  },
  {
    title: "Monthly Growth",
    value: "+15%",
    description: "User base growth rate",
    icon: TrendingUp,
    trend: "Up from +11% last month",
  },
  {
    title: "Booking Rate",
    value: "89%",
    description: "Successful booking completion",
    icon: CalendarCheck,
    trend: "+3% from last month",
  },
  {
    title: "Avg Session",
    value: "$148",
    description: "Average session revenue",
    icon: Clock,
    trend: "+$8 from last month",
  },
];

const registrationTrends = [
  { month: "Nov 2025", students: 120, providers: 34, institutions: 8 },
  { month: "Dec 2025", students: 98, providers: 28, institutions: 5 },
  { month: "Jan 2026", students: 145, providers: 41, institutions: 11 },
  { month: "Feb 2026", students: 162, providers: 47, institutions: 14 },
  { month: "Mar 2026", students: 189, providers: 52, institutions: 12 },
  { month: "Apr 2026", students: 201, providers: 58, institutions: 16 },
];

const bookingsByType = [
  { type: "Virtual Consultation", count: 1284, percentage: 62 },
  { type: "In-Person Session", count: 786, percentage: 38 },
];

const placementsBySpecialty = [
  { specialty: "Clinical Psychology", count: 87, percentage: 28 },
  { specialty: "School Counseling", count: 64, percentage: 21 },
  { specialty: "Social Work", count: 58, percentage: 19 },
  { specialty: "Marriage & Family Therapy", count: 52, percentage: 17 },
  { specialty: "Substance Abuse Counseling", count: 47, percentage: 15 },
];

const monthlyRevenue = [
  {
    month: "Nov 2025",
    bookings: "$38,200",
    placements: "$12,400",
    subscriptions: "$8,900",
    total: "$59,500",
  },
  {
    month: "Dec 2025",
    bookings: "$34,800",
    placements: "$10,200",
    subscriptions: "$9,100",
    total: "$54,100",
  },
  {
    month: "Jan 2026",
    bookings: "$42,600",
    placements: "$14,800",
    subscriptions: "$9,400",
    total: "$66,800",
  },
  {
    month: "Feb 2026",
    bookings: "$48,100",
    placements: "$16,200",
    subscriptions: "$9,800",
    total: "$74,100",
  },
  {
    month: "Mar 2026",
    bookings: "$52,400",
    placements: "$18,600",
    subscriptions: "$10,200",
    total: "$81,200",
  },
  {
    month: "Apr 2026",
    bookings: "$56,800",
    placements: "$20,400",
    subscriptions: "$10,600",
    total: "$87,800",
  },
];

const maxStudents = Math.max(...registrationTrends.map((r) => r.students));

const revenueColumns = [
  {
    header: "Month",
    accessorKey: "month",
    className: "text-left",
    cellClassName: "font-medium",
  },
  {
    header: "Bookings",
    accessorKey: "bookings",
    className: "text-right",
    cellClassName: "text-right",
  },
  {
    header: "Placements",
    accessorKey: "placements",
    className: "text-right",
    cellClassName: "text-right",
  },
  {
    header: "Subscriptions",
    accessorKey: "subscriptions",
    className: "text-right",
    cellClassName: "text-right",
  },
  {
    header: "Total",
    accessorKey: "total",
    className: "text-right font-bold",
    cellClassName: "text-right font-bold",
  },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Platform Analytics
        </h1>
        <p className="text-muted-foreground">
          Overview of platform performance and key metrics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* User Registration Trends */}
      <Card>
        <CardHeader>
          <CardTitle>User Registration Trends</CardTitle>
          <CardDescription>
            Monthly new registrations by role over the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrationTrends.map((row) => (
              <div key={row.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium w-24">{row.month}</span>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Students: {row.students}</span>
                    <span>Providers: {row.providers}</span>
                    <span>Institutions: {row.institutions}</span>
                  </div>
                </div>
                <div className="flex gap-1 h-6">
                  <div
                    className="bg-primary rounded-l-sm"
                    style={{ width: `${(row.students / maxStudents) * 60}%` }}
                    title={`Students: ${row.students}`}
                  />
                  <div
                    className="bg-primary/60"
                    style={{ width: `${(row.providers / maxStudents) * 60}%` }}
                    title={`Providers: ${row.providers}`}
                  />
                  <div
                    className="bg-primary/30 rounded-r-sm"
                    style={{
                      width: `${(row.institutions / maxStudents) * 60}%`,
                    }}
                    title={`Institutions: ${row.institutions}`}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary" />
                Students
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary/60" />
                Providers
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary/30" />
                Institutions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking / Placement Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Type</CardTitle>
            <CardDescription>
              Virtual vs. in-person session breakdown.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingsByType.map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.type}</span>
                  <span className="text-muted-foreground">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Placements by Specialty</CardTitle>
            <CardDescription>
              Distribution of student placements across specialties.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {placementsBySpecialty.map((item) => (
              <div key={item.specialty} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.specialty}</span>
                  <span className="text-muted-foreground">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>
            Monthly revenue breakdown by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={revenueColumns}
            data={monthlyRevenue}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
