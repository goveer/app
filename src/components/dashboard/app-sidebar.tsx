"use client"

import * as React from "react"
import { GalleryVerticalEnd, LayoutDashboard, Users, UserCog, Calendar } from 'lucide-react'
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarRail,
} from "../ui/sidebar"

interface AppSidebarProps {
  className?: string
}

interface NavigationItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

interface NavigationGroup {
  title: string
  items: NavigationItem[]
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

export function AppSidebar({ className }: AppSidebarProps) {
  return (
    <Sidebar className={className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">City East Unit</span>
                  <span className="text-xs text-muted-foreground">Acres Health</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

