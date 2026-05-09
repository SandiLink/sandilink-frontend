"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  KeyRound,
  Loader2,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordSchema } from "./schema/passwordSchema";

export function PreceptorSettings() {
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    setIsPasswordLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    console.log(data);

    setIsPasswordLoading(false);
  };
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-muted-foreground" />
            <div>
              <CardTitle>Change Password</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 max-w-md"
          >
            <div className="grid gap-1.5">
              <Label>Current password</Label>
              <PasswordInput
                id="currentPassword"
                placeholder="Enter current password"
                autoComplete="current-password"
                register={register("currentPassword")}
                error={errors.currentPassword}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>New password</Label>
              <PasswordInput
                id="newPassword"
                placeholder="Enter new password"
                autoComplete="new-password"
                register={register("newPassword")}
                error={errors.newPassword}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Confirm password</Label>
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

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-muted-foreground" />
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            {[
              {
                label: "Placement requests",
                desc: "New student placement requests",
                on: true,
              },
              {
                label: "Student messages",
                desc: "Messages from your students",
                on: true,
              },
              {
                label: "Institution messages",
                desc: "Messages from coordinating institutions",
                on: true,
              },
              {
                label: "Hours submitted",
                desc: "When students log clinical hours",
                on: true,
              },
              {
                label: "Document uploads",
                desc: "When students upload placement documents",
                on: true,
              },
              {
                label: "Schedule reminders",
                desc: "Daily summary of upcoming student sessions",
                on: true,
              },
              {
                label: "Platform updates",
                desc: "New features and tips",
                on: false,
              },
            ].map((n) => (
              <div
                key={n.label}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked={n.on} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
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

      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
              <div>
                <p className="text-sm font-medium">Deactivate account</p>
                <p className="text-xs text-muted-foreground">
                  Hide your profile from search
                </p>
              </div>
              <Button variant="outline" size="sm">
                Deactivate
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
              <div>
                <p className="text-sm font-medium">Delete account</p>
                <p className="text-xs text-muted-foreground">
                  Permanently remove your account
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
