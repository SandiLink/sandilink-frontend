import { readFile, writeFile } from "node:fs/promises";

const path = "src/app/page.js";
let c = await readFile(path, "utf8");

// 1. Add useTranslations import
c = c.replace(
  `import { SiteHeader } from "@/components/shared/site-header";`,
  `import { useTranslations } from "next-intl";\nimport { SiteHeader } from "@/components/shared/site-header";`
);

// 2. Add t hook inside Home component
c = c.replace(
  `export default function Home() {\n  return (`,
  `export default function Home() {\n  const t = useTranslations("landing");\n  return (`
);

// 3. Hero section
c = c.replace(
  `Trusted by 500+ professionals in 20+ countries`,
  `{t("hero.badge")}`
);

c = c.replace(
  `Connecting people to{" "}\n              <span className="bg-gradient-to-r from-amber-200 to-amber-50 bg-clip-text text-transparent">\n                care, learning, and research\n              </span>{" "}\n              — anywhere in the world.`,
  `{t("hero.headlinePart1")}{" "}\n              <span className="bg-gradient-to-r from-amber-200 to-amber-50 bg-clip-text text-transparent">\n                {t("hero.headlineHighlight")}\n              </span>{" "}\n              {t("hero.headlinePart2")}`
);

c = c.replace(
  `SandiLink is the global marketplace that brings together healthcare service users,\n              providers, students, preceptors, researchers, and grant writers in one seamless,\n              human-centered platform.`,
  `{t("hero.subheadline")}`
);

c = c.replace(
  `<Link href="/register">Get started<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("hero.primaryCta")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `<Link href="#marketplaces">Browse Services</Link>`,
  `<Link href="#marketplaces">{t("hero.secondaryCta")}</Link>`
);

// 4. Explainer section
c = c.replace(
  `<Zap className="size-3" />60-second overview`,
  `<Zap className="size-3" />{t("explainer.eyebrow")}`
);

c = c.replace(
  `See how SandiLink works.`,
  `{t("explainer.heading")}`
);

c = c.replace(
  `What if connecting to care, a mentor, or a grant writer was as easy as one click?`,
  `{t("explainer.subheading")}`
);

c = c.replace(
  `title="SandiLink — 60-second explainer"`,
  `title={t("explainer.placeholderTitle")}`
);

c = c.replace(
  `<p className="mt-4 font-heading text-lg font-semibold">60-second explainer video</p>`,
  `<p className="mt-4 font-heading text-lg font-semibold">{t("explainer.placeholderTitle")}</p>`
);

c = c.replace(
  `<p className="mt-1 text-sm text-muted-foreground">Coming soon — hosted on YouTube, click-to-play.</p>`,
  `<p className="mt-1 text-sm text-muted-foreground">{t("explainer.placeholderSubtitle")}</p>`
);

// 5. About section
c = c.replace(
  `<Globe className="size-3" />About SandiLink`,
  `<Globe className="size-3" />{t("about.eyebrow")}`
);

c = c.replace(
  `One platform. Unlimited pathways to support and expertise.`,
  `{t("about.heading")}`
);

c = c.replace(
  `A global marketplace built for access, connection, and opportunity.`,
  `{t("about.lede")}`
);

c = c.replace(
  `SandiLink is the flagship marketplace of One Sandi Platform — designed to remove barriers\n              and make it easier for people to find the support, expertise, and pathways they need.\n              Whether someone is seeking healthcare services, clinical placements, or research collaboration,\n              SandiLink brings everything together in one intuitive, inclusive, and globally accessible system.`,
  `{t("about.body")}`
);

c = c.replace(
  `{ icon: HeartPulse, label: "Healthcare", desc: "Providers, wellness, caregivers", color: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950" },\n                { icon: GraduationCap, label: "Education", desc: "Students, preceptors, schools", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },\n                { icon: FlaskConical, label: "Research", desc: "Grants, journals, collaboration", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },\n                { icon: Globe, label: "Global", desc: "20+ countries, one mission", color: "text-primary bg-primary/10" }`,
  `{ icon: HeartPulse, label: t("about.tilesHealthcare"), desc: t("about.tilesHealthcareDesc"), color: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950" },\n                { icon: GraduationCap, label: t("about.tilesEducation"), desc: t("about.tilesEducationDesc"), color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950" },\n                { icon: FlaskConical, label: t("about.tilesResearch"), desc: t("about.tilesResearchDesc"), color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950" },\n                { icon: Globe, label: t("about.tilesGlobal"), desc: t("about.tilesGlobalDesc"), color: "text-primary bg-primary/10" }`
);

// 6. Marketplaces section
c = c.replace(
  `One platform. Three interconnected marketplaces.`,
  `{t("marketplaces.heading")}`
);

c = c.replace(
  `Unlimited possibility.`,
  `{t("marketplaces.subheading")}`
);

// Healthcare marketplace
c = c.replace(
  `<HeartPulse className="size-3" />Healthcare Services`,
  `<HeartPulse className="size-3" />{t("marketplaces.healthcare.tag")}`
);

c = c.replace(
  `Healthcare Services Marketplace`,
  `{t("marketplaces.healthcare.title")}`
);

c = c.replace(
  `A global access point for healthcare support.`,
  `{t("marketplaces.healthcare.lede")}`
);

c = c.replace(
  `Individuals, families, and communities can connect with independent healthcare professionals and non-professionals — including doctors, nurses, allied health providers, caregivers, wellness practitioners, community health workers, and supportive care companions.`,
  `{t("marketplaces.healthcare.body")}`
);

c = c.replace(
  `SandiLink expands access, reduces barriers, and helps people find the right care at the right time.`,
  `{t("marketplaces.healthcare.callout")}`
);

c = c.replace(
  `<Link href="/register">Find a Provider<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("marketplaces.healthcare.cta")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `{["Doctors & Specialists", "Nurses & Allied Health", "Wellness & Caregivers", "Community Health Workers"].map((role) => (`,
  `{[t("marketplaces.healthcare.roleDoctors"), t("marketplaces.healthcare.roleNurses"), t("marketplaces.healthcare.roleWellness"), t("marketplaces.healthcare.roleCommunity")].map((role) => (`
);

// Education marketplace
c = c.replace(
  `<GraduationCap className="size-3" />Preceptor Connect™`,
  `<GraduationCap className="size-3" />{t("marketplaces.education.tag")}`
);

c = c.replace(
  `Education Marketplace`,
  `{t("marketplaces.education.title")}`
);

c = c.replace(
  `A dedicated pathway for clinical placements and mentorship.`,
  `{t("marketplaces.education.lede")}`
);

c = c.replace(
  `{ text: "Students can find preceptors and clinical mentors", icon: Search },\n                  { text: "Preceptors can list their availability and specialties", icon: Users },\n                  { text: "Schools and academic programs gain structure, clarity, and transparency", icon: CheckCircle2 }`,
  `{ text: t("marketplaces.education.bullet1"), icon: Search },\n                  { text: t("marketplaces.education.bullet2"), icon: Users },\n                  { text: t("marketplaces.education.bullet3"), icon: CheckCircle2 }`
);

c = c.replace(
  `SandiLink simplifies the clinical placement process and supports professional development.`,
  `{t("marketplaces.education.callout")}`
);

c = c.replace(
  `<Link href="/register">Find a Preceptor<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("marketplaces.education.cta")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `<span className="text-[10px] font-medium">Students</span>`,
  `<span className="text-[10px] font-medium">{t("marketplaces.education.studentsLabel")}</span>`
);

c = c.replace(
  `<span className="text-[10px] font-medium">Preceptors</span>`,
  `<span className="text-[10px] font-medium">{t("marketplaces.education.preceptorsLabel")}</span>`
);

// Research marketplace
c = c.replace(
  `<FlaskConical className="size-3" />Research & Grants`,
  `<FlaskConical className="size-3" />{t("marketplaces.research.tag")}`
);

c = c.replace(
  `Research & Grants Marketplace`,
  `{t("marketplaces.research.title")}`
);

c = c.replace(
  `A global hub for research collaboration and funding support.`,
  `{t("marketplaces.research.lede")}`
);

c = c.replace(
  `{ text: "Researchers can connect with grant writers, explore funding, and access journal pathways", icon: FlaskConical },\n                  { text: "Grant writers can showcase expertise and grow their practice", icon: PenTool },\n                  { text: "Journals and academic teams gain a unified space for collaboration", icon: CheckCircle2 }`,
  `{ text: t("marketplaces.research.bullet1"), icon: FlaskConical },\n                  { text: t("marketplaces.research.bullet2"), icon: PenTool },\n                  { text: t("marketplaces.research.bullet3"), icon: CheckCircle2 }`
);

c = c.replace(
  `SandiLink connects the global research community with the tools and people they need.`,
  `{t("marketplaces.research.callout")}`
);

c = c.replace(
  `<Link href="/register">Find a Grant Writer<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("marketplaces.research.cta")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `{ label: "Grant Discovery", value: "1,200+ grants" },\n                      { label: "Writer Matching", value: "67 experts" },\n                      { label: "Journal Access", value: "45+ journals" }`,
  `{ label: t("marketplaces.research.stat1Label"), value: t("marketplaces.research.stat1Value") },\n                      { label: t("marketplaces.research.stat2Label"), value: t("marketplaces.research.stat2Value") },\n                      { label: t("marketplaces.research.stat3Label"), value: t("marketplaces.research.stat3Value") }`
);

// 7. Why SandiLink section
c = c.replace(
  `Why SandiLink?`,
  `{t("whySandilink.heading")}`
);

c = c.replace(
  `Real scenarios. Real people. Real reach — across three marketplaces.`,
  `{t("whySandilink.subheading")}`
);

c = c.replace(
  `{group.title}`,
  `{t("whySandilink.groups." + group.id)}`
);

c = c.replace(
  `{card.headline}`,
  `{t("whySandilink.scenarios." + card.initials.toLowerCase() + "Headline")}`
);

c = c.replace(
  `{card.body}`,
  `{t("whySandilink.scenarios." + card.initials.toLowerCase() + "Body")}`
);

// 8. Approach section
c = c.replace(
  `Technology designed around people — not institutions.`,
  `{t("approach.heading")}`
);

c = c.replace(
  `{ icon: Heart, title: "Human-Centered Design", description: "Built around real experiences, real needs, and real challenges faced by people seeking care, education, and collaboration.", color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950", step: "01" },\n                { icon: Globe, title: "Global Accessibility", description: "Designed to scale across borders, cultures, and communities — making expert support available to everyone, everywhere.", color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950", step: "02" },\n                { icon: Shield, title: "Trust & Transparency", description: "Ethical design, clear communication, and user-first principles. Every professional is verified before going live.", color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950", step: "03" },\n                { icon: Zap, title: "Automation with Purpose", description: "Smart matching, streamlined workflows, and intelligent tools that reduce friction so people can focus on what matters.", color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950", step: "04" }`,
  `{ icon: Heart, title: t("approach.pillar1Title"), description: t("approach.pillar1Body"), color: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950", step: "01" },\n                { icon: Globe, title: t("approach.pillar2Title"), description: t("approach.pillar2Body"), color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950", step: "02" },\n                { icon: Shield, title: t("approach.pillar3Title"), description: t("approach.pillar3Body"), color: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950", step: "03" },\n                { icon: Zap, title: t("approach.pillar4Title"), description: t("approach.pillar4Body"), color: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950", step: "04" }`
);

// 9. Mission section
c = c.replace(
  `<Heart className="size-3" />Our Mission`,
  `<Heart className="size-3" />{t("mission.eyebrow")}`
);

c = c.replace(
  `Because access should be simple — not stressful.`,
  `{t("mission.heading")}`
);

c = c.replace(
  `SandiLink was created to solve a global problem: people everywhere struggle to access care, secure clinical placements, or find research support.`,
  `{t("mission.lede")}`
);

c = c.replace(
  `<p className="text-sm font-semibold">Our Mission</p>\n                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">To build scalable, human-centered systems that empower people regardless of geography, background, or resources.</p>`,
  `<p className="text-sm font-semibold">{t("mission.missionTitle")}</p>\n                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("mission.missionBody")}</p>`
);

c = c.replace(
  `<p className="text-sm font-semibold">Our Vision</p>\n                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">A world where healthcare is accessible, education is supported, and research is collaborative and globally connected.</p>`,
  `<p className="text-sm font-semibold">{t("mission.visionTitle")}</p>\n                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("mission.visionBody")}</p>`
);

c = c.replace(
  `{ label: "Healthcare", value: "Accessible" },\n                      { label: "Education", value: "Supported" },\n                      { label: "Research", value: "Connected" },\n                      { label: "Community", value: "Global" }`,
  `{ label: t("mission.tileHealthcare"), value: t("mission.tileHealthcareValue") },\n                      { label: t("mission.tileEducation"), value: t("mission.tileEducationValue") },\n                      { label: t("mission.tileResearch"), value: t("mission.tileResearchValue") },\n                      { label: t("mission.tileCommunity"), value: t("mission.tileCommunityValue") }`
);

// 10. Community section
c = c.replace(
  `A global community of users, providers, and partners.`,
  `{t("community.heading")}`
);

c = c.replace(
  `SandiLink supports individuals, families, healthcare providers, students, preceptors,\n                researchers, grant writers, journals, and institutions across the world.`,
  `{t("community.body")}`
);

c = c.replace(
  `We're building a connected ecosystem that strengthens care, learning, and discovery.`,
  `{t("community.accent")}`
);

c = c.replace(
  `<Link href="/register">Join the community<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("community.cta")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `{ icon: Users, label: "Service Users", color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },\n                  { icon: Stethoscope, label: "Providers", color: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400" },\n                  { icon: GraduationCap, label: "Students", color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400" },\n                  { icon: Search, label: "Preceptors", color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400" },\n                  { icon: FlaskConical, label: "Researchers", color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },\n                  { icon: PenTool, label: "Grant Writers", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400" },\n                  { icon: Globe, label: "Institutions", color: "bg-primary/10 text-primary" }`,
  `{ icon: Users, label: t("community.roleServiceUsers"), color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },\n                  { icon: Stethoscope, label: t("community.roleProviders"), color: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400" },\n                  { icon: GraduationCap, label: t("community.roleStudents"), color: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400" },\n                  { icon: Search, label: t("community.rolePreceptors"), color: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400" },\n                  { icon: FlaskConical, label: t("community.roleResearchers"), color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },\n                  { icon: PenTool, label: t("community.roleGrantWriters"), color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400" },\n                  { icon: Globe, label: t("community.roleInstitutions"), color: "bg-primary/10 text-primary" }`
);

// 11. Founding section — stats
c = c.replace(
  `{HYBRID_STATS.map((stat) => (\n              <div key={stat.label} className="text-center">\n                <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-primary">{stat.value}</p>\n                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>\n              </div>\n            ))}`,
  `{HYBRID_STATS.map((stat) => (\n              <div key={stat.label} className="text-center">\n                <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-primary">{stat.value}</p>\n                <p className="mt-1 text-xs sm:text-sm font-medium text-muted-foreground">{t("founding." + stat.key)}</p>\n              </div>\n            ))}`
);

c = c.replace(
  `What Our Members Say`,
  `{t("founding.testimonialsHeading")}`
);

c = c.replace(
  `Real voices from SandiLink's earliest community.`,
  `{t("founding.testimonialsBody")}`
);

c = c.replace(
  `<Heart className="size-3" />A Message from Our Founder`,
  `<Heart className="size-3" />{t("founding.founderBadge")}`
);

c = c.replace(
  `We built SandiLink because talent shouldn't be limited by access. From healthcare to\n                    preceptorship to research and grants, we connect people across three purpose-built\n                    marketplaces. We're just getting started — and everyone who joins now helps shape\n                    what comes next.`,
  `{t("founding.founderQuote")}`
);

c = c.replace(
  `<p className="text-sm font-semibold">Founder & CEO</p>\n                    <p className="text-xs text-muted-foreground">SandiLink</p>`,
  `<p className="text-sm font-semibold">{t("founding.founderRole")}</p>\n                    <p className="text-xs text-muted-foreground">{t("founding.founderCompany")}</p>`
);

c = c.replace(
  `<Star className="size-3 fill-current" />Limited Time`,
  `<Star className="size-3 fill-current" />{t("founding.limitedTime")}`
);

c = c.replace(
  `<h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">\n                  Become a Founding Member\n                </h3>`,
  `<h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">\n                  {t("founding.heading")}\n                </h3>`
);

c = c.replace(
  `Join now and receive exclusive benefits reserved for our earliest community members.`,
  `{t("founding.subheading")}`
);

c = c.replace(
  `{FOUNDING_BENEFITS.map((benefit) => (\n                  <div key={benefit.title} className="flex items-start gap-3">\n                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">\n                      <CheckCircle2 className="size-4" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold">{benefit.title}</p>\n                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{benefit.description}</p>\n                    </div>\n                  </div>\n                ))}`,
  `{FOUNDING_BENEFITS.map((benefit, idx) => (\n                  <div key={benefit.title} className="flex items-start gap-3">\n                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">\n                      <CheckCircle2 className="size-4" />\n                    </div>\n                    <div>\n                      <p className="text-sm font-semibold">{t("founding.benefit" + (idx + 1) + "Title")}</p>\n                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t("founding.benefit" + (idx + 1) + "Body")}</p>\n                    </div>\n                  </div>\n                ))}`
);

c = c.replace(
  `<Link href="/register?founding=true">\n                    Become a Founding Member\n                    <ArrowRight className="size-4" data-icon="inline-end" />\n                  </Link>`,
  `<Link href="/register?founding=true">\n                    {t("founding.cta")}\n                    <ArrowRight className="size-4" data-icon="inline-end" />\n                  </Link>`
);

// 12. Final CTA
c = c.replace(
  `Join the platform redefining global connection.`,
  `{t("finalCta.heading")}`
);

c = c.replace(
  `Create your account and start connecting with healthcare providers, mentors, researchers, and grant writers today.`,
  `{t("finalCta.body")}`
);

c = c.replace(
  `<Link href="/register">Create your account<ArrowRight className="size-4" data-icon="inline-end" /></Link>`,
  `<Link href="/register">{t("finalCta.primary")}<ArrowRight className="size-4" data-icon="inline-end" /></Link>`
);

c = c.replace(
  `<Link href="/login">Sign in</Link>`,
  `<Link href="/login">{t("finalCta.secondary")}</Link>`
);

// 13. Update HYBRID_STATS to add translation keys
c = c.replace(
  `const HYBRID_STATS = [\n  { value: "500+", label: "Providers" },\n  { value: "20+", label: "Countries" },\n  { value: "3", label: "Marketplaces" },\n  { value: "1", label: "Mission" },\n];`,
  `const HYBRID_STATS = [\n  { value: "500+", label: "Providers", key: "statProviders" },\n  { value: "20+", label: "Countries", key: "statCountries" },\n  { value: "3", label: "Marketplaces", key: "statMarketplaces" },\n  { value: "1", label: "Mission", key: "statMission" },\n];`
);

await writeFile(path, c, "utf8");
console.log("Fixed src/app/page.js");
