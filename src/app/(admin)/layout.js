"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Award, BarChart3, Bell, BookOpen, ChevronRight, ClipboardList, Cog, Database,
  DollarSign, FileText, Flag, FlaskConical, Gavel, Globe, Home, Languages, Layers, LogOut, Mail,
  Map, MessageSquare, Moon, PenTool, Search, Settings, Shield, SlidersHorizontal, Star, Stethoscope,
  Sun, User, Users, Video, Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/contexts/language-provider";
import { useAuthStore } from "@/store/use-auth-store";
import { logos } from "@/config/theme";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail,
  SidebarSeparator, SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const NAV_MAIN = [
  { titleKey: "dashboard", href: "/admin", icon: Home },
  { titleKey: "analytics", href: "/admin/analytics", icon: BarChart3 },
  { titleKey: "users", href: "/admin/users", icon: Users, badge: 5 },
  { titleKey: "flaggedContent", href: "/admin/flagged", icon: Flag, badge: 3 },
];

const NAV_CONTENT = [
  { titleKey: "disputes", href: "/admin/disputes", icon: Gavel, badge: 2 },
  { titleKey: "moderation", href: "/admin/moderation", icon: Shield },
  { titleKey: "reviews", href: "/admin/reviews", icon: Star },
];

const NAV_CONFIG = [
  { titleKey: "plans", href: "/admin/config/plans", icon: ClipboardList },
  { titleKey: "commission", href: "/admin/config/commission", icon: Settings },
  { titleKey: "matching", href: "/admin/config/matching", icon: Cog },
  { titleKey: "payments", href: "/admin/config/payments", icon: Settings },
  { titleKey: "templates", href: "/admin/config/templates", icon: MessageSquare },
];

const NAV_RESEARCH = [
  { titleKey: "researchers", href: "/admin/researchers", icon: FlaskConical },
  { titleKey: "grantWriters", href: "/admin/grant-writers", icon: PenTool },
  { titleKey: "grantsDirectory", href: "/admin/grants-directory", icon: Award },
  { titleKey: "journals", href: "/admin/journals-directory", icon: BookOpen },
  { titleKey: "researchAnalytics", href: "/admin/research-analytics", icon: BarChart3 },
];

const NAV_RESEARCH_CONFIG = [
  { titleKey: "researchMatching", href: "/admin/config/research-matching", icon: SlidersHorizontal },
  { titleKey: "researcherPlans", href: "/admin/config/researcher-plans", icon: ClipboardList },
  { titleKey: "writerCommission", href: "/admin/config/writer-commission", icon: DollarSign },
];

const NAV_I18N = [
  { titleKey: "languages", href: "/admin/i18n/languages", icon: Globe },
  { titleKey: "translations", href: "/admin/i18n/translations", icon: Languages },
  { titleKey: "localizedContent", href: "/admin/i18n/content", icon: Mail },
];

const NAV_CATALOGS = [
  { titleKey: "providerCategories", href: "/admin/catalogs/categories", icon: Layers },
  { titleKey: "specialties", href: "/admin/catalogs/specialties", icon: Stethoscope },
  { titleKey: "serviceTypes", href: "/admin/catalogs/service-types", icon: Wrench },
  { titleKey: "credentials", href: "/admin/catalogs/credentials", icon: Award },
  { titleKey: "deliveryModes", href: "/admin/catalogs/delivery-modes", icon: Video },
  { titleKey: "roleMappings", href: "/admin/catalogs/role-mappings", icon: Map },
];

const NAV_SYSTEM = [
  { titleKey: "auditLogs", href: "/admin/audit", icon: FileText },
  { titleKey: "system", href: "/admin/system", icon: Database },
  { titleKey: "compliance", href: "/admin/compliance", icon: Shield },
  { titleKey: "settings", href: "/admin/settings", icon: Settings },
];

const ALL_NAV = [...NAV_MAIN, ...NAV_CONTENT, ...NAV_CONFIG, ...NAV_RESEARCH, ...NAV_RESEARCH_CONFIG, ...NAV_I18N, ...NAV_CATALOGS, ...NAV_SYSTEM];

function getCurrentItem(pathname) {
  return ALL_NAV.find((n) => n.href === pathname);
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuthStore();
  const tNav = useTranslations("sidebar.items");
  const tGroups = useTranslations("sidebar.groups");
  const tChrome = useTranslations("chrome");
  const { currentLanguage } = useLanguage();
  const sidebarSide = currentLanguage === "ar" ? "right" : "left";
  const currentItem = getCurrentItem(pathname);
  const isOnHome = !currentItem || currentItem.href === "/admin";

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  return (
    <SidebarProvider className="h-svh">
      <Sidebar collapsible="icon" side={sidebarSide} className="border-0">
        <SidebarHeader className="px-4 py-2">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src={logos.light} alt="SandiLink" width={130} height={36} className="object-contain group-data-[collapsible=icon]:hidden dark:hidden" />
            <Image src={logos.dark} alt="One Sandi" width={130} height={36} className="hidden object-contain group-data-[collapsible=icon]:hidden dark:block" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup><SidebarGroupLabel>{tGroups("overview")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_MAIN.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton>{i.badge > 0 && <SidebarMenuBadge className="bg-primary/10 text-primary">{i.badge}</SidebarMenuBadge>}</SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("content")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_CONTENT.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton>{i.badge > 0 && <SidebarMenuBadge className="bg-primary/10 text-primary">{i.badge}</SidebarMenuBadge>}</SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("research")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_RESEARCH.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("configuration")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {[...NAV_CONFIG, ...NAV_RESEARCH_CONFIG].map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("internationalization")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_I18N.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("catalogs")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_CATALOGS.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("system")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_SYSTEM.map((i) => (<SidebarMenuItem key={i.href}><SidebarMenuButton asChild isActive={pathname === i.href} tooltip={tNav(i.titleKey)}><Link href={i.href}><i.icon /><span>{tNav(i.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
        </SidebarContent>
        <SidebarFooter><SidebarMenu><SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><SidebarMenuButton size="lg"><Avatar size="sm"><AvatarFallback className="bg-destructive/10 text-destructive text-xs">SA</AvatarFallback></Avatar><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">Sandy Admin</span><span className="truncate text-xs text-muted-foreground">Platform Admin</span></div></SidebarMenuButton></DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel className="font-normal"><div className="flex items-center gap-2"><Avatar size="sm"><AvatarFallback className="bg-destructive/10 text-destructive text-xs">SA</AvatarFallback></Avatar><div className="grid text-sm leading-tight"><span className="font-medium">Sandy Admin</span><span className="text-xs text-muted-foreground">Platform Admin</span></div></div></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild><Link href="/admin/settings"><Settings className="size-4" />{tChrome("settings")}</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}{theme === "dark" ? tChrome("lightMode") : tChrome("darkMode")}</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleSignOut}><LogOut className="size-4" />{tChrome("signOut")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem></SidebarMenu></SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
          <SidebarTrigger />
          <Breadcrumb className="hidden sm:flex"><BreadcrumbList>
            {!isOnHome && (<><BreadcrumbItem><BreadcrumbLink asChild><Link href="/admin">{tNav("dashboard")}</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator></>)}
            <BreadcrumbItem><BreadcrumbPage>{currentItem ? tNav(currentItem.titleKey) : tNav("dashboard")}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList></Breadcrumb>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative hidden md:block"><Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input type="search" placeholder={tChrome("searchPlaceholder")} className="h-8 w-52 pl-8 text-xs lg:w-64" /></div>
            <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="relative"><Bell className="size-4" /><span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">8</span></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80"><DropdownMenuLabel className="flex items-center justify-between">{tChrome("adminNotifications")} <Badge variant="destructive" className="text-xs">{tChrome("newCount", { count: 8 })}</Badge></DropdownMenuLabel><DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5"><span className="text-sm font-medium">New dispute filed</span><span className="text-xs text-muted-foreground">User reported billing issue — needs review</span></DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5"><span className="text-sm font-medium">Flagged review</span><span className="text-xs text-muted-foreground">Review reported as inappropriate</span></DropdownMenuItem>
                <DropdownMenuSeparator /><DropdownMenuItem className="justify-center text-primary">{tChrome("viewAll")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" /><Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" /></Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
