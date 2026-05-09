import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  PenTool,
  Search,
  Shield,
  Star,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ═══════════════════════════════════════════════════════
// ASSET PATHS — Drop files into /public/ and uncomment/set paths
// See public/ASSETS.md for specs and naming conventions
// ═══════════════════════════════════════════════════════
const HERO_IMAGE_SRC = "/health-4.jpeg"; // Diverse team collaborating around a world-map table — global connection vibe
const EXPLAINER_VIDEO_URL = null; // e.g. "https://www.youtube.com/embed/VIDEO_ID"
const FOUNDING_CTA_BG_SRC = null; // e.g. "/founding-cta-bg.jpg"

const MARKETPLACE_IMAGES = {
  healthcare: "/health-1-1.jpeg", // Warm watercolor — care, classroom, lab scenes
  education: "/health-2-2.jpeg", // Three-vertical watercolor with education panel
  research: "/health-3.jpeg", // Holographic global data — research & discovery
};

// ═══════════════════════════════════════════════════════
// §7 BRAND COLORS per vertical — Healthcare=Teal, Education=Gold (amber), Research=Blue
// §8 Why SandiLink — 9 scenarios grouped by vertical (3 per group)
// Each card can have a `photo` field set when real people photos are approved.
// ═══════════════════════════════════════════════════════
const VISION_GROUPS = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: HeartPulse,
    accent: "border-l-teal-500",
    tagColor: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
    iconColor: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950",
    cards: [
      {
        initials: "HC1",
        photo: null, // "/scenarios/healthcare-houston-sierra-leone.jpg"
        headline:
          "A son in Houston connects with a physician in Sierra Leone to care for his mother — without borders standing in the way.",
        body: "SandiLink makes it possible for families to coordinate care for loved ones across continents.",
      },
      {
        initials: "HC2",
        photo: null, // "/scenarios/healthcare-atlanta-lagos.jpg"
        headline:
          "A young woman in Atlanta finds a trusted nurse practitioner in Lagos for virtual reproductive health guidance.",
        body: "Access to culturally aligned care becomes simple, safe, and direct.",
      },
      {
        initials: "HC3",
        photo: null, // "/scenarios/healthcare-nj-ghana.jpg"
        headline:
          "A caregiver in New Jersey connects with a community health worker in Ghana to support her aging father's daily needs.",
        body: "SandiLink extends care networks beyond geography, language, and local resources.",
      },
    ],
  },
  {
    id: "education",
    title: "Education / Preceptor Connect™",
    icon: GraduationCap,
    accent: "border-l-amber-500",
    tagColor:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    iconColor:
      "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    cards: [
      {
        initials: "ED1",
        photo: null, // "/scenarios/education-philippines-houston.jpg"
        headline:
          "A nursing student in the Philippines connects with a board-certified preceptor in Houston — no gatekeepers, no waiting lists.",
        body: "SandiLink removes barriers to clinical learning and mentorship.",
      },
      {
        initials: "ED2",
        photo: null, // "/scenarios/education-india-us.jpg"
        headline:
          "A public health student in India secures a remote practicum with a U.S.-based mentor who understands her goals.",
        body: "Geography no longer limits professional development.",
      },
      {
        initials: "ED3",
        photo: null, // "/scenarios/education-mississippi.jpg"
        headline:
          "A preceptor in Mississippi lists availability and instantly connects with students who need placements now.",
        body: "SandiLink supports both sides of the learning journey.",
      },
    ],
  },
  {
    id: "research",
    title: "Research & Grants",
    icon: FlaskConical,
    accent: "border-l-blue-500",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    iconColor: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    cards: [
      {
        initials: "RG1",
        photo: null, // "/scenarios/research-nairobi-london.jpg"
        headline:
          "A researcher in Nairobi connects with a grant writer in London to prepare a competitive global funding application.",
        body: "SandiLink accelerates research by connecting expertise across borders.",
      },
      {
        initials: "RG2",
        photo: null, // "/scenarios/research-chicago-south-africa.jpg"
        headline:
          "A doctoral student in Chicago finds a journal editor in South Africa to guide her manuscript submission.",
        body: "Support becomes accessible, personal, and timely.",
      },
      {
        initials: "RG3",
        photo: null, // "/scenarios/research-brazil-us.jpg"
        headline:
          "A research team in Brazil collaborates with U.S. grant writers to secure funding for a community health project.",
        body: "SandiLink strengthens global discovery through meaningful partnerships.",
      },
    ],
  },
];

const FOUNDING_BENEFITS = [
  {
    title: "Early Access",
    description:
      "Be first into all three marketplaces: Healthcare Services, Preceptor Connect™, and Research & Grants.",
  },
  {
    title: "Priority Placement",
    description:
      "Founding members receive priority positioning in the directory, making you more visible to learners, collaborators, and opportunities.",
  },
  {
    title: "Direct Input on Features",
    description:
      "Shape the platform. Founding members get a direct line to the product team, with your feedback influencing what we build next.",
  },
  {
    title: "Lifetime Founding Member Badge",
    description:
      "A permanent badge on your profile that signals you were here from the beginning — visible to every user who views your profile.",
  },
];

// NOTE: Keep stat numbers honest. Update these to reflect real current data before launch.
// If under the stated counts, use ranges like "100+" or language like "Growing daily".
const HYBRID_STATS = [
  { value: "500+", label: "Providers", key: "statProviders" },
  { value: "20+", label: "Countries", key: "statCountries" },
  { value: "3", label: "Marketplaces", key: "statMarketplaces" },
  { value: "1", label: "Mission", key: "statMission" },
];

// Collect real testimonials from early adopters here. Each entry appears above the founder quote.
// Leave empty until genuine member quotes are verified. Per README: 2–3 real testimonials within the
// first month dramatically boost credibility.
// Shape: { name: string, role: string, initials: string, text: string, avatar?: string }
const MEMBER_TESTIMONIALS = [];

export default function Home() {
  const t = useTranslations("landing");
  return (
    <div className="flex flex-col">
      <SiteHeader />

      {/* ═══════════════════════════════════════════════════════
          01 — HERO — §2 Full-bleed image with teal overlay (falls back to gradient)
         ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-svh items-center overflow-hidden lg:h-dvh">
        {HERO_IMAGE_SRC
          ? <>
              <div className="absolute inset-0">
                <Image
                  src={HERO_IMAGE_SRC}
                  alt="Global community of healthcare providers, students, researchers, and families"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              {/* Teal overlay per spec: #008080 @ 50% */}
              <div className="absolute inset-0 bg-[#008080]/50 mix-blend-multiply" />
              {/* Dark scrim for headline legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
            </>
          : <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 size-96 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
              <div className="absolute -right-40 top-20 size-80 rounded-full bg-accent/20 blur-3xl animate-pulse-soft [animation-delay:1.5s]" />
              <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:3s]" />
            </div>}
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-0">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in-down">
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                {t("hero.badge")}
              </span>
            </div>
            <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-6xl animate-fade-in-up">
              {t("hero.headlinePart1")}{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-50 bg-clip-text text-transparent">
                {t("hero.headlineHighlight")}
              </span>{" "}
              {t("hero.headlinePart2")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed  animate-fade-in-up [animation-delay:0.15s] text-white">
              {t("hero.subheadline")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in-up [animation-delay:0.3s]">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/register">
                  {t("hero.primaryCta")}
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                asChild
              >
                <Link href="#marketplaces">{t("hero.secondaryCta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          02 — EXPLAINER VIDEO — §3 60-second overview (click-to-play, no auto-audio)
         ═══════════════════════════════════════════════════════ */}
      <section className="border-b bg-muted/20 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Zap className="size-3" />
              {t("explainer.eyebrow")}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("explainer.heading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("explainer.subheading")}
            </p>
          </div>

          <div className="mt-10 mx-auto max-w-4xl animate-fade-in-up [animation-delay:0.15s]">
            <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted shadow-lg">
              {EXPLAINER_VIDEO_URL
                ? <iframe
                    src={EXPLAINER_VIDEO_URL}
                    title={t("explainer.placeholderTitle")}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                : <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary/15">
                      <Zap className="size-8 text-primary" />
                    </div>
                    <p className="mt-4 font-heading text-lg font-semibold">
                      {t("explainer.placeholderTitle")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("explainer.placeholderSubtitle")}
                    </p>
                  </div>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          03 — WHAT IS SANDILINK — Asymmetric 2-col
         ═══════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3 animate-fade-in-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Globe className="size-3" />
              {t("about.eyebrow")}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("about.heading")}
            </h2>
            <p className="mt-2 text-lg font-medium text-primary">
              {t("about.lede")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("about.body")}
            </p>
          </div>
          <div className="lg:col-span-2 animate-fade-in-right">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: HeartPulse,
                  label: t("about.tilesHealthcare"),
                  desc: t("about.tilesHealthcareDesc"),
                  color:
                    "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950",
                },
                {
                  icon: GraduationCap,
                  label: t("about.tilesEducation"),
                  desc: t("about.tilesEducationDesc"),
                  color:
                    "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
                },
                {
                  icon: FlaskConical,
                  label: t("about.tilesResearch"),
                  desc: t("about.tilesResearchDesc"),
                  color:
                    "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
                },
                {
                  icon: Globe,
                  label: t("about.tilesGlobal"),
                  desc: t("about.tilesGlobalDesc"),
                  color: "text-primary bg-primary/10",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="rounded-2xl border bg-background p-5 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <item.icon className="size-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          04 — THREE MARKETPLACES — §7 Teal / Gold / Blue zigzag
         ═══════════════════════════════════════════════════════ */}
      <section
        id="marketplaces"
        className="scroll-mt-16 border-y bg-muted/20 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("marketplaces.heading")}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {t("marketplaces.subheading")}
            </p>
          </div>

          {/* Marketplace 1 — Healthcare (visual LEFT, text RIGHT) — §7 Teal */}
          <div className="mt-20 grid items-center gap-10 lg:grid-cols-2 animate-fade-in-up">
            <div className="relative">
              {MARKETPLACE_IMAGES.healthcare
                ? <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border">
                    <Image
                      src={MARKETPLACE_IMAGES.healthcare}
                      alt="Healthcare providers and patients connecting globally"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-transparent to-transparent" />
                  </div>
                : <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-teal-100 via-teal-50 to-white dark:from-teal-950 dark:via-teal-950/50 dark:to-background border p-8 flex flex-col items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-teal-200/60 dark:bg-teal-900/60 animate-float">
                      <HeartPulse className="size-10 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="mt-6 grid w-full max-w-xs gap-2.5">
                      {[
                        t("marketplaces.healthcare.roleDoctors"),
                        t("marketplaces.healthcare.roleNurses"),
                        t("marketplaces.healthcare.roleWellness"),
                        t("marketplaces.healthcare.roleCommunity"),
                      ].map((role) => (
                        <div
                          key={role}
                          className="flex items-center gap-2.5 rounded-xl border bg-background/80 px-4 py-2.5 backdrop-blur"
                        >
                          <div className="size-2 rounded-full bg-teal-500" />
                          <span className="text-xs font-medium">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>}
              <div className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white font-heading shadow-lg">
                01
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 dark:bg-teal-950 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-400">
                <HeartPulse className="size-3" />
                {t("marketplaces.healthcare.tag")}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">
                {t("marketplaces.healthcare.title")}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {t("marketplaces.healthcare.lede")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("marketplaces.healthcare.body")}
              </p>
              <p className="mt-4 rounded-lg border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-950/30 py-3 pl-4 pr-3 text-sm text-teal-700 dark:text-teal-400">
                {t("marketplaces.healthcare.callout")}
              </p>
              <Button className="mt-6" size="lg" asChild>
                <Link href="/register">
                  {t("marketplaces.healthcare.cta")}
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Marketplace 2 — Education (text LEFT, visual RIGHT) — §7 Gold (amber) */}
          <div className="mt-24 grid items-center gap-10 lg:grid-cols-2 animate-fade-in-up">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-950 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                <GraduationCap className="size-3" />
                {t("marketplaces.education.tag")}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">
                {t("marketplaces.education.title")}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {t("marketplaces.education.lede")}
              </p>
              <ul className="mt-4 grid gap-3">
                {[
                  { text: t("marketplaces.education.bullet1"), icon: Search },
                  { text: t("marketplaces.education.bullet2"), icon: Users },
                  {
                    text: t("marketplaces.education.bullet3"),
                    icon: CheckCircle2,
                  },
                ].map((b) => (
                  <li
                    key={b.text}
                    className="flex items-start gap-3 rounded-xl border bg-amber-50/50 dark:bg-amber-950/20 p-3 text-sm text-muted-foreground"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                      <b.icon className="size-3.5" />
                    </div>
                    {b.text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 py-3 pl-4 pr-3 text-sm text-amber-700 dark:text-amber-400">
                {t("marketplaces.education.callout")}
              </p>
              <Button className="mt-6" size="lg" variant="outline" asChild>
                <Link href="/register">
                  {t("marketplaces.education.cta")}
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="relative order-1 lg:order-2">
              {MARKETPLACE_IMAGES.education
                ? <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border">
                    <Image
                      src={MARKETPLACE_IMAGES.education}
                      alt="Students and preceptors collaborating on clinical learning"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent" />
                  </div>
                : <div className="aspect-[4/3] rounded-3xl bg-gradient-to-bl from-amber-100 via-amber-50 to-white dark:from-amber-950 dark:via-amber-950/50 dark:to-background border p-8 flex flex-col items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-amber-200/60 dark:bg-amber-900/60 animate-float [animation-delay:0.5s]">
                      <GraduationCap className="size-10 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1.5 rounded-2xl border bg-background/80 p-4 backdrop-blur">
                        <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
                          <GraduationCap className="size-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-[10px] font-medium">
                          {t("marketplaces.education.studentsLabel")}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="h-px w-8 bg-amber-300 dark:bg-amber-700" />
                        <div className="h-px w-8 bg-amber-300 dark:bg-amber-700" />
                      </div>
                      <div className="flex flex-col items-center gap-1.5 rounded-2xl border bg-background/80 p-4 backdrop-blur">
                        <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
                          <Stethoscope className="size-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <span className="text-[10px] font-medium">
                          {t("marketplaces.education.preceptorsLabel")}
                        </span>
                      </div>
                    </div>
                  </div>}
              <div className="absolute -left-3 -top-3 flex size-12 items-center justify-center rounded-2xl bg-amber-600 text-lg font-bold text-white font-heading shadow-lg">
                02
              </div>
            </div>
          </div>

          {/* Marketplace 3 — Research (visual LEFT, text RIGHT) — §7 Blue */}
          <div className="mt-24 grid items-center gap-10 lg:grid-cols-2 animate-fade-in-up">
            <div className="relative">
              {MARKETPLACE_IMAGES.research
                ? <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border">
                    <Image
                      src={MARKETPLACE_IMAGES.research}
                      alt="Researchers and grant writers collaborating across borders"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent" />
                  </div>
                : <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-100 via-blue-50 to-white dark:from-blue-950 dark:via-blue-950/50 dark:to-background border p-8 flex flex-col items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-blue-200/60 dark:bg-blue-900/60 animate-float [animation-delay:1s]">
                      <FlaskConical className="size-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="mt-6 grid w-full max-w-xs gap-2.5">
                      {[
                        {
                          label: t("marketplaces.research.stat1Label"),
                          value: t("marketplaces.research.stat1Value"),
                        },
                        {
                          label: t("marketplaces.research.stat2Label"),
                          value: t("marketplaces.research.stat2Value"),
                        },
                        {
                          label: t("marketplaces.research.stat3Label"),
                          value: t("marketplaces.research.stat3Value"),
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-xl border bg-background/80 px-4 py-2.5 backdrop-blur"
                        >
                          <span className="text-xs text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>}
              <div className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white font-heading shadow-lg">
                03
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-950 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                <FlaskConical className="size-3" />
                {t("marketplaces.research.tag")}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">
                {t("marketplaces.research.title")}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {t("marketplaces.research.lede")}
              </p>
              <ul className="mt-4 grid gap-3">
                {[
                  {
                    text: t("marketplaces.research.bullet1"),
                    icon: FlaskConical,
                  },
                  { text: t("marketplaces.research.bullet2"), icon: PenTool },
                  {
                    text: t("marketplaces.research.bullet3"),
                    icon: CheckCircle2,
                  },
                ].map((b) => (
                  <li
                    key={b.text}
                    className="flex items-start gap-3 rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 p-3 text-sm text-muted-foreground"
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <b.icon className="size-3.5" />
                    </div>
                    {b.text}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 py-3 pl-4 pr-3 text-sm text-blue-700 dark:text-blue-400">
                {t("marketplaces.research.callout")}
              </p>
              <Button className="mt-6" size="lg" variant="outline" asChild>
                <Link href="/register">
                  {t("marketplaces.research.cta")}
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          05 — WHY SANDILINK — §8 9 scenarios grouped by vertical (proof of the product)
         ═══════════════════════════════════════════════════════ */}
      <section
        id="why-sandilink"
        className="scroll-mt-16 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("whySandilink.heading")}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t("whySandilink.subheading")}
          </p>
        </div>

        <div className="mt-16 grid gap-12">
          {VISION_GROUPS.map((group, gi) => (
            <div
              key={group.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${gi * 0.08}s` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${group.iconColor}`}
                >
                  <group.icon className="size-5" />
                </div>
                <h3 className="font-heading text-xl font-semibold tracking-tight">
                  {t(`whySandilink.groups.${group.id}`)}
                </h3>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {group.cards.map((card, i) => (
                  <Card
                    key={card.initials}
                    className={`border-l-4 ${group.accent} transition-all hover:-translate-y-1 hover:shadow-lg animate-fade-in-up`}
                    style={{ animationDelay: `${(gi * 3 + i) * 0.06}s` }}
                  >
                    <CardContent className="pt-6 pb-6">
                      <Avatar className="size-14">
                        {card.photo
                          ? <AvatarImage src={card.photo} alt="" />
                          : null}
                        <AvatarFallback
                          className={`text-xs font-semibold ${group.tagColor}`}
                        >
                          {card.initials}
                        </AvatarFallback>
                      </Avatar>
                      <p className="mt-4 text-sm font-semibold leading-snug">
                        {t(
                          "whySandilink.scenarios." +
                            card.initials.toLowerCase() +
                            "Headline",
                        )}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {t(
                          "whySandilink.scenarios." +
                            card.initials.toLowerCase() +
                            "Body",
                        )}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          06 — OUR APPROACH — Horizontal timeline steps (how we deliver trust)
         ═══════════════════════════════════════════════════════ */}
      <section
        id="approach"
        className="scroll-mt-16 border-y bg-muted/20 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("approach.heading")}
            </h2>
          </div>

          <div className="mt-16 relative">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-border lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Heart,
                  title: t("approach.pillar1Title"),
                  description: t("approach.pillar1Body"),
                  color:
                    "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950",
                  step: "01",
                },
                {
                  icon: Globe,
                  title: t("approach.pillar2Title"),
                  description: t("approach.pillar2Body"),
                  color:
                    "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
                  step: "02",
                },
                {
                  icon: Shield,
                  title: t("approach.pillar3Title"),
                  description: t("approach.pillar3Body"),
                  color:
                    "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
                  step: "03",
                },
                {
                  icon: Zap,
                  title: t("approach.pillar4Title"),
                  description: t("approach.pillar4Body"),
                  color:
                    "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
                  step: "04",
                },
              ].map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="relative text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div
                    className={`relative z-10 mx-auto flex size-14 items-center justify-center rounded-2xl ring-4 ring-background ${pillar.color}`}
                  >
                    <pillar.icon className="size-6" />
                  </div>
                  <span className="mt-3 inline-block text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                    {pillar.step}
                  </span>
                  <h3 className="mt-1 font-heading text-sm font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          07 — OUR MISSION — Split with visual (the bigger-picture why)
         ═══════════════════════════════════════════════════════ */}
      <section
        id="why"
        className="scroll-mt-16 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="animate-fade-in-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Heart className="size-3" />
              {t("mission.eyebrow")}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("mission.heading")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t("mission.lede")}
            </p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-xl border-l-4 border-primary bg-primary/5 p-5">
                <p className="text-sm font-semibold">
                  {t("mission.missionTitle")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t("mission.missionBody")}
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 p-5">
                <p className="text-sm font-semibold">
                  {t("mission.visionTitle")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t("mission.visionBody")}
                </p>
              </div>
            </div>
          </div>
          <div className="animate-fade-in-right">
            <div className="relative mx-auto max-w-sm">
              <div className="flex aspect-square items-center justify-center rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <div className="grid gap-5 p-8 text-center">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10 animate-float">
                    <Globe className="size-10 text-primary" />
                  </div>
                  <div className="grid gap-3">
                    {[
                      {
                        label: t("mission.tileHealthcare"),
                        value: t("mission.tileHealthcareValue"),
                      },
                      {
                        label: t("mission.tileEducation"),
                        value: t("mission.tileEducationValue"),
                      },
                      {
                        label: t("mission.tileResearch"),
                        value: t("mission.tileResearchValue"),
                      },
                      {
                        label: t("mission.tileCommunity"),
                        value: t("mission.tileCommunityValue"),
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-lg border bg-background/80 px-4 py-2.5"
                      >
                        <span className="text-xs text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          08 — WHO WE SERVE — Flowing role circles (the community)
         ═══════════════════════════════════════════════════════ */}
      <section className="border-y bg-muted/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-left">
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {t("community.heading")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t("community.body")}
              </p>
              <p className="mt-2 text-base font-medium text-primary">
                {t("community.accent")}
              </p>
              <Button className="mt-6" size="lg" asChild>
                <Link href="/register">
                  {t("community.cta")}
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="animate-fade-in-right">
              <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
                {[
                  {
                    icon: Users,
                    label: t("community.roleServiceUsers"),
                    color:
                      "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
                  },
                  {
                    icon: Stethoscope,
                    label: t("community.roleProviders"),
                    color:
                      "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
                  },
                  {
                    icon: GraduationCap,
                    label: t("community.roleStudents"),
                    color:
                      "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
                  },
                  {
                    icon: Search,
                    label: t("community.rolePreceptors"),
                    color:
                      "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
                  },
                  {
                    icon: FlaskConical,
                    label: t("community.roleResearchers"),
                    color:
                      "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
                  },
                  {
                    icon: PenTool,
                    label: t("community.roleGrantWriters"),
                    color:
                      "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
                  },
                  {
                    icon: Globe,
                    label: t("community.roleInstitutions"),
                    color: "bg-primary/10 text-primary",
                  },
                ].map((role, i) => (
                  <div
                    key={role.label}
                    className="flex flex-col items-center gap-2 animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className={`flex size-16 items-center justify-center rounded-full ${role.color} transition-transform hover:scale-110`}
                    >
                      <role.icon className="size-7" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {role.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          09 — CONVERSION BLOCK — §1 Founder Quote + Stat Banner + §9 Founding Member CTA
         ═══════════════════════════════════════════════════════ */}
      <section
        id="founding"
        className="scroll-mt-16 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Stat Banner */}
        <div className="mx-auto max-w-5xl rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 animate-fade-in-up">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {HYBRID_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">
                  {t(`founding.${stat.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Member Testimonials — renders only when real quotes exist */}
        {MEMBER_TESTIMONIALS.length > 0 && (
          <div className="mt-16 animate-fade-in-up [animation-delay:0.15s]">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                {t("founding.testimonialsHeading")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("founding.testimonialsBody")}
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEMBER_TESTIMONIALS.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="pt-5 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t pt-4">
                      <Avatar size="sm">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {testimonial.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* §1 Founder Quote — CEO statement verbatim */}
        <div className="mt-16 mx-auto max-w-4xl animate-fade-in-up [animation-delay:0.25s]">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/[0.03] to-accent/[0.03]">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="shrink-0 self-center sm:self-start">
                  <Avatar className="size-24 ring-4 ring-primary/10">
                    <AvatarImage
                      src="/founder-headshot.jpg"
                      alt="SandiLink Founder & CEO"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Heart className="size-8" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl text-primary/30 font-heading leading-none">
                      "
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      <Heart className="size-3" />
                      {t("founding.founderBadge")}
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {t("founding.founderQuote")}
                  </p>
                  <div className="mt-5 border-t pt-4">
                    <p className="text-sm font-semibold">
                      {t("founding.founderRole")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("founding.founderCompany")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* §9 Founding Member CTA — optional bg image */}
        <div className="mt-12 mx-auto max-w-4xl animate-fade-in-up [animation-delay:0.4s]">
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-background p-8">
            {FOUNDING_CTA_BG_SRC
              ? <>
                  <div className="absolute inset-0">
                    <Image
                      src={FOUNDING_CTA_BG_SRC}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
                </>
              : null}

            <div className="relative">
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  <Star className="size-3 fill-current" />
                  {t("founding.limitedTime")}
                </span>
                <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">
                  {t("founding.heading")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("founding.subheading")}
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {FOUNDING_BENEFITS.map((benefit, idx) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {t(`founding.benefit${idx + 1}Title`)}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {t(`founding.benefit${idx + 1}Body`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/register?founding=true">
                    {t("founding.cta")}
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          10 — FINAL CTA — Closer
         ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t bg-primary/[0.03] py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl animate-fade-in-up">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground animate-fade-in-up [animation-delay:0.1s]">
            {t("finalCta.body")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in-up [animation-delay:0.2s]">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/register">
                {t("finalCta.primary")}
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <Link href="/login">{t("finalCta.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
