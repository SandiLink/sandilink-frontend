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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  Bell,
  AlertTriangle,
  Lock,
  Save,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function AdminSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [notifications, setNotifications] = useState({
    systemAlerts: true,
    disputes: true,
    flaggedContent: true,
    userRegistrations: false,
    revenueReports: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and platform settings
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your admin account password</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (data) => {
              console.log("Password Update:", data);

              await new Promise((r) => setTimeout(r, 1000));
              reset();
            })}
          >
            {/* CURRENT PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  {...register("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* NEW PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON (unchanged UI) */}
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">2FA Status</p>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled
                  ? "Two-factor authentication is currently enabled."
                  : "Two-factor authentication is currently disabled."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose which notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts for system downtime and critical errors
              </p>
            </div>
            <Switch
              checked={notifications.systemAlerts}
              onCheckedChange={() => toggleNotification("systemAlerts")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Disputes</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new disputes are filed
              </p>
            </div>
            <Switch
              checked={notifications.disputes}
              onCheckedChange={() => toggleNotification("disputes")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Flagged Content</Label>
              <p className="text-sm text-muted-foreground">
                Alerts when content is flagged for review
              </p>
            </div>
            <Switch
              checked={notifications.flaggedContent}
              onCheckedChange={() => toggleNotification("flaggedContent")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>User Registrations</Label>
              <p className="text-sm text-muted-foreground">
                Notifications for new user sign-ups
              </p>
            </div>
            <Switch
              checked={notifications.userRegistrations}
              onCheckedChange={() => toggleNotification("userRegistrations")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Revenue Reports</Label>
              <p className="text-sm text-muted-foreground">
                Weekly and monthly revenue summary reports
              </p>
            </div>
            <Switch
              checked={notifications.revenueReports}
              onCheckedChange={() => toggleNotification("revenueReports")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Platform Maintenance Mode
          </CardTitle>
          <CardDescription>
            When enabled, the platform will be inaccessible to all non-admin
            users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenanceMode && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 p-4">
              <p className="text-sm font-medium text-destructive">
                Warning: Enabling maintenance mode will immediately prevent all
                non-admin users from accessing the platform. All active sessions
                will be terminated.
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                {maintenanceMode
                  ? "Platform is currently in maintenance mode"
                  : "Platform is live and accessible"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={maintenanceMode ? "destructive" : "default"}>
                {maintenanceMode ? "Maintenance" : "Live"}
              </Badge>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={setMaintenanceMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
