"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileQuestion,
  HeadphonesIcon,
  LifeBuoy,
  MessageCircle,
  Search,
  ShieldCheck,
  UserCog,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  {
    title: "Getting Started",
    description: "Account setup, profile completion, and first steps",
    icon: BookOpen,
    color:
      "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
    articleCount: 12,
    href: "/support/faq?category=getting-started",
  },
  {
    title: "Account & Profile",
    description: "Manage your account settings, password, and preferences",
    icon: UserCog,
    color:
      "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-950",
    articleCount: 8,
    href: "/support/faq?category=account",
  },
  {
    title: "Billing & Payments",
    description: "Subscriptions, invoices, refunds, and payment methods",
    icon: Wallet,
    color:
      "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
    articleCount: 10,
    href: "/support/faq?category=billing",
  },
  {
    title: "Placements & Matching",
    description: "How matching works, placement status, and scheduling",
    icon: LifeBuoy,
    color:
      "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
    articleCount: 15,
    href: "/support/faq?category=placements",
  },
  {
    title: "Privacy & Security",
    description: "Data protection, HIPAA compliance, and account security",
    icon: ShieldCheck,
    color:
      "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950",
    articleCount: 6,
    href: "/support/faq?category=privacy",
  },
  {
    title: "Troubleshooting",
    description: "Common issues, error messages, and technical support",
    icon: FileQuestion,
    color:
      "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-950",
    articleCount: 9,
    href: "/support/faq?category=troubleshooting",
  },
];

const QUICK_LINKS = [
  {
    label: "Contact Support",
    href: "/support/contact",
    icon: MessageCircle,
  },
  { label: "FAQs", href: "/support/faq", icon: FileQuestion },
  { label: "User Guides", href: "/support/guides", icon: BookOpen },
];

export function HelpCenter() {
  const [search, setSearch] = useState("");

  const filtered = CATEGORIES.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6">
      <div className="text-center">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Help Center
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Find answers, browse guides, or get in touch with our support team.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto w-full max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search help articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {QUICK_LINKS.map((link) => (
          <Button key={link.href} variant="outline" size="sm" asChild>
            <Link href={link.href}>
              <link.icon className="size-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Categories */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat) => (
          <Link key={cat.title} href={cat.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${cat.color}`}
                  >
                    <cat.icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm">{cat.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {cat.articleCount} articles
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{cat.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <HeadphonesIcon className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            No results found for &ldquo;{search}&rdquo;
          </p>
          <Button variant="outline" size="sm" className="mt-3" asChild>
            <Link href="/support/contact">Contact Support</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
