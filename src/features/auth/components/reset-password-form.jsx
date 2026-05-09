"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResetPasswordForm() {
  const t = useTranslations("auth.resetPassword");
  const tShared = useTranslations("auth.shared");
  const tRegister = useTranslations("auth.register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setIsLoading(false);
      return;
    }

    // TODO: integrate with auth API — send token + new password
    console.log("Reset password");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="grid gap-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-7 text-primary" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium">{t("successHeading")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("successDescription")}
          </p>
        </div>

        <Button asChild size="lg" className="w-full">
          <Link href="/login">{tShared("signIn")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {/* New password */}
      <div className="grid gap-1.5">
        <Label htmlFor="password">{t("newPasswordLabel")}</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("newPasswordPlaceholder")}
            required
            minLength={8}
            className="h-10 pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? tShared("hidePassword") : tShared("showPassword")}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          {tRegister("passwordHint")}
        </p>
      </div>

      {/* Confirm password */}
      <div className="grid gap-1.5">
        <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            required
            minLength={8}
            className="h-10 pr-9"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
            aria-label={showConfirm ? tShared("hidePassword") : tShared("showPassword")}
          >
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("resettingPassword")}
          </>
        ) : (
          t("resetPassword")
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {tShared("rememberPassword")}{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          {tShared("signIn")}
        </Link>
      </p>
    </form>
  );
}
