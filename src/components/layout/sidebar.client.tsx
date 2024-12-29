"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Clock, Home, Settings, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AccountSwitcher } from "./account-switcher"
import { useEffect, useState } from "react"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function SidebarNav({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <AccountSwitcher isCollapsed={isCollapsed} />
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <nav className="grid gap-1">
              {sidebarNavItems.map((item, index) => (
                <Button
                  key={index}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span className={cn("ml-2", isCollapsed || isMobile ? "hidden" : "inline")}>
                      {item.title}
                    </span>
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 