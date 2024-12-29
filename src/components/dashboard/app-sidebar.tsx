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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="group/menu-item relative">
            <Link 
              href="/"
              className="peer/menu-button ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:!size-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-12 text-sm group-data-[collapsible=icon]:!p-0"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">City East Unit</span>
                <span className="text-xs text-muted-foreground">Acres Health</span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-2 py-2">{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link 
                      href={item.href}
                      className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-accent ${
                        item.isActive ? 'bg-accent' : ''
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

