import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactSupportForm } from "@/components/shared/support";

export const metadata = {
  title: "Support — SandiLink",
  description:
    "Get help from the SandiLink support team. Browse the FAQ, learn how the platform works, or submit a support request.",
};

const QUICK_PATHS = [
  {
    icon: HelpCircle,
    title: "FAQ",
    body: "Most questions are answered in our searchable FAQ. Filter by category or browse the full list.",
    href: "/faq",
    cta: "Browse FAQ",
  },
  {
    icon: BookOpen,
    title: "How It Works",
    body: "New to SandiLink? Walk through the six steps that power every booking, placement, and grant project.",
    href: "/how-it-works",
    cta: "See the flow",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    body: "Learn how we verify users, protect data, and resolve disputes — and how to report issues.",
    href: "/trust-and-safety",
    cta: "Read policies",
  },
];

const CONTACT_DIRECT = [
  {
    icon: Mail,
    label: "Email",
    value: "support@onesandi.com",
    detail: "We typically respond within 24 hours.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
    detail: "Mon–Fri, 9 AM – 5 PM EST.",
  },
  {
    icon: MessageCircle,
    label: "Live chat",
    value: "Available in-app",
    detail: "Sign in to start a chat during business hours.",
  },
];

export default async function SupportPage() {
  const t = await getTranslations("support");
  return (
    <div>
      <section className="border-b bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <LifeBuoy className="size-3" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            {t("heading")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("intro")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {QUICK_PATHS.map((q) => (
            <Card key={q.title} className="flex h-full flex-col">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <q.icon className="size-5" />
                </div>
                <CardTitle className="mt-4 text-base">{q.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {q.body}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={q.href}>
                    {q.cta}
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("reachUsHeading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("reachUsIntro")}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {CONTACT_DIRECT.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border bg-background p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="size-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {c.label}
                </p>
                <p className="mt-1 text-base font-semibold">{c.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <ContactSupportForm />
      </section>
    </div>
  );
}
