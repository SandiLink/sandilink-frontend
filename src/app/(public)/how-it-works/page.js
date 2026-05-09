import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserPlus,
  Users,
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
  title: "How It Works — SandiLink",
  description:
    "How SandiLink connects service users, care providers, students, preceptors, researchers, and grant writers across three global marketplaces.",
};

const STEPS = [
  { step: "01", icon: UserPlus, key: "s1" },
  { step: "02", icon: FileText, key: "s2" },
  { step: "03", icon: Search, key: "s3" },
  { step: "04", icon: MessageCircle, key: "s4" },
  { step: "05", icon: CreditCard, key: "s5" },
  { step: "06", icon: CalendarCheck, key: "s6" },
];

const VERTICALS = [
  {
    id: "healthcare",
    icon: HeartPulse,
    accent: "border-l-teal-500",
    tagColor: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
    iconColor: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950",
    href: "/register",
  },
  {
    id: "education",
    icon: GraduationCap,
    accent: "border-l-amber-500",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    iconColor: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    href: "/register",
  },
  {
    id: "research",
    icon: FlaskConical,
    accent: "border-l-blue-500",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    iconColor: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    href: "/register",
  },
];

const VALUE_PROPS = [
  { icon: ShieldCheck, key: "verification" },
  { icon: Sparkles, key: "subscription" },
  { icon: Users, key: "global" },
  { icon: Star, key: "pricing" },
];

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks");
  return (
    <div>
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
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
              <Link href="/register">
                {t("ctaCreate")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/faq">{t("ctaFaq")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("flow.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("flow.subheading")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <Card key={s.step} className="border-l-4 border-l-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" />
                  </div>
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                    {t("stepLabel")} {s.step}
                  </span>
                </div>
                <CardTitle className="mt-3 text-base">{t(`flow.${s.key}Title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {t(`flow.${s.key}Body`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("verticals.heading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("verticals.subheading")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <Card key={v.id} className={`border-l-4 ${v.accent}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl ${v.iconColor}`}
                    >
                      <v.icon className="size-5" />
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${v.tagColor}`}
                    >
                      {t(`verticals.${v.id}Title`)}
                    </span>
                  </div>
                  <CardTitle className="mt-4 text-lg">{t(`verticals.${v.id}Title`)}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t(`verticals.${v.id}Summary`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2.5">
                    {[1, 2, 3].map((n) => (
                      <li
                        key={n}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary/70" />
                        <span>{t(`verticals.${v.id}Flow${n}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" variant="outline" asChild>
                    <Link href={v.href}>
                      {t(`verticals.${v.id}Cta`)}
                      <ArrowRight className="size-4" data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("why.heading")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("why.subheading")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.key}
              className="rounded-2xl border bg-background p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <v.icon className="size-5" />
              </div>
              <p className="mt-4 text-sm font-semibold">{t(`why.${v.key}Title`)}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`why.${v.key}Body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-primary/[0.03] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            {t("finalCta.body")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                {t("finalCta.primary")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/trust-and-safety">{t("finalCta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
