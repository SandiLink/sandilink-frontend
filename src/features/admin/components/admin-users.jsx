"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, CheckCircle, Ban, UserCog } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { useRouter } from "next/navigation";

const sampleUsers = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    role: "provider",
    status: "active",
    joined: "2025-08-14",
  },
  {
    id: "2",
    name: "James Rodriguez",
    email: "james.r@example.com",
    role: "student",
    status: "active",
    joined: "2025-09-02",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "student",
    status: "pending",
    joined: "2026-03-28",
  },
  {
    id: "4",
    name: "Dr. Michael Brooks",
    email: "m.brooks@example.com",
    role: "provider",
    status: "suspended",
    joined: "2025-07-11",
  },
  {
    id: "5",
    name: "Westfield University",
    email: "admin@westfield.edu",
    role: "institution",
    status: "active",
    joined: "2025-10-05",
  },
  {
    id: "6",
    name: "Aisha Patel",
    email: "aisha.patel@example.com",
    role: "student",
    status: "active",
    joined: "2025-11-19",
  },
  {
    id: "7",
    name: "Robert Kim",
    email: "robert.kim@example.com",
    role: "admin",
    status: "active",
    joined: "2025-06-01",
  },
  {
    id: "8",
    name: "Dr. Lisa Nguyen",
    email: "l.nguyen@example.com",
    role: "provider",
    status: "pending",
    joined: "2026-03-15",
  },
  {
    id: "9",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    role: "student",
    status: "suspended",
    joined: "2025-12-08",
  },
  {
    id: "10",
    name: "Bright Horizons Clinic",
    email: "contact@brighthorizons.org",
    role: "institution",
    status: "pending",
    joined: "2026-04-01",
  },
];

const roleColors = {
  admin: "default",
  provider: "secondary",
  student: "outline",
  institution: "default",
};

const statusColors = {
  active: "default",
  pending: "secondary",
  suspended: "destructive",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminUsers() {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const userTableColumns = [
    {
      header: "User",
      accessorKey: "name",
      className: "text-left",
      cellClassName: "",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (user) => (
        <Badge variant={roleColors[user.role]}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (user) => (
        <Badge variant={statusColors[user.status]}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Joined",
      accessorKey: "joined",
      cellClassName: "text-muted-foreground",
      cell: (user) =>
        new Date(user.joined).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    },
  ];

  const userTableActions = (user) => {
    const actions = [
      {
        content: (
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Details
          </div>
        ),
        onClick: () => {
          router.push(`/admin/users/${user.id}`);
        },
      },
    ];

    actions.push({ separator: true });

    if (user.status === "pending") {
      actions.push({
        content: (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Approve
          </div>
        ),
        onClick: () => {
          console.log("Approve", user.id);
        },
      });
    }

    if (user.status === "active") {
      actions.push({
        content: (
          <div className="flex items-center gap-2 text-destructive">
            <Ban className="h-4 w-4" />
            Suspend
          </div>
        ),
        onClick: () => {
          console.log("Suspend", user.id);
        },
        className: "text-destructive",
      });
    }

    actions.push({
      content: (
        <div className="flex items-center gap-2">
          <UserCog className="h-4 w-4" />
          Change Role
        </div>
      ),
      onClick: () => {
        console.log("Change role", user.id);
      },
    });

    return actions;
  };

  const filtered = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
        <p className="text-muted-foreground">
          Manage users across all roles on the platform.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="institution">Institution</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={userTableColumns}
            data={filtered}
            actions={userTableActions}
            emptyMessage="No users match your filters."
            rowClassName={() => "hover:bg-muted/30 transition-colors"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
