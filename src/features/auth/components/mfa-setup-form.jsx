"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Loader2, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const STEPS = {
  INTRO: "intro",
  SCAN: "scan",
  VERIFY: "verify",
  DONE: "done",
};

export function MfaSetupForm() {
  const t = useTranslations("auth.mfaSetup");
  const [step, setStep] = useState(STEPS.INTRO);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: fetch from API
  const qrCodeUrl = null;
  const manualKey = "ABCD-EFGH-IJKL-MNOP";

  async function handleVerify(e) {
    e.preventDefault();
    if (code.length < 6) return;

    setIsLoading(true);

    // TODO: integrate with auth API
    console.log("Verify MFA code:", code);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep(STEPS.DONE);
  }

  if (step === STEPS.INTRO) {
    return (
      <div className="grid gap-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="size-7 text-primary" />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t("introCopy")}</p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <h3 className="text-sm font-medium">{t("youllNeed")}</h3>
          <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Smartphone className="size-4 shrink-0 text-primary" />
              {t("youllNeedAuthApp")}
            </li>
          </ul>
        </div>

        <Button size="lg" className="w-full" onClick={() => setStep(STEPS.SCAN)}>
          {t("getStarted")}
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="w-full text-muted-foreground"
          onClick={() => console.log("Skip MFA setup")}
        >
          {t("doLater")}
        </Button>
      </div>
    );
  }

  if (step === STEPS.SCAN) {
    return (
      <div className="grid gap-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-muted" />
        </div>

        <p className="text-sm text-muted-foreground">{t("scanInstructions")}</p>

        {/* QR code placeholder */}
        <div className="mx-auto flex size-48 items-center justify-center rounded-xl border bg-white">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="MFA QR Code" className="size-44" />
          ) : (
            <div className="grid gap-1 text-center text-muted-foreground">
              <ShieldCheck className="mx-auto size-10 text-muted-foreground/40" />
              <span className="text-xs">{t("qrPlaceholder")}</span>
            </div>
          )}
        </div>

        {/* Manual key */}
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">{t("cantScan")}</p>
          <p className="mt-1 font-mono text-sm font-medium tracking-wider">
            {manualKey}
          </p>
        </div>

        <Button size="lg" className="w-full" onClick={() => setStep(STEPS.VERIFY)}>
          {t("iScanned")}
        </Button>
      </div>
    );
  }

  if (step === STEPS.VERIFY) {
    return (
      <form onSubmit={handleVerify} className="grid gap-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-primary" />
          <div className="h-1 flex-1 rounded-full bg-primary" />
        </div>

        <p className="text-sm text-muted-foreground">{t("verifyInstructions")}</p>

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

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={code.length < 6 || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("verifying")}
            </>
          ) : (
            t("verifyAndActivate")
          )}
        </Button>

        <button
          type="button"
          onClick={() => setStep(STEPS.SCAN)}
          className="text-center text-sm font-medium text-primary hover:underline"
        >
          {t("backToQr")}
        </button>
      </form>
    );
  }

  // DONE
  return (
    <div className="grid gap-6">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="size-7 text-primary" />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium">{t("doneHeading")}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("doneDescription")}
        </p>
      </div>

      <Button size="lg" className="w-full" onClick={() => console.log("Continue to dashboard")}>
        {t("continue")}
      </Button>
    </div>
  );
}
