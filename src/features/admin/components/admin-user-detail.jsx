"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle,
  Ban,
  RotateCcw,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

// Sample user data keyed by ID
const usersMap = {
  "1": { id: "1", name: "Dr. Sarah Mitchell", email: "sarah.mitchell@example.com", role: "provider", status: "active", joined: "2025-08-14", lastLogin: "2026-04-02", emailVerified: true, twoFactorEnabled: true },
  "2": { id: "2", name: "James Rodriguez", email: "james.r@example.com", role: "student", status: "active", joined: "2025-09-02", lastLogin: "2026-04-01", emailVerified: true, twoFactorEnabled: false },
  "3": { id: "3", name: "Emily Chen", email: "emily.chen@example.com", role: "student", status: "pending", joined: "2026-03-28", lastLogin: "N/A", emailVerified: false, twoFactorEnabled: false },
  "4": { id: "4", name: "Dr. Michael Brooks", email: "m.brooks@example.com", role: "provider", status: "suspended", joined: "2025-07-11", lastLogin: "2026-02-18", emailVerified: true, twoFactorEnabled: true },
  "5": { id: "5", name: "Westfield University", email: "admin@westfield.edu", role: "institution", status: "active", joined: "2025-10-05", lastLogin: "2026-03-30", emailVerified: true, twoFactorEnabled: true },
  "6": { id: "6", name: "Aisha Patel", email: "aisha.patel@example.com", role: "student", status: "active", joined: "2025-11-19", lastLogin: "2026-04-02", emailVerified: true, twoFactorEnabled: false },
  "7": { id: "7", name: "Robert Kim", email: "robert.kim@example.com", role: "admin", status: "active", joined: "2025-06-01", lastLogin: "2026-04-03", emailVerified: true, twoFactorEnabled: true },
  "8": { id: "8", name: "Dr. Lisa Nguyen", email: "l.nguyen@example.com", role: "provider", status: "pending", joined: "2026-03-15", lastLogin: "N/A", emailVerified: true, twoFactorEnabled: false },
  "9": { id: "9", name: "Marcus Johnson", email: "marcus.j@example.com", role: "student", status: "suspended", joined: "2025-12-08", lastLogin: "2026-01-22", emailVerified: true, twoFactorEnabled: false },
  "10": { id: "10", name: "Bright Horizons Clinic", email: "contact@brighthorizons.org", role: "institution", status: "pending", joined: "2026-04-01", lastLogin: "N/A", emailVerified: false, twoFactorEnabled: false },
};

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

function formatDate(dateStr) {
  if (dateStr === "N/A") return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminUserDetail({ userId }) {
  const user = usersMap[userId];
  const [selectedRole, setSelectedRole] = useState(user?.role || "student");

  if (!user) {
    return (
      <div className="space-y-6">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            User not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/admin/users">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
      </Link>

      {/* PHI Notice */}
      <div className="flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
        <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          PHI data is not accessible to administrators. This view contains account
          and platform information only.
        </p>
      </div>

      {/* User Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
                <Badge variant={roleColors[user.role]}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                <Badge variant={statusColors[user.status]}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Registration and authentication details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Join Date</span>
              </div>
              <span className="text-sm font-medium">{formatDate(user.joined)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last Login</span>
              </div>
              <span className="text-sm font-medium">{formatDate(user.lastLogin)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email Verified</span>
              </div>
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Two-Factor Auth</span>
              </div>
              <Badge variant={user.twoFactorEnabled ? "default" : "secondary"}>
                {user.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>
              Change the user&apos;s role on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Current Role:</span>
              <Badge variant={roleColors[user.role]}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Change Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="institution">Institution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full"
              disabled={selectedRole === user.role}
            >
              Update Role
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Manage the status of this user&apos;s account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {user.status === "pending" && (
              <Button>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Account
              </Button>
            )}
            {user.status === "active" && (
              <Button variant="destructive">
                <Ban className="mr-2 h-4 w-4" />
                Suspend Account
              </Button>
            )}
            {user.status === "suspended" && (
              <Button>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reactivate Account
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
