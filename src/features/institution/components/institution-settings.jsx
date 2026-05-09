"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { passwordSchema } from "./schema/passwordSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const INITIAL_TEAM = [
  { name: "Dr. Patricia Adams", email: "padams@uni.edu", role: "Admin" },
  { name: "John Rivera", email: "jrivera@uni.edu", role: "Coordinator" },
];

const TEAM_ROLES = ["Admin", "Coordinator", "Viewer"];

export function InstitutionSettings() {
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Coordinator" });
  const [inviteSubmitting, setInviteSubmitting] = useState(false);
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

  function openInvite() {
    setInviteForm({ name: "", email: "", role: "Coordinator" });
    setInviteOpen(true);
  }

  function handleInvite(e) {
    e.preventDefault();
    const email = inviteForm.email.trim();
    const name = inviteForm.name.trim();
    if (!email || !name) {
      toast.error("Name and email are required.");
      return;
    }
    if (team.some((m) => m.email.toLowerCase() === email.toLowerCase())) {
      toast.error(`${email} is already on the team.`);
      return;
    }
    setInviteSubmitting(true);
    setTimeout(() => {
      setTeam((prev) => [...prev, { name, email, role: inviteForm.role }]);
      setInviteSubmitting(false);
      setInviteOpen(false);
      toast.success(`Invitation sent to ${email}`, {
        description: `They will receive a link to join as ${inviteForm.role}.`,
      });
    }, 500);
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5 text-muted-foreground" />
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your admin account password
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
                label: "Placement updates",
                desc: "When placements are accepted, declined, or completed",
                on: true,
              },
              {
                label: "Student activity",
                desc: "When students upload documents or log hours",
                on: true,
              },
              {
                label: "Messages",
                desc: "New messages from preceptors",
                on: true,
              },
              {
                label: "Agreement expiry",
                desc: "30 days before an agreement expires",
                on: true,
              },
              {
                label: "Weekly summary",
                desc: "Weekly digest of all placement activity",
                on: true,
              },
              {
                label: "Platform updates",
                desc: "New features and announcements",
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
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage who has access to this institution account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {team.map((m) => (
              <div
                key={m.email}
                className="flex items-center justify-between rounded-lg border p-3.5"
              >
                <div>
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <Badge variant="outline">{m.role}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" onClick={openInvite}>
            <Mail className="size-3.5" data-icon="inline-start" />
            Invite team member
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md!">
          <form onSubmit={handleInvite}>
            <DialogHeader>
              <DialogTitle>Invite team member</DialogTitle>
              <DialogDescription>
                They will receive an email invitation with a link to join your institution.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="invite-name">Full name</Label>
                <Input
                  id="invite-name"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Maria Lopez"
                  autoComplete="name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invite-email">Email address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="name@your-institution.edu"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invite-role">Role</Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(v) => setInviteForm((p) => ({ ...p, role: v }))}
                >
                  <SelectTrigger id="invite-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setInviteOpen(false)}
                disabled={inviteSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={inviteSubmitting}>
                {inviteSubmitting && <Loader2 className="size-4 animate-spin" data-icon="inline-start" />}
                {inviteSubmitting ? "Sending…" : "Send invitation"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="border-destructive/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
            <div>
              <p className="text-sm font-medium">Delete institution account</p>
              <p className="text-xs text-muted-foreground">
                This will remove all students, placements, and agreements
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="size-3.5" data-icon="inline-start" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
