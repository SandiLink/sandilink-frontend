"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Search } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

const logEntries = [
  {
    id: 1,
    timestamp: "2026-03-31 14:32:10",
    user: "admin@sandilink.com",
    action: "User Suspended",
    resource: "User #4521",
    ip: "192.168.1.45",
  },
  {
    id: 2,
    timestamp: "2026-03-31 13:18:44",
    user: "admin@sandilink.com",
    action: "Review Removed",
    resource: "Review #REV-005",
    ip: "192.168.1.45",
  },
  {
    id: 3,
    timestamp: "2026-03-31 11:05:22",
    user: "moderator@sandilink.com",
    action: "Content Approved",
    resource: "Comment #CMT-892",
    ip: "10.0.0.12",
  },
  {
    id: 4,
    timestamp: "2026-03-30 16:42:08",
    user: "admin@sandilink.com",
    action: "Role Changed",
    resource: "User #3287",
    ip: "192.168.1.45",
  },
  {
    id: 5,
    timestamp: "2026-03-30 15:11:33",
    user: "system",
    action: "Backup Completed",
    resource: "Database",
    ip: "10.0.0.1",
  },
  {
    id: 6,
    timestamp: "2026-03-30 09:55:17",
    user: "moderator@sandilink.com",
    action: "Dispute Resolved",
    resource: "Dispute #DSP-003",
    ip: "10.0.0.12",
  },
  {
    id: 7,
    timestamp: "2026-03-29 18:20:45",
    user: "admin@sandilink.com",
    action: "Settings Updated",
    resource: "Platform Config",
    ip: "192.168.1.45",
  },
  {
    id: 8,
    timestamp: "2026-03-29 14:08:12",
    user: "system",
    action: "Compliance Scan",
    resource: "All Records",
    ip: "10.0.0.1",
  },
  {
    id: 9,
    timestamp: "2026-03-29 10:33:56",
    user: "admin@sandilink.com",
    action: "User Created",
    resource: "User #4580",
    ip: "192.168.1.45",
  },
  {
    id: 10,
    timestamp: "2026-03-28 17:45:29",
    user: "moderator@sandilink.com",
    action: "Content Flagged",
    resource: "Review #REV-003",
    ip: "10.0.0.12",
  },
];

export default function AuditLogs() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logEntries.filter((log) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.resource.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const logColumns = [
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      className: "text-left",
      cellClassName: "font-mono text-sm",
    },
    {
      header: "User",
      accessorKey: "user",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "Action",
      accessorKey: "action",
      className: "text-left",
      cellClassName: "font-medium text-sm",
    },
    {
      header: "Resource",
      accessorKey: "resource",
      className: "text-left",
      cellClassName: "text-sm",
    },
    {
      header: "IP Address",
      accessorKey: "ip",
      className: "text-left",
      cellClassName: "font-mono text-sm",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">
            Track all administrative actions and system events
          </p>
        </div>
        <div className="ms-auto">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <div className="space-y-2 flex-1 sm:min-w-[260px] sm:max-w-sm">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by user, action, resource..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Entries</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={logColumns}
            data={filteredLogs}
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
            emptyMessage="No logs found."
          />
        </CardContent>
      </Card>
    </div>
  );
}
