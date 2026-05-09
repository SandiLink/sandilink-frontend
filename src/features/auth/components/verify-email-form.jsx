"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export function VerifyEmailForm({ email = "user@example.com" }) {
  const t = useTranslations("auth.verifyEmail");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  async function handleVerify(e) {
    e.preventDefault();
    if (code.length < 6) return;

    setIsVerifying(true);

    // TODO: integrate with auth API
    console.log("Verify code:", code);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsVerifying(false);
  }

  async function handleResend() {
    setIsResending(true);

    // TODO: integrate with auth API
    console.log("Resend verification to:", email);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsResending(false);

    // Start cooldown
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <form onSubmit={handleVerify} className="grid gap-6">
      {/* Icon */}
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
        <Mail className="size-7 text-primary" />
      </div>

      {/* Info text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">{t("sentCodeTo")}</p>
        <p className="mt-1 text-sm font-medium">{email}</p>
      </div>

      {/* OTP Input */}
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="size-11 text-base" />
            <InputOTPSlot index={1} className="size-11 text-base" />
            <InputOTPSlot index={2} className="size-11 text-base" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="size-11 text-base" />
            <InputOTPSlot index={4} className="size-11 text-base" />
            <InputOTPSlot index={5} className="size-11 text-base" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Verify button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={code.length < 6 || isVerifying}
      >
        {isVerifying ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("verifying")}
          </>
        ) : (
          t("verifyEmail")
        )}
      </Button>

      {/* Resend */}
      <p className="text-center text-sm text-muted-foreground">
        {t("didntReceive")}{" "}
        {resendCooldown > 0 ? (
          <span className="font-medium">
            {t("resendIn", { seconds: resendCooldown })}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-medium text-primary hover:underline disabled:opacity-50"
          >
            {isResending ? t("sending") : t("resendCode")}
          </button>
        )}
      </p>
    </form>
  );
}
