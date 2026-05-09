"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword");
  const tShared = useTranslations("auth.shared");
  const tLogin = useTranslations("auth.login");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    setEmail(formData.get("email"));

    // TODO: integrate with auth API
    console.log("Password reset request:", formData.get("email"));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="grid gap-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-7 text-primary" />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t("successPrefix")}</p>
          <p className="mt-1 text-sm font-medium">{email}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("successInstructions")}
          </p>
        </div>

        <Button asChild size="lg" variant="outline" className="w-full">
          <Link href="/login">
            <ArrowLeft className="size-4" data-icon="inline-start" />
            {tShared("backToSignIn")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <p className="text-sm text-muted-foreground">{t("instructions")}</p>

      <div className="grid gap-1.5">
        <Label htmlFor="email">{tLogin("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={tLogin("emailPlaceholder")}
          required
          className="h-10"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("sendingLink")}
          </>
        ) : (
          t("sendResetLink")
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
