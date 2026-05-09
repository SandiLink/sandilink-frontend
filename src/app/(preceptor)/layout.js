"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/contexts/language-provider";
import {
  Bell, CalendarDays, ChevronRight, ClipboardList, FileText, Home, LogOut,
  MessageSquare, Moon, Search, Settings, Sun, User, Users,
} from "lucide-react";
import { useTheme } from "next-themes";
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
  { titleKey: "dashboard", href: "/preceptor", icon: Home },
  { titleKey: "requests", href: "/preceptor/requests", icon: ClipboardList, badge: 3 },
  { titleKey: "myStudents", href: "/preceptor/students", icon: Users },
  { titleKey: "schedule", href: "/preceptor/schedule", icon: CalendarDays },
  { titleKey: "messages", href: "/preceptor/messages", icon: MessageSquare, badge: 2 },
];

const NAV_ACCOUNT = [
  { titleKey: "profile", href: "/preceptor/profile", icon: User },
  { titleKey: "settings", href: "/preceptor/settings", icon: Settings },
];

const ALL_NAV = [...NAV_MAIN, ...NAV_ACCOUNT];

function getCurrentItem(pathname) {
  return ALL_NAV.find((n) => n.href === pathname);
}

export default function PreceptorLayout({ children }) {
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
  const isOnHome = !currentItem || currentItem.href === "/preceptor";

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  return (
    <SidebarProvider className="h-svh">
      <Sidebar collapsible="icon" side={sidebarSide} className="border-0">
        <SidebarHeader className="p-4">
          <Link href="/preceptor" className="flex items-center gap-2">
            <Image src={logos.light} alt="SandiLink" width={130} height={36} className="object-contain group-data-[collapsible=icon]:hidden dark:hidden" />
            <Image src={logos.dark} alt="One Sandi" width={130} height={36} className="hidden object-contain group-data-[collapsible=icon]:hidden dark:block" />
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup><SidebarGroupLabel>{tGroups("menu")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_MAIN.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={tNav(item.titleKey)}><Link href={item.href}><item.icon /><span>{tNav(item.titleKey)}</span></Link></SidebarMenuButton>
                {item.badge > 0 && <SidebarMenuBadge className="bg-primary/10 text-primary">{item.badge}</SidebarMenuBadge>}
              </SidebarMenuItem>
            ))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel>{tGroups("account")}</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>
            {NAV_ACCOUNT.map((item) => (
              <SidebarMenuItem key={item.href}><SidebarMenuButton asChild isActive={pathname === item.href} tooltip={tNav(item.titleKey)}><Link href={item.href}><item.icon /><span>{tNav(item.titleKey)}</span></Link></SidebarMenuButton></SidebarMenuItem>
            ))}
          </SidebarMenu></SidebarGroupContent></SidebarGroup>
        </SidebarContent>
        <SidebarFooter><SidebarMenu><SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg"><Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">RW</AvatarFallback></Avatar><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">Dr. Robert Williams</span><span className="truncate text-xs text-muted-foreground">Family Medicine</span></div></SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel className="font-normal"><div className="flex items-center gap-2"><Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary text-xs">RW</AvatarFallback></Avatar><div className="grid text-sm leading-tight"><span className="font-medium">Dr. Robert Williams</span><span className="text-xs text-muted-foreground">Family Medicine</span></div></div></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild><Link href="/preceptor/profile"><User className="size-4" />{tChrome("profile")}</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/preceptor/settings"><Settings className="size-4" />{tChrome("settings")}</Link></DropdownMenuItem>
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
            {!isOnHome && (<><BreadcrumbItem><BreadcrumbLink asChild><Link href="/preceptor">{tNav("dashboard")}</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator></>)}
            <BreadcrumbItem><BreadcrumbPage>{currentItem ? tNav(currentItem.titleKey) : tNav("dashboard")}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList></Breadcrumb>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative hidden md:block"><Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input type="search" placeholder={tChrome("searchPlaceholder")} className="h-8 w-52 pl-8 text-xs lg:w-64" /></div>
            <Button variant="ghost" size="icon" className="md:hidden"><Search className="size-4" /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="relative"><Bell className="size-4" /><span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">{tChrome("notifications")} <Badge variant="secondary" className="text-xs">{tChrome("newCount", { count: 3 })}</Badge></DropdownMenuLabel><DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5"><span className="text-sm font-medium">New placement request</span><span className="text-xs text-muted-foreground">Emily Davis — BSN, 1st Year</span><span className="text-xs text-muted-foreground/60">10 min ago</span></DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5"><span className="text-sm font-medium">Hours logged</span><span className="text-xs text-muted-foreground">Jane Smith logged 8 hours today</span><span className="text-xs text-muted-foreground/60">2 hours ago</span></DropdownMenuItem>
                <DropdownMenuSeparator /><DropdownMenuItem className="justify-center text-primary">{tChrome("viewAll")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" /><Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" /></Button>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
