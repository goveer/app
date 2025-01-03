"use client"

import * as React from "react"
import { GalleryVerticalEnd, LayoutDashboard, Users, UserCog, Calendar } from 'lucide-react'
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

const navigation: NavigationGroup[] = [
  {
    title: "Platform",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        isActive: true
      }
    ]
  },
  {
    title: "Schedule",
    items: [
      {
        title: "My Schedule",
        href: "/schedule",
        icon: Calendar
      }
    ]
  },
  {
    title: "Care Network",
    items: [
      {
        title: "Providers",
        href: "/providers",
        icon: UserCog
      },
      {
        title: "Clients",
        href: "/clients",
        icon: Users
      }
    ]
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem href="/">
            <div className="flex items-center gap-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Documentation</span>
                <span className="">v1.0.0</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((group) => (
              <React.Fragment key={group.title}>
                <SidebarMenuItem href={group.items[0].href}>
                  {group.title}
                </SidebarMenuItem>
                {group.items.length > 1 && (
                  <SidebarMenuSub label={group.title}>
                    {group.items.slice(1).map((item) => (
                      <SidebarMenuSubItem key={item.title} href={item.href}>
                        {item.title}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </React.Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail>
        <div className="flex h-full" />
      </SidebarRail>
    </Sidebar>
  )
}

