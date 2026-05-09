"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Menu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { logos } from "@/config/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoogleTranslateSwitcher } from "@/components/shared/google-translate-switcher";

const MARKETPLACES = [
  {
    key: "healthcare",
    href: "/dashboard/experts",
    icon: HeartPulse,
    accent: "text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-950",
  },
  {
    key: "preceptor",
    href: "/student/preceptors",
    icon: GraduationCap,
    accent: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  },
  {
    key: "research",
    href: "/researcher/grants/search",
    icon: FlaskConical,
    accent: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
  },
];

const RESOURCES = [
  { key: "faq", href: "/faq", icon: HelpCircle },
  { key: "trust", href: "/trust-and-safety", icon: ShieldCheck },
  { key: "support", href: "/support", icon: Sparkles },
];

const SIMPLE_LINKS = [
  { key: "howItWorks", href: "/how-it-works" },
  { key: "pricing", href: "/pricing" },
];

function ListItem({ href, title, description, icon: Icon, accent }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group/item flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted focus-visible:bg-muted"
        >
          {Icon ? (
            <span
              className={cn(
                "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/item:scale-105",
                accent ?? "bg-primary/10 text-primary",
              )}
            >
              <Icon className="size-4" />
            </span>
          ) : null}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-tight text-foreground">
              {title}
            </p>
            {description ? (
              <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function SiteHeader({ className }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src={logos.light}
            alt="SandiLink"
            width={140}
            height={40}
            className="object-contain dark:hidden"
            priority
          />
          <Image
            src={logos.dark}
            alt="One Sandi"
            width={140}
            height={40}
            className="hidden object-contain dark:block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {tNav("marketplaces")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-md p-2">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {tNav("marketplacesEyebrow")}
                  </p>
                  <ul className="grid gap-0.5">
                    {MARKETPLACES.map((m) => (
                      <ListItem
                        key={m.href}
                        href={m.href}
                        icon={m.icon}
                        accent={m.accent}
                        title={t(`nav.items.${m.key}.title`)}
                        description={t(`nav.items.${m.key}.description`)}
                      />
                    ))}
                  </ul>
                  <div className="mt-1 border-t pt-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/how-it-works"
                        className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                      >
                        {tNav("marketplacesCta")}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {SIMPLE_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {tNav(link.key)}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>{tNav("resources")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-88 p-2">
                  <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {tNav("resourcesEyebrow")}
                  </p>
                  <ul className="grid gap-0.5">
                    {RESOURCES.map((r) => (
                      <ListItem
                        key={r.href}
                        href={r.href}
                        icon={r.icon}
                        title={t(`nav.items.${r.key}.title`)}
                        description={t(`nav.items.${r.key}.description`)}
                      />
                    ))}
                  </ul>
                  <div className="mt-1 border-t pt-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/support"
                        className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                      >
                        {tNav("resourcesCta")}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <GoogleTranslateSwitcher />
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">{tCommon("signIn")}</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/register">{tCommon("getStarted")}</Link>
          </Button>

          {/* Mobile trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">{tCommon("openMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle className="text-left">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src={logos.light}
                      alt="SandiLink"
                      width={120}
                      height={34}
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src={logos.dark}
                      alt="One Sandi"
                      width={120}
                      height={34}
                      className="hidden object-contain dark:block"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2 px-2 py-3">
                <Accordion type="single" collapsible>
                  <AccordionItem value="marketplaces" className="border-0">
                    <AccordionTrigger className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted hover:no-underline">
                      {tNav("marketplaces")}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul className="grid gap-1 pl-2">
                        {MARKETPLACES.map((m) => (
                          <li key={m.href}>
                            <SheetClose asChild>
                              <Link
                                href={m.href}
                                className="flex items-start gap-3 rounded-lg p-2 text-sm hover:bg-muted"
                              >
                                <span
                                  className={cn(
                                    "mt-0.5 flex size-7 items-center justify-center rounded-md",
                                    m.accent,
                                  )}
                                >
                                  <m.icon className="size-3.5" />
                                </span>
                                <span>
                                  <span className="block font-medium">
                                    {t(`nav.items.${m.key}.title`)}
                                  </span>
                                  <span className="block text-xs text-muted-foreground">
                                    {t(`nav.items.${m.key}.description`)}
                                  </span>
                                </span>
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {SIMPLE_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {tNav(link.key)}
                    </Link>
                  </SheetClose>
                ))}

                <Accordion type="single" collapsible>
                  <AccordionItem value="resources" className="border-0">
                    <AccordionTrigger className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted hover:no-underline">
                      {tNav("resources")}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul className="grid gap-1 pl-2">
                        {RESOURCES.map((r) => (
                          <li key={r.href}>
                            <SheetClose asChild>
                              <Link
                                href={r.href}
                                className="flex items-start gap-3 rounded-lg p-2 text-sm hover:bg-muted"
                              >
                                <span className="mt-0.5 flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  <r.icon className="size-3.5" />
                                </span>
                                <span>
                                  <span className="block font-medium">
                                    {t(`nav.items.${r.key}.title`)}
                                  </span>
                                  <span className="block text-xs text-muted-foreground">
                                    {t(`nav.items.${r.key}.description`)}
                                  </span>
                                </span>
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 grid gap-2 border-t px-1 pt-4">
                  <SheetClose asChild>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/login">{tCommon("signIn")}</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/register">
                        {tCommon("getStarted")}
                        <ArrowRight className="size-4" data-icon="inline-end" />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
