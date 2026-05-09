import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Eye,
  FileLock2,
  Flag,
  Gavel,
  KeyRound,
  Lock,
  MessageCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Trust & Safety — SandiLink",
  description:
    "How SandiLink protects users: verification, data security, payment safety, dispute resolution, and reporting tools.",
};

const PILLARS = [
  { icon: BadgeCheck, key: "verification" },
  { icon: ShieldCheck, key: "moderation" },
  { icon: Lock, key: "privacy" },
  { icon: KeyRound, key: "security" },
  { icon: FileLock2, key: "payments" },
  { icon: Gavel, key: "disputes" },
];

const POLICIES = [
  { icon: UserCheck, key: "who" },
  { icon: Eye, key: "dueDiligence" },
  { icon: MessageCircle, key: "communication" },
  { icon: AlertTriangle, key: "emergencies" },
];

const REPORTING_STEPS = [
  { step: "01", key: "s1" },
  { step: "02", key: "s2" },
  { step: "03", key: "s3" },
  { step: "04", key: "s4" },
];

export default async function TrustAndSafetyPage() {
  const t = await getTranslations("trustSafety");
  return (
    <div>
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="size-3" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("intro")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/support">
                {t("reportIssue")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/privacy">{t("readPrivacy")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("pillars.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("pillars.subheading")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Card key={p.key}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </div>
                <CardTitle className="mt-4 text-base">{t(`pillars.${p.key}Title`)}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {t(`pillars.${p.key}Body`)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("policies.heading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("policies.subheading")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {POLICIES.map((p) => (
              <div
                key={p.key}
                className="flex gap-4 rounded-2xl border bg-background p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t(`policies.${p.key}Title`)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`policies.${p.key}Body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("reporting.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("reporting.subheading")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {REPORTING_STEPS.map((s) => (
            <Card key={s.step} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  {t("reporting.stepLabel")} {s.step}
                </span>
                <CardTitle className="mt-2 text-base">{t(`reporting.${s.key}Title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t(`reporting.${s.key}Body`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t bg-primary/[0.03] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Flag className="mx-auto size-10 text-primary" />
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            {t("finalCta.body")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/support">
                {t("finalCta.primary")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/faq">{t("finalCta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
