"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Briefcase,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  MessageSquare,
  Moon,
  Search,
  Settings,
  SlidersHorizontal,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useLanguage } from "@/contexts/language-provider";
import { useAuthStore } from "@/store/use-auth-store";
import { logos } from "@/config/theme";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const NAV_MAIN = [
  { titleKey: "dashboard", href: "/dashboard", icon: Home },
  { titleKey: "findExperts", href: "/dashboard/experts", icon: Search },
  { titleKey: "myEngagements", href: "/dashboard/engagements", icon: Briefcase, badge: 3 },
  { titleKey: "messages", href: "/dashboard/messages", icon: MessageSquare, badge: 2 },
  { titleKey: "payments", href: "/dashboard/payments", icon: CreditCard },
];

const NAV_SETTINGS = [
  { titleKey: "profile", href: "/dashboard/profile", icon: User },
  { titleKey: "preferences", href: "/dashboard/preferences", icon: SlidersHorizontal },
  { titleKey: "settings", href: "/dashboard/settings", icon: Settings },
];

function getCurrentItem(pathname) {
  return NAV_MAIN.find((n) => n.href === pathname) ?? NAV_SETTINGS.find((n) => n.href === pathname);
}

export default function DashboardLayout({ children }) {
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
  const isOnHome = !currentItem || currentItem.href === "/dashboard";

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  return (
    <SidebarProvider className="h-svh">
      <Sidebar collapsible="icon" side={sidebarSide} className="border-0">
        {/* Logo */}
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src={logos.light}
              alt="SandiLink"
              width={130}
              height={36}
              className="object-contain group-data-[collapsible=icon]:hidden dark:hidden"
            />
            <Image
              src={logos.dark}
              alt="One Sandi"
              width={130}
              height={36}
              className="hidden object-contain group-data-[collapsible=icon]:hidden dark:block"
            />
          </Link>
        </SidebarHeader>

        {/* Main nav */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{tGroups("menu")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_MAIN.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={tNav(item.titleKey)}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{tNav(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge > 0 && (
                      <SidebarMenuBadge className="bg-primary/10 text-primary">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>{tGroups("account")}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_SETTINGS.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={tNav(item.titleKey)}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{tNav(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer — user menu */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="cursor-pointer">
                    <Avatar size="sm">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        SU
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">Service User</span>
                      <span className="truncate text-xs text-muted-foreground">
                        user@example.com
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="w-56"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          SU
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid text-sm leading-tight">
                        <span className="font-medium">Service User</span>
                        <span className="text-xs text-muted-foreground">
                          user@example.com
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="size-4" />
                        {tChrome("profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="size-4" />
                        {tChrome("settings")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      {theme === "dark" ? (
                        <Sun className="size-4" />
                      ) : (
                        <Moon className="size-4" />
                      )}
                      {theme === "dark" ? tChrome("lightMode") : tChrome("darkMode")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                    <LogOut className="size-4" />
                    {tChrome("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Main content */}
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
          <SidebarTrigger />
          {/* Breadcrumbs */}
          <Breadcrumb className="hidden sm:flex">
            <BreadcrumbList>
              {!isOnHome && (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/dashboard">{tNav("dashboard")}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="size-3.5" />
                  </BreadcrumbSeparator>
                </>
              )}
              <BreadcrumbItem>
                <BreadcrumbPage>{currentItem ? tNav(currentItem.titleKey) : tNav("dashboard")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={tChrome("searchPlaceholder")}
                className="h-8 w-52 pl-8 text-xs lg:w-64"
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="size-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-4" />
                  <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  {tChrome("notifications")}
                  <Badge variant="secondary" className="text-xs">
                    {tChrome("newCount", { count: 3 })}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5">
                  <span className="text-sm font-medium">Booking confirmed</span>
                  <span className="text-xs text-muted-foreground">
                    Dr. Michael Chen confirmed your Apr 5 appointment
                  </span>
                  <span className="text-xs text-muted-foreground/60">2 min ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5">
                  <span className="text-sm font-medium">New message</span>
                  <span className="text-xs text-muted-foreground">
                    Dr. Sarah Johnson sent you a message
                  </span>
                  <span className="text-xs text-muted-foreground/60">15 min ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start gap-1 py-2.5">
                  <span className="text-sm font-medium">Payment received</span>
                  <span className="text-xs text-muted-foreground">
                    $120.00 payment for General Practice visit processed
                  </span>
                  <span className="text-xs text-muted-foreground/60">1 hour ago</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary">
                  {tChrome("viewAllNotifications")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle (visible) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
