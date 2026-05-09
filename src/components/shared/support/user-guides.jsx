"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Landmark,
  Play,
  Search,
  Stethoscope,
  UserCheck,
  Users,
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ROLE_TABS = [
  { value: "general", label: "General", icon: BookOpen },
  { value: "student", label: "Students", icon: GraduationCap },
  { value: "preceptor", label: "Preceptors", icon: UserCheck },
  { value: "institution", label: "Institutions", icon: Landmark },
  { value: "provider", label: "Care Providers", icon: Stethoscope },
];

const GUIDES = [
  // General
  {
    role: "general",
    title: "Getting Started with OneSandi",
    description:
      "A complete walkthrough of account creation, profile setup, and navigating the platform.",
    duration: "10 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 5,
    completedSteps: 0,
  },
  {
    role: "general",
    title: "Managing Your Profile",
    description:
      "Learn how to keep your profile up to date, upload documents, and manage privacy settings.",
    duration: "5 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 4,
    completedSteps: 0,
  },
  {
    role: "general",
    title: "Understanding Notifications",
    description:
      "Configure email, SMS, and in-app notifications to stay informed without the noise.",
    duration: "4 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 3,
    completedSteps: 0,
  },
  {
    role: "general",
    title: "Messaging & Communication",
    description:
      "How to use the messaging system to communicate with your matches and support team.",
    duration: "6 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 4,
    completedSteps: 0,
  },
  // Student
  {
    role: "student",
    title: "Finding and Requesting Placements",
    description:
      "Search for preceptors, review profiles, and submit placement requests step by step.",
    duration: "8 min read",
    type: "article",
    difficulty: "Intermediate",
    steps: 6,
    completedSteps: 0,
  },
  {
    role: "student",
    title: "Uploading Credentials & Documents",
    description:
      "Ensure your credentials are properly uploaded and verified for placement eligibility.",
    duration: "5 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 4,
    completedSteps: 0,
  },
  {
    role: "student",
    title: "Tracking Your Placement Progress",
    description:
      "Monitor your hours, evaluations, and milestones throughout your clinical placement.",
    duration: "7 min read",
    type: "video",
    difficulty: "Intermediate",
    steps: 5,
    completedSteps: 0,
  },
  // Preceptor
  {
    role: "preceptor",
    title: "Setting Up Your Availability",
    description:
      "Configure your schedule, availability windows, and capacity for student placements.",
    duration: "6 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 4,
    completedSteps: 0,
  },
  {
    role: "preceptor",
    title: "Managing Student Placements",
    description:
      "Accept requests, track active students, and provide evaluations efficiently.",
    duration: "10 min read",
    type: "article",
    difficulty: "Intermediate",
    steps: 7,
    completedSteps: 0,
  },
  {
    role: "preceptor",
    title: "Completing Student Evaluations",
    description:
      "Step-by-step guide to completing mid-term and final evaluations for your students.",
    duration: "8 min read",
    type: "video",
    difficulty: "Intermediate",
    steps: 5,
    completedSteps: 0,
  },
  // Institution
  {
    role: "institution",
    title: "Bulk Importing Students",
    description:
      "Upload student rosters via CSV and manage enrollment for your institution.",
    duration: "6 min read",
    type: "article",
    difficulty: "Intermediate",
    steps: 5,
    completedSteps: 0,
  },
  {
    role: "institution",
    title: "Managing Affiliation Agreements",
    description:
      "Create, track, and renew affiliation agreements with clinical sites.",
    duration: "8 min read",
    type: "article",
    difficulty: "Advanced",
    steps: 6,
    completedSteps: 0,
  },
  {
    role: "institution",
    title: "Analytics & Reporting",
    description:
      "Generate reports on student placements, completion rates, and program outcomes.",
    duration: "7 min read",
    type: "video",
    difficulty: "Intermediate",
    steps: 4,
    completedSteps: 0,
  },
  // Provider
  {
    role: "provider",
    title: "Setting Up Your Provider Profile",
    description:
      "Complete your professional profile, credentials, and service offerings.",
    duration: "8 min read",
    type: "article",
    difficulty: "Beginner",
    steps: 5,
    completedSteps: 0,
  },
  {
    role: "provider",
    title: "Managing Bookings & Schedule",
    description:
      "Handle incoming bookings, manage your calendar, and set your availability.",
    duration: "7 min read",
    type: "article",
    difficulty: "Intermediate",
    steps: 5,
    completedSteps: 0,
  },
  {
    role: "provider",
    title: "Understanding Your Earnings",
    description:
      "Track your earnings, review commission structures, and manage payouts.",
    duration: "5 min read",
    type: "video",
    difficulty: "Beginner",
    steps: 3,
    completedSteps: 0,
  },
];

const DIFFICULTY_COLORS = {
  Beginner:
    "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950",
  Intermediate:
    "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-950",
  Advanced:
    "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-950",
};

export function UserGuides() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const filtered = GUIDES.filter((guide) => {
    const matchesRole = guide.role === activeTab;
    const matchesSearch =
      !search ||
      guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.description.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          User Guides & Tutorials
        </h2>
        <p className="text-sm text-muted-foreground">
          Step-by-step guides to help you get the most out of the platform.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search guides and tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 pl-9"
        />
      </div>

      {/* Role Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {ROLE_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="size-3.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ROLE_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {filtered.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((guide) => (
                  <Card
                    key={guide.title}
                    className="group h-full transition-colors hover:bg-muted/50"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${DIFFICULTY_COLORS[guide.difficulty]}`}
                        >
                          {guide.difficulty}
                        </Badge>
                        {guide.type === "video" && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] gap-1"
                          >
                            <Play className="size-2.5" />
                            Video
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-sm leading-snug mt-1">
                        {guide.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3" />
                          {guide.duration}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="size-3" />
                          {guide.steps} steps
                        </div>
                      </div>
                      {guide.completedSteps > 0 && (
                        <div className="mt-3">
                          <Progress
                            value={
                              (guide.completedSteps / guide.steps) * 100
                            }
                            className="h-1.5"
                          />
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {guide.completedSteps} of {guide.steps} completed
                          </p>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 w-full justify-between group-hover:bg-background"
                      >
                        {guide.completedSteps > 0
                          ? "Continue"
                          : "Start Guide"}
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Users className="mx-auto size-10 text-muted-foreground/50" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No guides match your search.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Help Banner */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center py-6 text-center sm:flex-row sm:text-left sm:justify-between">
          <div>
            <p className="font-medium text-sm">Need personalized help?</p>
            <p className="text-sm text-muted-foreground">
              Our support team can walk you through any process on the platform.
            </p>
          </div>
          <Button size="sm" className="mt-3 sm:mt-0" asChild>
            <Link href="/support/contact">Get Help</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
