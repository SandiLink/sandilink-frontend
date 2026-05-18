"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Building2,
  Eye,
  EyeOff,
  FlaskConical,
  GraduationCap,
  Loader2,
  PenTool,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const DEMO_USERS = [
  { role: "service-user", label: "Service User", email: "user@demo.com", redirect: "/dashboard", icon: Users, color: "text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-800" },
  { role: "provider", label: "Care Provider", email: "provider@demo.com", redirect: "/provider", icon: Stethoscope, color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:border-emerald-800" },
  { role: "student", label: "Student", email: "student@demo.com", redirect: "/student", icon: GraduationCap, color: "text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-200 dark:text-violet-400 dark:bg-violet-950 dark:hover:bg-violet-900 dark:border-violet-800" },
  { role: "preceptor", label: "Preceptor", email: "preceptor@demo.com", redirect: "/preceptor", icon: UserCheck, color: "text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:hover:bg-amber-900 dark:border-amber-800" },
  { role: "institution", label: "Institution", email: "institution@demo.com", redirect: "/institution", icon: Building2, color: "text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-950 dark:hover:bg-rose-900 dark:border-rose-800" },
  { role: "admin", label: "Admin", email: "admin@demo.com", redirect: "/admin", icon: ShieldCheck, color: "text-slate-600 bg-slate-50 hover:bg-slate-100 border-slate-200 dark:text-slate-400 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800" },
  { role: "researcher", label: "Researcher", email: "researcher@demo.com", redirect: "/researcher", icon: FlaskConical, color: "text-teal-600 bg-teal-50 hover:bg-teal-100 border-teal-200 dark:text-teal-400 dark:bg-teal-950 dark:hover:bg-teal-900 dark:border-teal-800" },
  { role: "grant-writer", label: "Grant Writer", email: "grantwriter@demo.com", redirect: "/grant-writer", icon: PenTool, color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950 dark:hover:bg-indigo-900 dark:border-indigo-800" },
];

const DEMO_PASSWORD = "demo1234";

export function LoginForm() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const t = useTranslations("auth.login");
  const tShared = useTranslations("auth.shared");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState(null);

  async function loginAs(demoUser) {
    setLoadingRole(demoUser.role);
    setEmail(demoUser.email);
    setPassword(DEMO_PASSWORD);

    await new Promise((r) => setTimeout(r, 600));

    setUser({ email: demoUser.email, role: demoUser.role, name: demoUser.label });
    setToken("demo-token");
    router.push(demoUser.redirect);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const formEmail = formData.get("email");
    const formPassword = formData.get("password");

    // Check if it matches a demo user
    const demoUser = DEMO_USERS.find((u) => u.email === formEmail);

    await new Promise((r) => setTimeout(r, 800));

    if (demoUser) {
      setUser({ email: demoUser.email, role: demoUser.role, name: demoUser.label });
      setToken("demo-token");
      router.push(demoUser.redirect);
   } else {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formEmail,
          password: formPassword,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    setUser(data.user);
    setToken(data.access);
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your email and password.");
  } finally {
    setIsLoading(false);
  }
}

  }

  return (
    <div className="grid gap-5">
      {/* Quick Demo Login */}
      <div className="grid gap-2">
        <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("quickDemoLogin")}</p>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_USERS.map((user) => (
            <button
              key={user.role}
              type="button"
              disabled={!!loadingRole}
              onClick={() => loginAs(user)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${user.color} disabled:opacity-50`}
            >
              {loadingRole === user.role ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <user.icon className="size-3.5" />
              )}
              {user.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs text-muted-foreground">{tShared("orSignInManually")}</span>
        <div className="flex-1 border-t border-border" />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Email */}
        <div className="grid gap-1.5">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10"
          />
        </div>

        {/* Password */}
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" name="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            {t("rememberMe")}
          </Label>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full" disabled={isLoading || !!loadingRole}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("signingIn")}
            </>
          ) : (
            t("signIn")
          )}
        </Button>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 text-xs text-muted-foreground">{tShared("or")}</span>
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Social login placeholder */}
        <Button type="button" variant="outline" size="lg" className="w-full">
          {tShared("continueWithGoogle")}
        </Button>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("noAccount")}{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            {tShared("signUp")}
          </Link>
        </p>
      </form>
    </div>
  );
}
