"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "./schema/passwordSchema";
import { PasswordInput } from "@/components/shared/PasswordInput";

export function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function onSubmit(data) {
    setIsPasswordLoading(true);

    console.log("PASSWORD DATA:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPasswordLoading(false);
  }
  return (
    <div className="grid gap-6">
      {/* Change password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-muted-foreground" />
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password regularly for better security
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 max-w-md"
          >
            <div className="grid gap-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <PasswordInput
                id="currentPassword"
                placeholder="Enter current password"
                autoComplete="current-password"
                register={register("currentPassword")}
                error={errors.currentPassword}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <PasswordInput
                id="newPassword"
                placeholder="Enter new password"
                autoComplete="new-password"
                register={register("newPassword")}
                error={errors.newPassword}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm new password"
                autoComplete="new-password"
                register={register("confirmPassword")}
                error={errors.confirmPassword}
              />
            </div>

            <Button
              type="submit"
              size="default"
              className="w-fit"
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Two-factor auth */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-muted-foreground" />
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <ShieldCheck className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Authenticator app</p>
                <p className="text-xs text-muted-foreground">Not configured</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/mfa-setup">Set up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">Booking confirmations</p>
                <p className="text-xs text-muted-foreground">
                  When a provider confirms or declines your booking
                </p>
              </div>
              <Switch name="notifyBookings" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">Appointment reminders</p>
                <p className="text-xs text-muted-foreground">
                  Reminders before your upcoming appointments
                </p>
              </div>
              <Switch name="notifyReminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">Messages</p>
                <p className="text-xs text-muted-foreground">
                  When you receive a new message from a provider
                </p>
              </div>
              <Switch name="notifyMessages" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">Payment receipts</p>
                <p className="text-xs text-muted-foreground">
                  Confirmation when payments are processed
                </p>
              </div>
              <Switch name="notifyPayments" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50">
              <div>
                <p className="text-sm font-medium">Marketing emails</p>
                <p className="text-xs text-muted-foreground">
                  Tips, product updates, and promotional content
                </p>
              </div>
              <Switch name="notifyMarketing" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices where you're currently signed in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <span className="text-xs font-bold">W</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Windows — Chrome</p>
                    <Badge
                      variant="outline"
                      className="text-xs text-emerald-600 dark:text-emerald-400"
                    >
                      Current
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last active: Now
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <span className="text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm font-medium">iPhone — Safari</p>
                  <p className="text-xs text-muted-foreground">
                    Last active: 2 hours ago
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            Sign out of all other sessions
          </Button>
        </CardFooter>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            <div>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions — proceed with caution
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
              <div>
                <p className="text-sm font-medium">Export my data</p>
                <p className="text-xs text-muted-foreground">
                  Download all your personal data in a portable format
                </p>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="size-3.5" data-icon="inline-start" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
