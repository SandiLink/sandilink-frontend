"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Eye,
  EyeOff,
  FlaskConical,
  Loader2,
  PenTool,
  User,
  Stethoscope,
  GraduationCap,
  Building2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store/use-auth-store";

/**
 * Where each role lands after a successful registration. Care Provider goes
 * through the subscription gate first (Section 6.2) — every other role goes
 * straight to its dashboard.
 */
const ROLE_DESTINATIONS = {
  "service-user": "/dashboard",
  "care-provider": "/pricing?from=register",
  "student": "/student",
  "institution": "/institution",
  "preceptor": "/preceptor",
  "researcher": "/researcher",
  "grant-writer": "/grant-writer",
};

const ROLE_DEFS = [
  { id: "service-user", labelKey: "serviceUserLabel", descriptionKey: "serviceUserDescription", icon: User },
  { id: "care-provider", labelKey: "careProviderLabel", descriptionKey: "careProviderDescription", icon: Stethoscope },
  { id: "student", labelKey: "studentLabel", descriptionKey: "studentDescription", icon: GraduationCap },
  { id: "institution", labelKey: "institutionLabel", descriptionKey: "institutionDescription", icon: Building2 },
  { id: "preceptor", labelKey: "preceptorLabel", descriptionKey: "preceptorDescription", icon: BookOpen },
  { id: "researcher", labelKey: "researcherLabel", descriptionKey: "researcherDescription", icon: FlaskConical },
  { id: "grant-writer", labelKey: "grantWriterLabel", descriptionKey: "grantWriterDescription", icon: PenTool },
];

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setSubscription = useAuthStore((s) => s.setSubscription);
  const t = useTranslations("auth.register");
  const tShared = useTranslations("auth.shared");
  const tRoles = useTranslations("auth.register.roles");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      role: selectedRole,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // TODO: integrate with auth API
    console.log("Register attempt:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Care providers must pick a plan before reaching their dashboard
    // (Section 6.2). Mark the subscription pending so the dashboard gate
    // bounces them to /pricing if they try to navigate there directly.
    if (selectedRole === "care-provider") {
      setSubscription({ status: "pending", plan: null, since: null });
    }

    setIsLoading(false);
    const destination = ROLE_DESTINATIONS[selectedRole] ?? "/dashboard";
    router.push(destination);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`}
        />
        <div
          className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`}
        />
      </div>

      {step === 1 && (
        <>
          <p className="text-sm text-muted-foreground">
            {t("selectRolePrompt")}
          </p>

          <div className="grid gap-2.5">
            {ROLE_DEFS.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-3.5 rounded-lg border p-3.5 text-left transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{tRoles(role.labelKey)}</div>
                    <div className="text-xs text-muted-foreground">
                      {tRoles(role.descriptionKey)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full"
            disabled={!selectedRole}
            onClick={() => setStep(2)}
          >
            {t("continue")}
            <ArrowRight className="size-4" data-icon="inline-end" />
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="firstName">{t("firstNameLabel")}</Label>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                placeholder={t("firstNameLabel")}
                required
                className="h-10"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="lastName">{t("lastNameLabel")}</Label>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                placeholder={t("lastNameLabel")}
                required
                className="h-10"
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1.5">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-10"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1.5">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder={t("passwordPlaceholder")}
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
              {t("passwordHint")}
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <Checkbox id="terms" name="terms" required className="mt-0.5" />
            <Label htmlFor="terms" className="text-sm font-normal leading-snug">
              {t("termsAgreementBefore")}
              <Link
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                {t("termsLink")}
              </Link>
              {t("termsAgreementAnd")}
              <Link
                href="/privacy"
                className="font-medium text-primary hover:underline"
              >
                {t("privacyLink")}
              </Link>
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="size-4" data-icon="inline-start" />
              {t("back")}
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("creatingAccount")}
                </>
              ) : (
                t("createAccount")
              )}
            </Button>
          </div>
        </>
      )}

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs text-muted-foreground">{tShared("or")}</span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Social signup */}
      <Button type="button" variant="outline" size="lg" className="w-full">
        {tShared("continueWithGoogle")}
      </Button>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
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
